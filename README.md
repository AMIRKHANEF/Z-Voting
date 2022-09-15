# Z-Voting
A completely anonymous and private voting framework based on zero-knowledge proof.

# How it works
Every voter must have a VotingID, which you can build using GENERATE VOTINGID button, [Here is a helper video](https://github.com/AMIRKHANEF/Z-Voting#step-1---generating-a-votingid)

For innitializing a voting, you should enter the voting title and the voters VotingID, after that you sign the transaction and a voting smart contract will be deployed on your selected blockchain, finally when everything goes well, you need to share the deployed voting smart contract address with the voters. [Here is a helper video](https://github.com/AMIRKHANEF/Z-Voting#step-2---initializaoin-a-voting)

Voter for submitting thier vote in a voting, must have the voting smart contract address, if the voter has permission for voting they can choose between voting options and sign and send thier vote. [Here is a helper video](https://github.com/AMIRKHANEF/Z-Voting#step-3---vote)

# Installation
To run the Z-Voting framework, first you need to clone this repository, installing the dependencies using `npm install` command inside you command prompt after dependencies successfully installed enter `npm run dev` command and magic happens.
Framework will automatically open on your default browser.

# How to use
Go through these steps to get familiar with Z-Voting
###  Step 1 - Generating a VotingID
Everyone as a voter must have a VotingID.
![Generating VotingID](https://github.com/AMIRKHANEF/Z-Voting/blob/751fabdf7d9d1fa1fc620c39cc69d23247d9eab7/gifs/generateVotingID.gif)

### Step 2 - Initialization a voting
The easiest way for initializing a voting, just enter the voting title and the voters who you want to participant in this voting.
Please remember, as a voting admin you have to share the voting smart contract address with the voters.
![Initiating a Voting](https://github.com/AMIRKHANEF/Z-Voting/blob/3a2f5ff58762035f6f7a0346dabe1eed7197d94c/gifs/InitiateVoting.gif)

### Step 3 - Vote
submit your vote with just a click, enter the voting smart contract address, your private VotingKey, choose between the voting option, finally you can use every account address you want to sign your transaction.
![Vote](https://github.com/AMIRKHANEF/Z-Voting/blob/751fabdf7d9d1fa1fc620c39cc69d23247d9eab7/gifs/Vote.gif)
