import React, { useCallback, useState } from 'react';
import { Grid,Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function GenerateVotingKey({back}){
    const [createVk, setCreateVk] = useState();
    const [mnemonic, setMnemonic] = useState();

    const fetchVk = ()=>{
        fetch('/VKG').then(async res => res.json()).then(data => {
            console.log('data:', data)
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
            {createVk && 
                <Grid container justifyContent={'left'} pt={'150px'} px={'200px'}>
                    <Grid item>
                        <span>VotingKey:</span><Typography color={'black'} variant={'h5'} >{createVk}</Typography>
                    </Grid>
                    <Grid item py={3}>
                        <span>PrivateKey:</span><Typography color={'black'} variant={'h5'} >{mnemonic}</Typography>
                    </Grid>
                </Grid>
            }
            <Grid container pt={10} justifyContent={'center'}>
                <Button variant='contained' disabled={createVk} onClick={genrateHandler}>Generate</Button>
            </Grid>
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={backHandler}><ArrowBackIcon /></Button>
        </>
    );
}