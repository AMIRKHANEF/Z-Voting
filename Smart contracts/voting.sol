pragma solidity ^0.5.0;

contract SolidityTest {
   
   string public title;
   uint[] public votingOptions;
   uint[] public voters;
   bytes32 public merkleRoot;

   constructor(string memory _title, uint[] memory _votingOptions, uint[] memory _voters, bytes32 _merkleRoot) public {
      title = _title;
      votingOptions = _votingOptions;
      voters = _voters;
      merkleRoot = _merkleRoot;
   }

   function getVotingOptions() public view returns(uint[] memory){
      return votingOptions;
   }

   function getVoters() public view returns(uint[] memory){
      return voters;
   }
}
