import { Grid,TextField, Typography , CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import {ethers} from 'ethers';
import { Input } from './components/Input';
import { Vote } from './components/VoteButton';

function hex_to_ascii(str1){
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

const getABI = (address) => {
  const Http = new XMLHttpRequest();
  const url=`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=ADJZSQWNVQ97P9EC7AX9UQ5D3U9TZ1AJEZ`;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
}

function App() {
  const [votingTitle, setVotingTitle] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [votingKey, setVotingKey] = useState();
  const [voters, setVoters] = useState();
  const [votingOption, setVotingOption] = useState([]);
  const [vote, setVote] = useState();
  // const ContractAddress = '0xc32c87954170a953a418c9f4bd3cc3a15cc6f00f';
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
          "name": "_votingOption",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_voter",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTitle",
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
    }
  ]
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  useEffect(()=>{
    if (votingKey && contractAddress){
      const doo = async ()=>{
        try {
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          const title = await contract.functions.getTitle();
          const voters = await contract.functions.getVoters();
          const votingOptions = await contract.functions.getVotingOptions();

          setVotingTitle(title[0]);
          setVoters(voters[0]);
          setVotingOption(votingOptions[0]);
        } catch (error) {
          setContractAddress(false)
        }
      }
    doo();
    }
  }, [contractAddress, votingKey]);

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
        <Input _lable={'Enter your VotingKey generator / voting privatekey'} btnText={'Confirm'} btnOnClickFunction={setVotingKey}/>
      </Grid>
      }
      {votingTitle && contractAddress &&
        <Grid item xs={12} textAlign='center'>
          <h2>{votingTitle}</h2>
        </Grid>
      }
      {votingOption.length >= 1 && contractAddress &&
        <Grid container item xs={8} justifyContent={'center'} alignItems={'center'} pt={5} spacing={15}>
          {votingOption.map((option) => { return (<Vote confirmVote={setVote} option={Number(option)} vote={vote} />);})}
        </Grid>
      }
      {!votingTitle && !votingOption.length >= 1 && contractAddress && votingKey &&
        <Grid container item xs={8} justifyContent={'center'} alignItems={'center'} pt={5}>
          <CircularProgress />
        </Grid>
      }
      {contractAddress === false &&
        <Typography color={'red'} variant={'h4'} pt={5}>Make sure the Voting contract address is correct!</Typography>
      }
    </Grid>
    </>
  );
}

export default App;
