const snarkjs = require('snarkjs');
// let root = [1, 2, 3, 4, 5, 6, 7, 8];
// let root = [1, 2, 3];

async function prove(){
    const publicSignals = await snarkjs.groth16.fullProve({
        VotingKeyGenerator: 12345,
        VotingKey: '5470837527801859476637479809685048117954687279553045117433714472916822705394'
    },
    './UI/my-app/circuits/Zvoting/Zvoting.wasm',
    './UI/my-app/circuits/Zvoting/Zvoting_0001.zkey');
    // './UI/my-app/circuits/votingKeyGenerator/VotingKeyGenerator.wasm',
    // './UI/my-app/circuits/votingKeyGenerator/VKG_0001.zkey');
    console.log('publicSignals:', publicSignals)
}
prove()

// let layerCounter = root.length;
// let layerNodes = 0;
// while (layerCounter > 1) {
//     if (layerCounter % 2 === 1) {
//         layerCounter = (layerCounter + 1) / 2 // 4
//         layerNodes = (layerCounter - 1) * 2;
//     } else {
//         layerCounter /= 2; // 4
//         layerNodes = (layerCounter * 2) - 1;
//     }
//     let counter = 0;
//     for (var i = 0; i < layerCounter; i++) { //4
//         if ((counter + 1) > layerNodes) {
//             root[i] = root[counter]
//         } else {
//             root[i] = root[counter] + root[counter + 1];
//         }
//         counter += 2;
//     }
// }
// console.log('root:', root)
