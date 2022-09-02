pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";
include "../merkleTree/merkleTree.circom";
include "../votingKeyGenerator/VotingKeyGenerator.circom";
include "../trees/incrementalQuinTree.circom";

template ZVoting(num) {
    signal input VotingKeyGenerator;
    signal input index;
    signal input publicRoot;
    signal input voters[num];
    signal output nullifier;

    var privateRoot;
    var VotingKey;

    component pedersen = Pedersen(1);
    pedersen.in[0] <== VotingKeyGenerator;
    VotingKey = pedersen.out[0];

    log(VotingKey);

    component checker = QuinSelector(num);
    for(var i = 0;i< num; i++){
        checker.in[i] <== voters[i];
    }
    checker.index <== index;
    var indexed = checker.out;
    log(indexed);
    VotingKey === indexed;
    
    
    component BuildMerkleTree = MerkleTreeBuilder(num);

    for(var i = 0; i < num; i++){
        BuildMerkleTree.voters[i] <== voters[i];
    }
    privateRoot = BuildMerkleTree.root;
    log(privateRoot);

    publicRoot === privateRoot;

    component nullifierHasher = Pedersen(2);
    nullifierHasher.in[0] <== VotingKeyGenerator;
    nullifierHasher.in[1] <== VotingKey;
    nullifierHasher.out[0] ==> nullifier;
}

// component main{public [voters, publicRoot]} = ZVoting(5);