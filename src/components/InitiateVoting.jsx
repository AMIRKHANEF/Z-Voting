import React, { useCallback, useState } from 'react';
import { Grid,Button, CircularProgress , Typography, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ethers} from 'ethers';
import { ZVotingABI, ZVotingByteCode } from '../Smart contracts/ZvotingCompiled';
import { useMemo } from 'react';

export function InitiateVoting({back}){
    const [votingTitle, setVotingTitle] = useState();
    const [vk1, setVk1] = useState();
    const [vk2, setVk2] = useState();
    const [vk3, setVk3] = useState();
    const [vk4, setVk4] = useState();
    const [vk5, setVk5] = useState();
    const [contractAddress, setContractAddress] = useState(null);
    const [networkName, setNetworkName] = useState();
    const [txHash, setTxHash] = useState();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factory = useMemo(()=> { return new ethers.ContractFactory(ZVotingABI, ZVotingByteCode, signer)},[signer]);

    const votingTitleHandler = useCallback((event)=>{
        const title = event.target.value;
        setVotingTitle(title)
    },[])

    const backHandler = useCallback(()=>{
        back(null);
    },[back]);

    const nextStepHandler = useCallback(async ()=>{
        setContractAddress(undefined)
        const getPublicRoot = (vts)=>{
            fetch('/MTB',{
                method: 'post', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ 
                    voters: vts
                })
            }).then(async res => {
                console.log('im hereeee 2222')
                const merkleTreeRoot = await res.text();
                console.log('im hereeee 2222:', merkleTreeRoot)
                const contract = await factory.deploy(votingTitle, vts, merkleTreeRoot);
                setContractAddress(contract.deployTransaction.creates)
                setTxHash(contract.deployTransaction.hash)
                setNetworkName(contract.provider._network.name)
                console.log("contract.wait():",contract.provider._network.name)
            })
        };
    
        if(votingTitle && vk1 && vk2 && vk3 && vk4 && vk5){
            const voters = [];
            voters.push(vk1, vk2, vk3, vk4, vk5);
            getPublicRoot(voters);
        }
    },[factory, vk1, vk2, vk3, vk4, vk5, votingTitle]);

    const etherscanHandler = useCallback(()=>{
        window.open(`https://${networkName}.etherscan.io/tx/${txHash}`, '_blank')
    },[networkName, txHash])
    
    return(
        <>
            {contractAddress === null &&
            <Grid container item justifyContent={'center'}>
                <Grid item textAlign='center' sx={{py:5}}>
                    <Typography color={'black'} variant={'h4'} fontWeight={700} >Initaiting an anonymous & gasless voting</Typography>
                </Grid>
                <Grid container item justifyContent={'center'}>
                    <TextField id="outlined-basic" label='Voting Title' variant="outlined" sx={{width:'40%'}} onChange={votingTitleHandler}/>
                </Grid>

                <Grid container item justifyContent={'center'} alignItems='center' spacing={2} pt={8}>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Add PublicVotingID' variant="outlined" sx={{width:'30%', pr: 3}} onChange={(event) => setVk1(event.target.value)}/>
                        <TextField id="outlined-basic" label='Add PublicVotingID' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk2(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Add PublicVotingID' variant="outlined" sx={{width:'30%', pr: 3}} onChange={(event) => setVk3(event.target.value)}/>
                        <TextField id="outlined-basic" label='Add PublicVotingID' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk4(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Add PublicVotingID' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk5(event.target.value)}/>
                    </Grid>
                </Grid>
                <Grid container item  justifyContent={'center'} pt={5}>
                    <Button
                        disabled={!votingTitle || !vk1 || !vk2 || !vk3 || !vk4 || !vk5}
                        variant='contained'
                        sx={{p:2, fontSize:'16px', fontWeight:600}}
                        onClick={nextStepHandler}
                        >Initating voting
                    </Button>
                </Grid>
            </Grid>
            }
            {contractAddress === undefined &&
                <Grid container item xs={12} textAlign={'center'} pt={20}>
                    <Grid item justifyContent={'center'} xs={12}>
                        <CircularProgress/>
                    </Grid>
                    <Grid item justifyContent={'center'} xs={12}>
                        <Typography color={'black'} variant={'h5'} fontWeight={700} pt={5} >Sign your transaction and wait for the voting to take place!</Typography>
                    </Grid>
                </Grid>
            }
            {contractAddress &&
                <Grid item xs={12} textAlign='center' sx={{py:3}}>
                    <Typography color={'black'} variant={'h5'} fontWeight={700} pt={20} >The Voting started In This Address:</Typography>
                    <Typography color={'black'} variant={'h4'} fontWeight={700} py={5} >{contractAddress}</Typography>
                    <Button variant='contained' onClick={etherscanHandler}>View on etherscan</Button>
                </Grid>
            }
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={backHandler}><ArrowBackIcon /></Button>
        </>
    );
}