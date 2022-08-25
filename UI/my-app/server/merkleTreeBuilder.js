const {
    MerkleTree
} = require('merkletreejs');

function merkleTreeBuilder(voters) {
    const leaves = [];
    voters.forEach(voter => {
        const inputBuffer = Buffer.from(String(voter));
        leaves.push(inputBuffer);
    });
    const tree = new MerkleTree(leaves)
    // const layers = tree.getLayers();
    // console.log('layers:', (layers[1][0]).toString('hex'))
    // const hexlayers = tree.getHexLayers();
    // console.log('hexlayers:', (hexlayers[1][0]))
    const root = tree.getHexRoot()
    return root;
}

module.exports = merkleTreeBuilder;