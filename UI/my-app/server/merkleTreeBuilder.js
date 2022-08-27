const {
    groth16
} = require('snarkjs');

async function merkleTreeBuilder(voters) {
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                in: voters
            },
            '../circuits/merkleTree/merkleTree.wasm',
            '../circuits/merkleTree/merkleTree_0001.zkey');
        console.log(publicSignals);
        return publicSignals[0];
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = merkleTreeBuilder;