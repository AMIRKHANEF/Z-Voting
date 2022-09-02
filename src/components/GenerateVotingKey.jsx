import React, { useCallback, useState } from 'react';
import { Grid,Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function GenerateVotingKey({back}){
    const [createVk, setCreateVk] = useState();
    const [mnemonic, setMnemonic] = useState();

    const fetchVk = ()=>{
        fetch('/VKG').then(async res => res.json()).then(data => {
            setCreateVk(data[0])
            setMnemonic(data[1])
        });
    };

    const genrateHandler = useCallback(()=>{
        fetchVk();
    },[]);

    const backHandler = useCallback(()=>{
        setCreateVk();
        setMnemonic();
        back(null);
    },[back]);

    return(
        <>
            <Grid item xs={12} textAlign='center' sx={{pt:5, fontWeight:700, fontSize:25}}>
              <Typography color={'black'} variant={'h4'} fontWeight={700} p={0} >Generating VotingID for Zero-Knowledge & Gasless Voting</Typography>
            </Grid>
            {createVk && 
                <Grid container justifyContent={'left'} pt={'50px'} pl={'200px'}>
                    <Grid item>
                        <span>PublicVotingID:</span><Typography fontWeight={700} color={'black'} variant={'h5'} >{createVk}</Typography>
                    </Grid>
                    <Grid item py={3}>
                        <span>PrivateVotingID:</span><Typography fontWeight={700} color={'black'} variant={'h5'} >{mnemonic}</Typography>
                    </Grid>
                    <Grid item xs={12}color={'gray'} textAlign='left' sx={{pt:5, pl:'150px', fontWeight:700, fontSize:25}}>
                        <Typography variant={'h6'}>PublicVotingID can be shared with anyone.</Typography>
                        <Typography variant={'h6'}>You need to share PublicVotingID with the voting admin to add you as a voter!</Typography>
                        <Typography variant={'h6'} pt={2} >You must keep your PrivateVotingID safe and you haven't to share it with anyone.</Typography>
                        <Typography variant={'h6'}>You need PrivateVotingID to submitting your vote!</Typography>
                    </Grid>
                </Grid>
            }
            <Grid container pt={8} justifyContent={'center'}>
                <Button variant='contained' sx={{p:2}} disabled={createVk} onClick={genrateHandler}>Generate</Button>
            </Grid>
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={backHandler}><ArrowBackIcon /></Button>
        </>
    );
}