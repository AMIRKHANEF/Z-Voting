import { Grid,Button, Typography , CircularProgress, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import {Voter} from './components/voterPage'
function Voting() {
  // const ContractAddress = '0xf866b27cad5ac564de864fe50281c4ddaad5eff5';
  const [choose, setChoose] = useState(null);
  return (
    <>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        {choose === null &&
          <>
            <Grid item xs={12} textAlign='center' sx={{py:5, fontWeight:700, fontSize:25}}>
              <Typography color={'black'} variant={'h3'} fontWeight={700} p={0} >Wellcome to Zero-Knowledge & Gasless Voting framework </Typography>
            </Grid>
            <Grid item container justifyContent={'center'} alignItems={'center'} pt={15} spacing={15}>
              <Grid item><Button sx={{ width: '200px', height: '120px', fontWeight: 600, fontSize: '18px'}} variant="contained" onClick={()=> setChoose(0)}>Initiat a voting</Button></Grid>
              <Grid item><Button sx={{ width: '200px', height: '120px', fontWeight: 600, fontSize: '18px'}} variant="contained" onClick={()=> setChoose(1)}>Go vote</Button></Grid>
            </Grid>
          </>
        }
        {choose === 0 &&
          'hello'
        }
        {choose === 1 &&
          <Voter back={setChoose}/>
        }
      </Grid>
    </>
  );
}

export default Voting;
