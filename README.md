# Z-Voting
A completely anonymous and private voting framework based on zero-knowledge proof.

# How it works
Everyone who wants to participate in a voting must have a VotingID, which you can build using GENERATE VOTINGID button, [Here is the helper video](https://github.com/AMIRKHANEF/Z-Voting#step-1---generating-a-votingid)

For initiating a voting first you should insert the voting title, then you need to have the voters VotingID and add them in the to voting, after that you sign the transaction and a voting smart contract will deploy on your selected blockchain, finally when everything goes well, you should share the deployed voting smart contract address with the voters. [Here is the helper video](https://github.com/AMIRKHANEF/Z-Voting#step-2---initializaoin-a-voting)

Voters who wants to submit thier vote in a voting must have the voting smart contract address and their VotingID, if the voter have permission for voting they can can choose between voting options and sign and send thier vote. [Here is the helper video](https://github.com/AMIRKHANEF/Z-Voting#step-3---vote)

# Installation
To run the Z-Voting framework, first install the dependencies `npm install` after dependencies successfully installed enter `npm run dev`.
Framework will automatically open on your default browser.

# How to use
Go through these steps to get familiar with Z-Voting
###  Step 1 - Generating a VotingID
![Generating VotingID](https://github.com/AMIRKHANEF/Z-Voting/blob/751fabdf7d9d1fa1fc620c39cc69d23247d9eab7/gifs/generateVotingID.gif)

### Step 2 - Initialization a voting
![Initiating a Voting](https://github.com/AMIRKHANEF/Z-Voting/blob/3a2f5ff58762035f6f7a0346dabe1eed7197d94c/gifs/InitiateVoting.gif)

### Step 3 - Vote
![Vote](https://github.com/AMIRKHANEF/Z-Voting/blob/751fabdf7d9d1fa1fc620c39cc69d23247d9eab7/gifs/Vote.gif)
