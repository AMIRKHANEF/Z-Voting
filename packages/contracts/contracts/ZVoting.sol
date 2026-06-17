// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "./interfaces/IZVoting.sol";
import "./Verifier.sol";

/**
 * @title ZVoting
 * @dev Main voting contract with zero-knowledge proof verification
 * @notice This contract manages anonymous voting with on-chain proof verification
 */
contract ZVoting is Verifier, IZVoting {
    // ============ State Variables ============

    /// @dev Voting session title
    string public title;

    /// @dev Merkle root of eligible voters
    bytes32 public merkleRoot;

    /// @dev Voting deadline (unix timestamp)
    uint256 public deadline;

    /// @dev Voting state: 0=active, 1=ended, 2=cancelled
    uint8 public state;

    /// @dev Owner/admin of this voting
    address public owner;

    /// @dev Vote options (binary: 0=No, 1=Yes by default, can be extended)
    uint256 public optionCount;

    /// @dev Vote counters for each option
    mapping(uint256 => uint256) public voteCounters;

    /// @dev Track used nullifiers to prevent double voting
    mapping(bytes32 => bool) public nullifierUsed;

    /// @dev Total votes cast
    uint256 public totalVotes;

    // ============ Events ============

    /// @dev Emitted when a vote is recorded
    event VoteRecorded(
        bytes32 indexed nullifier,
        uint256 indexed voteOption,
        uint256 timestamp
    );

    /// @dev Emitted when voting is ended
    event VotingEnded(uint256 timestamp);

    /// @dev Emitted when voting is cancelled
    event VotingCancelled(uint256 timestamp);

    /// @dev Emitted when voting is paused
    event VotingPaused(uint256 timestamp);

    /// @dev Emitted when voting is resumed
    event VotingResumed(uint256 timestamp);

    // ============ Modifiers ============

    /// @dev Only owner can call
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    /// @dev Only when voting is active
    modifier onlyActive() {
        require(state == 0, "Voting is not active");
        require(block.timestamp <= deadline, "Voting deadline passed");
        _;
    }

    /// @dev Prevent duplicate votes
    modifier preventDuplicateVote(bytes32 nullifier) {
        require(!nullifierUsed[nullifier], "This voter has already voted");
        _;
    }

    // ============ Constructor ============

    /**
     * @dev Initialize voting session
     * @param _title Voting title
     * @param _merkleRoot Root of merkle tree containing eligible voters
     * @param _deadline Voting deadline (unix timestamp)
     * @param _optionCount Number of voting options (default 2 for binary)
     */
    constructor(
        string memory _title,
        bytes32 _merkleRoot,
        uint256 _deadline,
        uint256 _optionCount
    ) {
        require(_deadline > block.timestamp, "Deadline must be in future");
        require(_optionCount >= 2, "Must have at least 2 options");
        require(bytes(_title).length > 0, "Title cannot be empty");

        title = _title;
        merkleRoot = _merkleRoot;
        deadline = _deadline;
        optionCount = _optionCount;
        owner = msg.sender;
        state = 0; // Active
        totalVotes = 0;
    }

    // ============ Voting Functions ============

    /**
     * @dev Cast a vote with zero-knowledge proof
     * @param a Proof component A (G1 point)
     * @param b Proof component B (G2 point)
     * @param c Proof component C (G1 point)
     * @param input Public inputs including nullifier and merkle proof
     * @param voteOption The voting option chosen (0 to optionCount-1)
     */
    function vote(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[7] memory input,
        uint256 voteOption
    )
        external
        onlyActive
        preventDuplicateVote(bytes32(input[0]))
    {
        // Validate vote option
        require(voteOption < optionCount, "Invalid vote option");

        // Verify the zero-knowledge proof
        require(
            verifyProof(a, b, c, input),
            "Invalid zero-knowledge proof"
        );

        // Mark nullifier as used to prevent double voting
        bytes32 nullifier = bytes32(input[0]);
        nullifierUsed[nullifier] = true;

        // Record the vote
        voteCounters[voteOption]++;
        totalVotes++;

        // Emit vote recorded event
        emit VoteRecorded(nullifier, voteOption, block.timestamp);
    }

    // ============ Query Functions ============

    /**
     * @dev Get vote count for specific option
     * @param option The voting option
     * @return Vote count for that option
     */
    function getVoteCount(uint256 option) external view returns (uint256) {
        require(option < optionCount, "Invalid option");
        return voteCounters[option];
    }

    /**
     * @dev Get all vote counts
     * @return Array of vote counts for all options
     */
    function getResults() external view returns (uint256[] memory) {
        require(state != 0 || block.timestamp > deadline, "Voting still active");

        uint256[] memory results = new uint256[](optionCount);
        for (uint256 i = 0; i < optionCount; i++) {
            results[i] = voteCounters[i];
        }
        return results;
    }

    /**
     * @dev Get voting session info
     * @return Voting metadata
     */
    function getVotingInfo()
        external
        view
        returns (
            string memory,
            bytes32,
            uint256,
            uint8,
            uint256,
            uint256
        )
    {
        return (title, merkleRoot, deadline, state, optionCount, totalVotes);
    }

    /**
     * @dev Check if a nullifier has been used
     * @param nullifier The nullifier to check
     * @return True if nullifier has been used
     */
    function hasVoted(bytes32 nullifier) external view returns (bool) {
        return nullifierUsed[nullifier];
    }

    // ============ Admin Functions ============

    /**
     * @dev End voting session early (admin only)
     */
    function endVoting() external onlyOwner onlyActive {
        state = 1; // Ended
        emit VotingEnded(block.timestamp);
    }

    /**
     * @dev Cancel voting session (admin only)
     */
    function cancelVoting() external onlyOwner {
        require(state != 2, "Voting already cancelled");
        state = 2; // Cancelled
        emit VotingCancelled(block.timestamp);
    }

    /**
     * @dev Pause voting temporarily (admin only)
     */
    function pauseVoting() external onlyOwner onlyActive {
        state = 1; // Paused (reusing ended state)
        emit VotingPaused(block.timestamp);
    }

    /**
     * @dev Resume paused voting (admin only)
     */
    function resumeVoting() external onlyOwner {
        require(state == 1, "Voting not paused");
        require(block.timestamp <= deadline, "Deadline passed");
        state = 0; // Active
        emit VotingResumed(block.timestamp);
    }

    /**
     * @dev Update voting deadline (admin only)
     * @param newDeadline New deadline timestamp
     */
    function updateDeadline(uint256 newDeadline) external onlyOwner {
        require(newDeadline > block.timestamp, "Deadline must be in future");
        deadline = newDeadline;
    }
}
