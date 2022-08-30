const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const VkGenerator = require('./VkGenerator')
const merkleTreeBuilder = require('./merkleTreeBuilder')
const buildProof = require('./buildProof')

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(pino);
app.use(express.json({
  limit: '1mb'
}))
app.get('/VKG', async (req, res) => {
  const vkg = req.query.vkg;
  const Vk = vkg ? await VkGenerator(vkg) : await VkGenerator();
  res.send(Vk);
});

app.post('/vote',async (req, res) => {
  const voters = req.body.voters;
  const index = req.body.index;
  const publicRoot = req.body.publicRoot;
  const votingKeyGenerator = req.body.votingKeyGenerator;

  const proof = await buildProof(voters, index, publicRoot, votingKeyGenerator);
  console.log('proof:', proof.inputs)
  res.send(proof);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);