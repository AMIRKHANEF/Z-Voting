pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";

template MerkleTreeBuilder(leaves) {
    signal input voters[leaves];
    // signal input vkIndice;
    signal output root;

    component VotingKeyGenerator = Pedersen(1);
    component MerkleTreeNodeHasher = Pedersen(2);

    var layerCounter = leaves;
    var nodes = leaves;
    var rootCal[leaves] = voters;

    while(layerCounter > 1){
        var layerNodes = 0;

        if(layerCounter % 2 == 0){
            layerCounter /= 2;
            layerNodes = (layerCounter * 2) - 1;
        } else {
            layerCounter = (layerCounter + 1) / 2;
            layerNodes = (layerCounter - 1) * 2;
        }
        var counter = 0;
        for(var i = 0; i < layerCounter; i++){
            if((counter + 1) > layerNodes){
                VotingKeyGenerator.in[0] <== rootCal[counter];
                rootCal[i] = VotingKeyGenerator.out[0];
                // rootCal[i] = rootCal[counter];
            } else {
                MerkleTreeNodeHasher.in[0] <== rootCal[counter];
                MerkleTreeNodeHasher.in[1] <== rootCal[counter + 1];
                rootCal[i] = MerkleTreeNodeHasher.out[0];
                // rootCal[i] = rootCal[counter] + rootCal[counter + 1];
            }
            counter += 2;
        }
    }
    root <== rootCal[0];
}

component main = MerkleTreeBuilder(3);