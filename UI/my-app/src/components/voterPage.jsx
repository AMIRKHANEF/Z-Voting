import React, { useCallback, useEffect, useState } from 'react';
import { Grid,Button, Typography , CircularProgress, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Vote } from './VoteButton';
import {ethers} from 'ethers';
import { ZVotingABI } from '../Smart contracts/ZvotingCompiled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Voter({back}){
    const [votingTitle, setVotingTitle] = useState();
    const [contractAddress, setContractAddress] = useState();
    const [votingKeyGenerator, setVotingKeyGenerator] = useState();
    const [fetchingInformation, setFetchingInformation] = useState(null);
    const [votingKey, setVotingKey] = useState();
    const [voters, setVoters] = useState();
    const [publicRoot, setPublicRoot] = useState();
    const [ayesCounter, setAyesCounter] = useState();
    const [naysCounter, setNaysCounter] = useState();
    const [canVote, setCanVote] = useState(false);
    const [vote, setVote] = useState();
    const [index, setIndex] = useState();
    const [submitVote, setSubmitVote] = useState(false);
    const [done, setDone] = useState(null);
    const [sucess, setSucess] = useState(null);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const getContractData = async ()=>{
        try {
          const contract = new ethers.Contract(contractAddress, ZVotingABI, signer);
          const title = await contract.functions.title();
          const root = await contract.functions.merkleRoot();
          const voters = await contract.functions.getVoters();
          
          const ayes = await contract.AyeCounter();
          setAyesCounter(ayes.toString())
          const nays = await contract.NayCounter();
          setNaysCounter(nays.toString())

          setPublicRoot(root[0].toString());
          setVotingTitle(title[0]);
          const vs = [];
          voters[0].forEach(voter => {
            vs.push(String(voter));
          });
          setVoters(vs);
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

    const confirmBtnHandler = useCallback(()=>{
        if (votingKey && contractAddress){
          setFetchingInformation(undefined)
          getContractData();
        }
    },[contractAddress, votingKey]);

    const backHandler = useCallback(()=>{
        setVotingTitle();
        setContractAddress();
        setVotingKeyGenerator();
        setFetchingInformation();
        setVotingKey();
        setVoters();
        setPublicRoot();
        setCanVote();
        setVote();
        back(null);
    },[back]);

    const getPublicVotingID = async (vkg) =>{
        fetch(`/VKG?vkg=${vkg}`).then(async res =>{
            const vk = await res.text();
            setVotingKey(vk);
        });
    };

    useEffect(()=>{
        if(votingKeyGenerator){
            getPublicVotingID(votingKeyGenerator)
        }
    },[votingKeyGenerator]);

    useEffect(()=>{
        setCanVote(false)
        if(votingKey && voters && voters.includes(votingKey)){
          setCanVote(true)
          setIndex(voters.indexOf(votingKey))
        }
    },[canVote, voters, votingKey]);

    const vkgHandler = useCallback((event)=>{
        const vkg = event.target.value;
        setVotingKeyGenerator(vkg);
    },[]);

    const submitVoteOnContract = async (calldata, voteValue) => {
        console.log('voteValue:', voteValue);
        const contract = new ethers.Contract(contractAddress, ZVotingABI, signer);
        try {
            const votingProcess = await contract.functions.Vote(calldata[0], calldata[1], calldata[2], calldata[3], voteValue);
            const recipt = await votingProcess.wait()
            setSucess(true);
        } catch (error) {
            console.error(error);
            setSucess(false)
        }
    };

    const doVote = (vt, indice, pR, vKG)=>{
        fetch('/vote',{ 
            method: 'post', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                voters: vt,
                index: indice,
                publicRoot: pR,
                votingKeyGenerator: vKG
            })
        }).then(async res =>{
            const proof = await res.text();
            try {
                console.log('vote:', vote);
                submitVoteOnContract(JSON.parse(proof), vote === 'AYE' ? 1 : 0);
            } catch (error) {
            console.error(error);            
            console.log('error.reason',error.reason);            
            }
        });
    };

    const submitHandler = useCallback(() => {
        !submitVote && setSubmitVote(true);
        if (votingKeyGenerator && voters && publicRoot && index !== undefined && vote){
            setSucess(undefined);
            setDone(true);
            doVote(voters, index, publicRoot, votingKeyGenerator);
        }
    },[index, publicRoot, submitVote, voters, votingKeyGenerator, vote]);

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
                        <TextField id="outlined-basic" label='Enter your PrivateVotingID' sx={{width:'40%'}} variant="outlined" onChange={vkgHandler}/>
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

            {fetchingInformation && contractAddress && !submitVote &&
                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} pt={2} >
                    <Vote confirmVote={setVote} option={'AYE'} vote={vote} readOnly={!canVote} />
                    <Vote confirmVote={setVote} option={'NAY'} vote={vote} readOnly={!canVote} />
                    <Grid item xs={12}>
                        <Typography textAlign={'center'} color={'black'} variant={'h6'} fontWeight={500}>Aye: {ayesCounter} Nay: {naysCounter}</Typography>
                    </Grid>
                </Grid>
            }

            {!canVote && fetchingInformation &&
                <Grid container item xs={12} pt={5} textAlign='center'>
                    <Grid item xs={12}>
                        <Typography color={'blue'} variant={'h6'} p={0} >you haven't permission to vote!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color={'blue'} variant={'h6'} p={0}>make sure you votingKey is correct!</Typography>
                    </Grid>
                </Grid>
            }

            {fetchingInformation === undefined &&
                <Grid container item xs={12} textAlign={'center'} pt={10}>
                    <Grid item justifyContent={'center'} xs={12}>
                        <CircularProgress/>
                    </Grid>
                    <Grid item justifyContent={'center'} xs={12}>
                        <Typography color={'black'} variant={'h5'} pt={5}>Getting Voting information!</Typography>
                    </Grid>
                </Grid>
            }

            {fetchingInformation === false &&
                <Typography color={'red'} variant={'h4'} pt={5}>Make sure the Voting contract address is correct!</Typography>
            }

            {!submitVote &&
                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>
                    <Button
                    variant="contained"
                    sx={{position: 'absolute', bottom: "10%", p: '10px', fontWeight:700, fontSize: '20px'}}
                    disabled={!publicRoot || !vote || !canVote}
                    // onClick={()=> !submitVote && setSubmitVote(true)}
                    onClick={submitHandler}
                    >
                      Submit your vote
                    </Button>
                </Grid>
            }

            {done && sucess === undefined &&
                <Grid container item xs={12} textAlign={'center'} pt={20}>
                    <Grid item justifyContent={'center'} xs={12}>
                        <CircularProgress/>
                    </Grid>
                    <Grid item justifyContent={'center'} xs={12}>
                        <Typography color={'black'} variant={'h5'} fontWeight={700} pt={5} >Sign your transaction and wait for the vote to take place!</Typography>
                    </Grid>
                </Grid>
            }

            {done && sucess === false &&
                <Grid item xs={12} flexDirection='column' textAlign={'center'} pt={15} px={15}>
                    <Typography color={'red'} variant={'h4'} fontWeight={700} pt={5}>Submitting vote failed</Typography>
                    <Typography color={'red'} variant={'h5'} fontWeight={700} pt={5}>Make sure the smart contract address and PrivateVotingID are correct!</Typography>
                </Grid>
            }

            {done && sucess &&
                <Grid container item xs={12} textAlign={'center'} pt={20}>
                    <Grid item justifyContent={'center'} xs={12}>
                        <CheckCircleIcon sx={{width: '150px', height:'150px'}} color="success" />
                    </Grid>
                    <Grid item justifyContent={'center'} xs={12}>
                        <Typography color={'black'} variant={'h5'} fontWeight={700}>Your vote submitted successfully</Typography>
                    </Grid>
                </Grid>
            }
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={backHandler}><ArrowBackIcon /></Button>
        </>
    );
}
