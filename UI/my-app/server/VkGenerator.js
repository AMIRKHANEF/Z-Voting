const {
    groth16
} = require('snarkjs');

export default async function VkGenerator(privateKey) {
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                // in: String(privateKey)
                in: '0'
            },
            'VotingKeyGenerator.wasm',
            'VKG_0001.zkey');
        console.log(publicSignals);
        return publicSignals;
    } catch (error) {
        console.error(error);
        return false;
    }
}