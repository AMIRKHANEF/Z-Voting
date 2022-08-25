import { Grid,Button, Typography , CircularProgress, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import {ethers} from 'ethers';
import { Vote } from './components/VoteButton';
import MerkleTree from 'merkletreejs';
import {Buffer} from 'buffer';

// const getABI = (address) => {
//   const Http = new XMLHttpRequest();
//   const url=`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=ADJZSQWNVQ97P9EC7AX9UQ5D3U9TZ1AJEZ`;
//   Http.open("GET", url);
//   Http.send();

//   Http.onreadystatechange = (e) => {
//     console.log(Http.responseText)
//   }
// }

function Voting() {
  const [votingTitle, setVotingTitle] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [votingKeyGenerator, setVotingKeyGenerator] = useState();
  const [fetchingInformation, setFetchingInformation] = useState(null);
  const [votingKey, setVotingKey] = useState();
  const [voters, setVoters] = useState();
  const [votingOptions, setVotingOptions] = useState([]);
  const [publicRoot, setPublicRoot] = useState();
  const [privateRoot, setPrivateRoot] = useState();
  const [canVote, setCanVote] = useState(false);
  const [vote, setVote] = useState();
  const [submitVote, setSubmitVote] = useState(false);
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
  // useEffect(()=>{
  //   if (votingKeyGenerator && contractAddress){
  //     const doo = async ()=>{
  //       try {
  //         const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  //         const title = await contract.functions.title();
  //         const root = await contract.functions.merkleRoot();
  //         const votingOptions = await contract.functions.getVotingOptions();
  //         const voters = await contract.functions.getVoters();

  //         setPublicRoot(root[0]);
  //         setVotingTitle(title[0]);
  //         setVoters(voters[0]);
  //         setVotingOptions(votingOptions[0]);
  //         // votingKeyGenerator && setVotingKey(await VkGenerator(votingKeyGenerator))
  //       } catch (error) {
  //         console.error(error)
  //         setVotingKeyGenerator()
  //         setContractAddress(false)
  //       }
  //     }
  //   doo();
  //   }
  // }, [contractAddress, votingKeyGenerator]);

  const addressHandler = useCallback((event)=>{
    const addr = event.target.value;
    setContractAddress(addr);
  },[]);
  const priHandler = useCallback((event)=>{
    const pri = event.target.value;
    setVotingKeyGenerator(pri);
  },[]);
  const confirmBtnHandler = useCallback(()=>{
    const doo = async ()=>{
      try {
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        const title = await contract.functions.title();
        const root = await contract.functions.merkleRoot();
        const votingOptions = await contract.functions.getVotingOptions();
        const voters = await contract.functions.getVoters();

        setPublicRoot(root[0]);
        setVotingTitle(title[0]);
        const vs = [];
        voters[0].forEach(voter => {
          vs.push(String(voter));
        });
        setVoters(vs);
        setVotingOptions(votingOptions[0]);
        votingKeyGenerator && fetchVk();
        setFetchingInformation(true);
      } catch (error) {
        console.error(error)
        setContractAddress(false)
        setFetchingInformation(false)
      }
    }
    const fetchVk = ()=>{
      fetch(`VKG?vkg=${votingKeyGenerator}`).then(async res =>{
        setVotingKey(await res.text())
      })
    }
    if (votingKeyGenerator && contractAddress){
      setFetchingInformation(undefined)
    doo();
    }
  },[contractAbi, contractAddress, votingKeyGenerator]);
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
  },[canVote, voters, votingKey]);
  useEffect(()=>{
    if(votingKey && voters && voters.includes(votingKeyGenerator)){
      setCanVote(true)
    }
  },[canVote, voters, votingKey, votingKeyGenerator]);

  return (
    <>
    <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} textAlign='center' sx={{py:4, fontWeight:700, fontSize:25}}>
          Zero-Knowledge Gasless Voting framework 
      </Grid>
      { !submitVote &&
      <>
      <Grid item pb={2} xs={12} textAlign={'center'}>
        <TextField id="outlined-basic" label='Enter voting contract address' variant="outlined" sx={{width:'40%'}} onChange={addressHandler}/>
      </Grid>
      <Grid item xs={12} textAlign={'center'}>
        <TextField id="outlined-basic" label='Enter your VotingKey generator / voting privatekey' sx={{width:'40%'}} variant="outlined" onChange={priHandler}/>
      </Grid>
      <Grid item py={1} xs={12} textAlign={'center'}>
        <Button variant="contained" sx={{p:'10px 15px'}} onClick={confirmBtnHandler}>Confirm</Button>
      </Grid>
      </>}
      {votingTitle && contractAddress && !submitVote &&
        <Grid item xs={12} textAlign='center'>
          <h2>{votingTitle}</h2>
        </Grid>
      }
      {votingOptions.length >= 1 && contractAddress && !submitVote &&
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} pt={2} >
          {votingOptions.map((option, key) => { return (<Vote confirmVote={setVote} option={Number(option)} vote={vote} readOnly={!canVote}/>);})}
        </Grid>
      }
      {fetchingInformation && !canVote &&
        <Grid container item xs={12} pt={5} textAlign='center'>
          <Grid item xs={12}>
            <Typography color={'blue'} variant={'h6'} p={0} >you haven't permission to vote!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color={'blue'} variant={'h6'} p={0}>make sure you votingKey generator is correct!</Typography>
          </Grid>
        </Grid>
      }
      {fetchingInformation === undefined &&
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} pt={5}>
          <CircularProgress />
        </Grid>
      }
      {fetchingInformation === false &&
        <Typography color={'red'} variant={'h4'} pt={5}>Make sure the Voting contract address is correct!</Typography>
      }
      { !submitVote &&
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>
          <Button
          variant="contained"
          sx={{position: 'absolute', bottom: "10%", p: '10px', fontWeight:700, fontSize: '20px'}}
          disabled={!publicRoot || !vote || !privateRoot || publicRoot !== privateRoot || !canVote}
          onClick={()=> !submitVote && setSubmitVote(true)}
          >
            Submit your vote
          </Button>
        </Grid>
      }
      {

      }

    </Grid>
    </>
  );
}

export default Voting;
