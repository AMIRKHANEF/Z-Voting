const snarkjs = require('snarkjs');

async function buildProof(voters, index, publicRoot, votingKeyGenerator){
    const vkgHex = Buffer.from(votingKeyGenerator).toString('hex');
    try {
        const {
            proof,
            publicSignals
        } = await snarkjs.groth16.fullProve({
            VotingKeyGenerator: '0x' + vkgHex,
            index: index,
            publicRoot: publicRoot,
            voters: voters
            },
            './circuits/Zvoting/Zvoting.wasm',
            './circuits/Zvoting/Zv_0001.zkey');
        const calldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
        const abc = JSON.parse("[" + calldata + "]");
        return abc;
    } catch (error) {
        console.error(error);
        return false;
    }
}
module.exports = buildProof;