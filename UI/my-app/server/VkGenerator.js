const {
    groth16
} = require('snarkjs');

async function VkGenerator(privateKey) {
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                // in: String(privateKey)
                in: '0'
            },
            './circuits/votingKeyGenerator/VotingKeyGenerator_js/VotingKeyGenerator.wasm',
            './circuits/votingKeyGenerator/VKG_0001.zkey');
        console.log(publicSignals);
        return publicSignals[0];
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = VkGenerator;