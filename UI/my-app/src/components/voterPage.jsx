import React, { useCallback, useEffect, useState } from 'react';
import { Grid,Button, Typography , CircularProgress, TextField } from "@mui/material";
import { Vote } from './VoteButton';
import {ethers} from 'ethers';
import { ZVotingABI } from '../Smart contracts/abi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Voter({back}){
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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const fetchVk = (vkg)=>{
        fetch(`/VKG?vkg=${vkg}`).then(async res =>{
          setVotingKey(await res.text())
        })
    };

    const fetchMt = (vs)=>{
        const url = (`/MT?voters=${vs}`).replaceAll(',', ';');
        fetch(url).then(async res =>{
          setPrivateRoot(await res.text())
        })
    };
    
    const getContractData = async ()=>{
        try {
          const contract = new ethers.Contract(contractAddress, ZVotingABI, signer);
    
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
          votingKeyGenerator && fetchVk(votingKeyGenerator);
          setFetchingInformation(true);
        } catch (error) {
          console.error(error)
          setContractAddress(false)
          setFetchingInformation(false)
        }
    };

    const addressHandler = useCallback((event)=>{
        const addr = event.target.value;
        setContractAddress(addr);
    },[]);
    
    const priHandler = useCallback((event)=>{
        const pri = event.target.value;
        setVotingKeyGenerator(pri);
    },[]);
    
    const confirmBtnHandler = useCallback(()=>{
        if (votingKeyGenerator && contractAddress){
          setFetchingInformation(undefined)
          getContractData();
        }
    },[contractAddress, votingKeyGenerator]);

    const backHandler = useCallback(()=>{
        setVotingTitle();
        setContractAddress();
        setVotingKeyGenerator();
        setFetchingInformation();
        setVotingKey();
        setVoters();
        setVotingOptions();
        setPublicRoot();
        setPrivateRoot();
        setCanVote();
        setVote();
        back(null);
    },[back]);

    useEffect(()=>{
        if (voters && voters.length >= 1){
          fetchMt(voters);
        }
    },[canVote, voters, votingKey]);

    useEffect(()=>{
        setCanVote(false)
        if(votingKey && voters && voters.includes(votingKeyGenerator)){
          setCanVote(true)
        }
    },[canVote, voters, votingKey, votingKeyGenerator]);

    return(
        <>
            { !submitVote &&
                <>
                    <Grid item xs={12} textAlign='center' sx={{py:3}}>
                        <Typography color={'black'} variant={'h4'} fontWeight={700} >Submit you vote anonymous & gasless</Typography>
                    </Grid>
                    <Grid item pb={2} xs={12} textAlign={'center'}>
                        <TextField id="outlined-basic" label='Enter voting contract address' variant="outlined" sx={{width:'40%'}} onChange={addressHandler}/>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <TextField id="outlined-basic" label='Enter your VotingKey generator / voting privatekey' sx={{width:'40%'}} variant="outlined" onChange={priHandler}/>
                    </Grid>
                    <Grid item py={1} xs={12} textAlign={'center'}>
                        <Button variant="contained" sx={{p:'10px 15px'}} onClick={confirmBtnHandler}>Confirm</Button>
                    </Grid>
                </>
            }
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
            { !canVote && fetchingInformation &&
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
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={backHandler}><ArrowBackIcon /></Button>
        </>
    );
}
