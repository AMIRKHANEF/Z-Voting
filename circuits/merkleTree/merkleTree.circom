pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";

function TwovsOne(layerCounter){
    var one_two[2] =[0,0];
    while(layerCounter > 1){
        var layerNodes = 0;

        if(layerCounter % 2 == 0){
            layerCounter /= 2;
            layerNodes = (layerCounter * 2) - 1;
            one_two[1] += layerCounter;
        } else {
            layerCounter = (layerCounter + 1) / 2;
            layerNodes = (layerCounter - 1) * 2;
            one_two[1] += layerCounter - 1;
            one_two[0] += 1;
        }
    }
    return one_two;
}

template MerkleTreeBuilder(leaves) {
    signal input voters[leaves];
    // signal input vkIndice;
    signal output root;

    var two_one[2] = TwovsOne(leaves);
    component VotingKeyGenerator[two_one[0]];
    component MerkleTreeNodeHasher[two_one[1]];

    var layerCounter = leaves;
    var nodes = leaves;
    var rootCal[leaves] = voters;
    var twoCounter = 0;
    var oneCounter = 0;

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
                VotingKeyGenerator[oneCounter] = Pedersen(1);
                VotingKeyGenerator[oneCounter].in[0] <== rootCal[counter];
                rootCal[i] = VotingKeyGenerator[oneCounter].out[0];
                oneCounter++;
            } else {
                MerkleTreeNodeHasher[twoCounter] = Pedersen(2);
                MerkleTreeNodeHasher[twoCounter].in[0] <== rootCal[counter];
                MerkleTreeNodeHasher[twoCounter].in[1] <== rootCal[counter + 1];
                rootCal[i] = MerkleTreeNodeHasher[twoCounter].out[0];
                twoCounter++;
            }
            counter += 2;
        }
    }
    root <== rootCal[0];
}

// component main = MerkleTreeBuilder(5);