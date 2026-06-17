// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

/**
 * @title IZVoting
 * @dev Interface for ZVoting contract
 */
interface IZVoting {
    // ============ Events ============

    event VoteRecorded(
        bytes32 indexed nullifier,
        uint256 indexed voteOption,
        uint256 timestamp
    );

    event VotingEnded(uint256 timestamp);
    event VotingCancelled(uint256 timestamp);
    event VotingPaused(uint256 timestamp);
    event VotingResumed(uint256 timestamp);

    // ============ View Functions ============

    function title() external view returns (string memory);

    function merkleRoot() external view returns (bytes32);

    function deadline() external view returns (uint256);

    function state() external view returns (uint8);

    function owner() external view returns (address);

    function optionCount() external view returns (uint256);

    function totalVotes() external view returns (uint256);

    function getVoteCount(uint256 option)
        external
        view
        returns (uint256);

    function getResults() external view returns (uint256[] memory);

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
        );

    function hasVoted(bytes32 nullifier) external view returns (bool);

    // ============ State-Changing Functions ============

    function vote(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[7] memory input,
        uint256 voteOption
    ) external;

    function endVoting() external;

    function cancelVoting() external;

    function pauseVoting() external;

    function resumeVoting() external;

    function updateDeadline(uint256 newDeadline) external;
}
