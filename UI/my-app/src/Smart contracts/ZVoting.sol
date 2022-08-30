// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.11;

import './verifier.sol';

contract SolidityTest is Verifier {
   
   string public title;
   uint[] public voters;
   uint public merkleRoot;

   uint public AyeCounter = 0;
   uint public NayCounter = 0;

   constructor(string memory _title, uint[] memory _voters, uint _merkleRoot) public {
      title = _title;
      voters = _voters;
      merkleRoot = _merkleRoot;
   }

   modifier commitmentNotDuplicate(string memory commitment) {
      require(
         nullifierMap[commitment] == false,
         "the voter has already voted for the motion"
      );
      _;
   }

   mapping(string => bool) public nullifierMap;
   
   function getVoters() public view returns(uint[] memory){
      return voters;
   }

   function Vote(
      uint[2] memory a,
      uint[2][2] memory b,
      uint[2] memory c,
      uint[7] memory input,
      string memory _nullifier,
      uint256 _vote
   ) public commitmentNotDuplicate(_nullifier) {
      require(verifyProof(a, b, c, input), "Invalid proof");
      nullifierMap[_nullifier] = true;

      if (_vote == 1) {
         AyeCounter += 1;
      } else {
         NayCounter += 1;
      }
   }
}
