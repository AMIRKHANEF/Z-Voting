import { Grid,Button, Typography } from "@mui/material";
import {HowToVote as HowToVoteIcon, ThumbsUpDown as ThumbsUpDownIcon, Ballot as BallotIcon} from '@mui/icons-material';
import React, { useState } from 'react';
import {Voter} from './components/voterPage'
import {InitiateVoting} from './components/InitiateVoting'
import {GenerateVotingKey} from './components/GenerateVotingKey'

function Voting() {
  const [choose, setChoose] = useState(null);
  return (
    <>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        {choose === null &&
          <>
            <Grid item xs={12} textAlign='center' sx={{py:5, fontWeight:700, fontSize:25}}>
              <Typography color={'black'} variant={'h3'} fontWeight={700} p={0} >Welcome to Zero-Knowledge & Gasless Voting framework </Typography>
            </Grid>
            <Grid item container justifyContent={'center'} alignItems={'center'} pt={8} >
              <Grid item><Button color="success" startIcon={<HowToVoteIcon style={{fontSize: '40px'}} />} sx={{ width: '310px', height: '80px', fontWeight: 600, fontSize: '18px'}} variant="contained" onClick={()=> setChoose(0)}>Initiate a voting</Button></Grid>
            </Grid>
            <Grid item container justifyContent={'center'} alignItems={'center'} pt={2}>
              <Grid item><Button startIcon={<ThumbsUpDownIcon style={{fontSize: '40px'}} />} sx={{ width: '310px', height: '80px', fontWeight: 600, fontSize: '18px'}} variant="contained" onClick={()=> setChoose(1)}>Go vote</Button></Grid>
            </Grid>
            <Grid item container justifyContent={'center'} alignItems={'center'} pt={2} >
              <Grid item><Button color="warning" startIcon={<BallotIcon style={{fontSize: '40px'}} />} sx={{ width: '310px', height: '80px', fontWeight: 600, fontSize: '18px'}} variant="contained" onClick={()=> setChoose(2)}>generate votingID</Button></Grid>
            </Grid>
          </>
        }
        {choose === 0 &&
          <InitiateVoting back={setChoose}/>
        }
        {choose === 1 &&
          <Voter back={setChoose}/>
        }
        {choose === 2 &&
          <GenerateVotingKey back={setChoose} />
        }
      </Grid>
    </>
  );
}

export default Voting;
