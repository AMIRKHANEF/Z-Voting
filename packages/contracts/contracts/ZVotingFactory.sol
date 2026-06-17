// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "./ZVoting.sol";

/**
 * @title ZVotingFactory
 * @dev Factory contract for creating and managing voting instances
 */
contract ZVotingFactory {
    // ============ State Variables ============

    /// @dev Array of all voting instances
    address[] public votings;

    /// @dev Voting info indexed by address
    mapping(address => VotingInfo) public votingInfo;

    /// @dev Owner of this factory
    address public owner;

    /// @dev Platform fee (in basis points, e.g., 100 = 1%)
    uint256 public platformFee;

    // ============ Structures ============

    struct VotingInfo {
        address creator;
        uint256 createdAt;
        bytes32 merkleRoot;
        uint256 deadline;
        bool isActive;
    }

    // ============ Events ============

    /// @dev Emitted when new voting is created
    event VotingCreated(
        address indexed votingAddress,
        address indexed creator,
        string title,
        uint256 deadline
    );

    /// @dev Emitted when voting is closed
    event VotingClosed(address indexed votingAddress);

    // ============ Modifiers ============

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    // ============ Constructor ============

    constructor(uint256 _platformFee) {
        owner = msg.sender;
        platformFee = _platformFee;
    }

    // ============ Factory Functions ============

    /**
     * @dev Create new voting instance
     * @param _title Voting title
     * @param _merkleRoot Merkle root of eligible voters
     * @param _deadline Voting deadline
     * @param _optionCount Number of voting options
     * @return voting Address of created voting contract
     */
    function createVoting(
        string memory _title,
        bytes32 _merkleRoot,
        uint256 _deadline,
        uint256 _optionCount
    ) external returns (address) {
        require(bytes(_title).length > 0, "Title required");
        require(_deadline > block.timestamp, "Invalid deadline");
        require(_optionCount >= 2, "Invalid option count");

        ZVoting voting = new ZVoting(
            _title,
            _merkleRoot,
            _deadline,
            _optionCount
        );

        address votingAddress = address(voting);

        votings.push(votingAddress);
        votingInfo[votingAddress] = VotingInfo({
            creator: msg.sender,
            createdAt: block.timestamp,
            merkleRoot: _merkleRoot,
            deadline: _deadline,
            isActive: true
        });

        emit VotingCreated(
            votingAddress,
            msg.sender,
            _title,
            _deadline
        );

        return votingAddress;
    }

    // ============ Query Functions ============

    /**
     * @dev Get total number of votings created
     * @return Total votings count
     */
    function getVotingCount() external view returns (uint256) {
        return votings.length;
    }

    /**
     * @dev Get voting address by index
     * @param index Array index
     * @return Voting contract address
     */
    function getVotingByIndex(uint256 index)
        external
        view
        returns (address)
    {
        require(index < votings.length, "Invalid index");
        return votings[index];
    }

    /**
     * @dev Get paginated list of votings
     * @param offset Starting index
     * @param limit Number of results
     * @return Array of voting addresses
     */
    function getVotingsPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (address[] memory)
    {
        require(offset < votings.length, "Invalid offset");

        uint256 end = offset + limit > votings.length
            ? votings.length
            : offset + limit;
        uint256 size = end - offset;

        address[] memory result = new address[](size);
        for (uint256 i = 0; i < size; i++) {
            result[i] = votings[offset + i];
        }

        return result;
    }

    /**
     * @dev Get all votings created by address
     * @param creator Creator address
     * @return Array of voting addresses
     */
    function getVotingsByCreator(address creator)
        external
        view
        returns (address[] memory)
    {
        uint256 count = 0;

        // Count votings by creator
        for (uint256 i = 0; i < votings.length; i++) {
            if (votingInfo[votings[i]].creator == creator) {
                count++;
            }
        }

        // Build result array
        address[] memory result = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < votings.length; i++) {
            if (votingInfo[votings[i]].creator == creator) {
                result[index] = votings[i];
                index++;
            }
        }

        return result;
    }

    // ============ Admin Functions ============

    /**
     * @dev Update platform fee
     * @param _platformFee New fee in basis points
     */
    function setPlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 10000, "Invalid fee");
        platformFee = _platformFee;
    }

    /**
     * @dev Transfer ownership
     * @param _newOwner New owner address
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
