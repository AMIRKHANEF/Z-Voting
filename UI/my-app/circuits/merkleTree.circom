pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";

template MerkleTreeBuilder(leaves) {
    signal input Voters[leaves];
    signal input VkIndice;
    signal output root;

    component VotingKeyGenerator = Pedersen(1);
    component MerkleTreeNodeHasher = Pedersen(2);


    var leafCount = leaves;
    var nodes = leaves;
    var isOdd = (leaves % 2) === 0 ? 0 : 1;

    while(leafCount > 1){
        if(leafCount % 2 === 0){
            leafCount /= 2;
            isOdd = 0;
        } else {
            leafCount = (leafCount + 1) / 2;
            isOdd = 1;
        }

        for(var i = 0; i < leafCount; i++){
            
        }
    }

    var nodesValues[nodes];
    for(var i; i < nodes; i+=2){
        
    }

}
