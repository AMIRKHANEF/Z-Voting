pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";
include "../merkleTree/merkleTree.circom";
include "../votingKeyGenerator/VotingKeyGenerator.circom";

template ZVoting(num) {
    signal input VotingKeyGenerator;
    signal input indice;
    signal input voters[num];
    signal output nullifier;

    component pedersen = Pedersen(1);
    pedersen.in[0] <== VotingKeyGenerator;
    VotingKey === pedersen.out[0];
    
    component nullifierHasher = Pedersen(2);
    nullifierHasher.in[0] <== VotingKeyGenerator;
    nullifierHasher.in[1] <== VotingKey;
    nullifierHasher.out[0] ==> nullifier;
}
component main{public voters} = ZVoting(5);