pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";

template VotingKeyGenerator() {
    signal input in;
    signal output out;

    component pedersen = Pedersen(1);
    pedersen.in[0] <== in;
    pedersen.out[0] ==> out;
}

// component main = VotingKeyGenerator();