import React, { useCallback, useEffect, useState } from 'react';
import { Grid,Button, Divider , Typography, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function InitiateVoting(){
    const [votingTitle, setVotingTitle] = useState();
    const [vk1, setVk1] = useState();
    const [vk2, setVk2] = useState();
    const [vk3, setVk3] = useState();
    const [vk4, setVk4] = useState();
    const [vk5, setVk5] = useState();
    const [voters, setVoters] = useState();

    const votingTitleHandler = useCallback((event)=>{
        const title = event.target.value;
        setVotingTitle(title)
    },[])

    const nextStepHandler = useCallback(()=>{
        vk1 && vk2 && vk3 && vk4 && vk5 && setVoters([vk1, vk2, vk3, vk4, vk5]);
        console.log('voters:', voters)
    },[vk1, vk2, vk3, vk4, vk5, voters])
    
    return(
        <>
            <Grid container item justifyContent={'center'}>
                <Grid item textAlign='center' sx={{py:5}}>
                    <Typography color={'black'} variant={'h4'} fontWeight={700} >Initaiting an anonymous & gasless voting</Typography>
                </Grid>
                <Grid container item justifyContent={'center'} pt={3}>
                    <TextField id="outlined-basic" label='Voting Title' variant="outlined" sx={{width:'40%'}} onChange={votingTitleHandler}/>
                </Grid>

                <Grid container item justifyContent={'center'} alignItems='center' spacing={2} pt={4}>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk1(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk2(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk3(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk4(event.target.value)}/>
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <TextField id="outlined-basic" label='Voters votingKey' variant="outlined" sx={{width:'30%'}} onChange={(event) => setVk5(event.target.value)}/>
                    </Grid>
                </Grid>
            </Grid>
            <Button sx={{position: 'absolute', top: '3%', left: '2%', width:'35px', height: '35px'}} variant="contained" onClick={nextStepHandler}><ArrowBackIcon /></Button>
        </>
    );
}