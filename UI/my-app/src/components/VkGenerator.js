import {
    groth16
} from 'snarkjs';

export async function VkGenerator(privateKey) {
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                in: String(privateKey)
            },
            '../../circuit/votingKeyGenerator/VotingKeyGenerator_js/VotingKeyGenerator.wasm',
            '../../circuit/votingKeyGenerator/VKG_0001.zkey');
        console.log(publicSignals);
        return publicSignals;
    } catch (error) {
        console.error(error);
        return false;
    }
}