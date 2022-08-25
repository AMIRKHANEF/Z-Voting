const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {
    groth16
} = require('snarkjs');

async function VkGenerator(privateKey) {
    try {
        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                in: String(privateKey)
            },
            './circuits/votingKeyGenerator/VotingKeyGenerator_js/VotingKeyGenerator.wasm',
            './circuits/votingKeyGenerator/VKG_0001.zkey');
        console.log(publicSignals[0]);
        return publicSignals[0];
    } catch (error) {
        console.error(error);
        return false;
    }
}
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/VKG',async (req, res) => {
  const vkg = req.query.vkg;
  console.log('vkg:', vkg)
  const Vk = await VkGenerator(vkg);
//   res.setHeader('Content-Type', 'application/json');
  res.send(Vk);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);