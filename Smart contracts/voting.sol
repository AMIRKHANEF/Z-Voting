// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.0;

contract SolidityTest {
    constructor() public {}

    function getResult() public view returns (uint256) {
        uint256 a = 1;
        uint256 b = 2;
        uint256 result = a + b;
        return result;
    }
}
