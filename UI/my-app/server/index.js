const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const VkGenerator = require('./VkGenerator')
const merkleTreeBuilder = require('./merkleTreeBuilder')

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(pino);

app.get('/VKG', async (req, res) => {
  const vkg = req.query.vkg;
  const Vk = await VkGenerator(vkg);
  res.send(Vk);
});

app.get('/MT', (req, res) => {
  const voters = req.query.voters.split(';');
  const Mt = merkleTreeBuilder(voters);
  res.send(Mt);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);