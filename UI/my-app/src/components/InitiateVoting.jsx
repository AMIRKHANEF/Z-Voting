import React, { useCallback, useEffect, useState } from 'react';
import { Grid,Button, Divider , Typography, TextField } from "@mui/material";
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
                console.log("contract.wait():",contract.deployTransaction.creates)
                console.log("contract.wait():",contract)
            })
        };
    
        if(votingTitle && vk1 && vk2 && vk3 && vk4 && vk5){
            console.log('im hereeee 1111')
            const voters = [];
            voters.push(vk1, vk2, vk3, vk4, vk5);
            console.log('im hereeee 1111:', voters)
            getPublicRoot(voters);
        }
    },[factory, vk1, vk2, vk3, vk4, vk5, votingTitle]);
    
    return(
        <>
            <Grid container item justifyContent={'center'}>
                <Grid item textAlign='center' sx={{py:5}}>
                    <Typography color={'black'} variant={'h4'} fontWeight={700} >Initaiting an anonymous & gasless voting</Typography>
                </Grid>
                <Grid container item justifyContent={'center'}>
                    <TextField id="outlined-basic" label='Voting Title' variant="outlined" sx={{width:'40%'}} onChange={votingTitleHandler}/>
                </Grid>

                <Grid container item justifyContent={'center'} alignItems='center' spacing={2} pt={8}>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%', pr: 3}} onChange={(event) => setVk1(event.target.value)}/>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk2(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%', pr: 3}} onChange={(event) => setVk3(event.target.value)}/>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk4(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk5(event.target.value)}/>
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
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={backHandler}><ArrowBackIcon /></Button>
        </>
    );
}