import { Grid,Button, Typography , CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import {ethers} from 'ethers';
import { Input } from './components/Input';
import { Vote } from './components/VoteButton';
import MerkleTree from 'merkletreejs';
import {Buffer} from 'buffer';
import {VkGenerator} from './components/VkGenerator';

// const getABI = (address) => {
//   const Http = new XMLHttpRequest();
//   const url=`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=ADJZSQWNVQ97P9EC7AX9UQ5D3U9TZ1AJEZ`;
//   Http.open("GET", url);
//   Http.send();

//   Http.onreadystatechange = (e) => {
//     console.log(Http.responseText)
//   }
// }

function App() {
  const [votingTitle, setVotingTitle] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [votingKeyGenerator, setVotingKeyGenerator] = useState();
  const [votingKey, setVotingKey] = useState();
  const [voters, setVoters] = useState();
  const [votingOptions, setVotingOptions] = useState([]);
  const [publicRoot, setPublicRoot] = useState();
  const [privateRoot, setPrivateRoot] = useState();
  const [vote, setVote] = useState();
  // const ContractAddress = '0xf866b27cad5ac564de864fe50281c4ddaad5eff5';
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "_votingOptions",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_voters",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes32",
          "name": "_merkleRoot",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getVoters",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getVotingOptions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "merkleRoot",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "title",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votingOptions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  useEffect(()=>{
    if (votingKeyGenerator && contractAddress){
      const doo = async ()=>{
        try {
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);

          const title = await contract.functions.title();
          const root = await contract.functions.merkleRoot();
          const votingOptions = await contract.functions.getVotingOptions();
          const voters = await contract.functions.getVoters();

          setPublicRoot(root[0]);
          setVotingTitle(title[0]);
          setVoters(voters[0]);
          setVotingOptions(votingOptions[0]);
          votingKeyGenerator && setVotingKey(await VkGenerator(votingKeyGenerator))
        } catch (error) {
          console.error(error)
          setVotingKeyGenerator()
          setContractAddress(false)
        }
      }
    doo();
    }
  }, [contractAddress, votingKeyGenerator]);

  useEffect(()=>{
    if (voters && voters.length >= 1){
      const leaves = [];
      voters.forEach(voter => {
        const inputBuffer = Buffer.from(String(voter));
        leaves.push(inputBuffer);
      });
      const tree = new MerkleTree(leaves)
      const root  = tree.getHexRoot()
      setPrivateRoot(root);
    }
  },[voters, votingKey]);

  return (
    <>
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} textAlign='center' sx={{py:3, fontWeight:700, fontSize:25}}>
        "Amir Ekbatanifard's first professional project!"
      </Grid>
      <Grid item py={2} xs={12}>
        <Input _lable='Enter voting contract address' btnText='Confirm' btnOnClickFunction={setContractAddress}/>
      </Grid>
      {contractAddress &&
      <Grid item py={1} xs={12}>
        <Input _lable={'Enter your VotingKey generator / voting privatekey'} btnText={'Confirm'} btnOnClickFunction={setVotingKeyGenerator}/>
      </Grid>
      }
      {votingTitle && contractAddress &&
        <Grid item xs={12} textAlign='center'>
          <h2>{votingTitle}</h2>
        </Grid>
      }
      {votingOptions.length >= 1 && contractAddress &&
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} pt={2} >
          {votingOptions.map((option, key) => { return (<Vote confirmVote={setVote} option={Number(option)} vote={vote} />);})}
        </Grid>
      }
      {!votingTitle && !votingOptions.length >= 1 && contractAddress && votingKeyGenerator &&
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} pt={5}>
          <CircularProgress />
        </Grid>
      }
      {contractAddress === false &&
        <Typography color={'red'} variant={'h4'} pt={5}>Make sure the Voting contract address is correct!</Typography>
      }
      {
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} pt={5}>
          <Button variant="contained"
          sx={{position: 'absolute', bottom: "15%", p: '10px', fontWeight:700, fontSize: '20px'}}
          disabled={!publicRoot || !vote || !privateRoot || publicRoot !== privateRoot} >
            Submit your vote
          </Button>
        </Grid>
      }

    </Grid>
    </>
  );
}

export default App;
