const {
    groth16
} = require('snarkjs');

async function merkleTreeBuilder(voters) {
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                voters: voters
            },
            './circuits/merkleTree/merkleTree.wasm',
            './circuits/merkleTree/Mt_0001.zkey');
        console.log(publicSignals);
        console.log('publicSignals:',publicSignals[0])
        return publicSignals[0];
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = merkleTreeBuilder;