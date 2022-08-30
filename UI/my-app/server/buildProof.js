const {
    groth16
} = require('snarkjs');

async function buildProof(voters, index, publicRoot, votingKeyGenerator){
    const vkgHex = Buffer.from(votingKeyGenerator).toString('hex');
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
            VotingKeyGenerator: '0x' + vkgHex,
            index: index,
            publicRoot: publicRoot,
            voters: voters
            },
            './circuits/Zvoting/Zvoting.wasm',
            './circuits/Zvoting/Zv_0001.zkey');
        return {
            a: proof.pi_a.slice(0,2),
            b: proof.pi_b.slice(0,2),
            c: proof.pi_c.slice(0,2),
            inputs: publicSignals
        };
    } catch (error) {
        console.error(error);
        return false;
    }
}
module.exports = buildProof;