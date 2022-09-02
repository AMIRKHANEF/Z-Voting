const {
    groth16
} = require('snarkjs');
const {
    mnemonicGenerate
} = require('@polkadot/util-crypto');

async function VkGenerator(privateKey) {
    const mnemonic = mnemonicGenerate();
    const mnemonicHex = Buffer.from(mnemonic).toString('hex');
    const privateKeyHex = privateKey && Buffer.from(privateKey).toString('hex');

    try {
        const {
            publicSignals
        } = await groth16.fullProve({
                in: privateKeyHex ? ('0x' + privateKeyHex) : ('0x' + mnemonicHex)
            },
            './circuits/votingKeyGenerator/VotingKeyGenerator.wasm',
            './circuits/votingKeyGenerator/VKG_0001.zkey');
        console.log(publicSignals);
        return  privateKey ? publicSignals[0] : [publicSignals[0], mnemonic];
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = VkGenerator;