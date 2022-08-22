pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";

template ZVoting() {
    signal input privateKey;
    // signal input index;
    // signal input votersCount;
    signal input voters[9];
    signal output nullifier;

    var generatedVotingKey;

    component pedersen = Pedersen(1);
    pedersen.in[0] <== privateKey;
    generatedVotingKey = pedersen.out[0];

    generatedVotingKey === voters[1];
    
    component nullifierHasher = Pedersen(2);
    nullifierHasher.in[0] <== privateKey;
    nullifierHasher.in[0] <== generatedVotingKey;
    nullifierHasher.out[0] ==> nullifier;

}
component main{public[voters]} = ZVoting();