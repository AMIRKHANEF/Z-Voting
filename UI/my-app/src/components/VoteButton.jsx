import { Button, Grid } from "@mui/material";
import React, { useCallback, useState } from 'react';

export function Vote({option, confirmVote, vote}){
    const handleVote = useCallback(()=>{
        confirmVote(option);

    },[confirmVote, option]);
    console.log('option:', option)
    console.log('vote:', vote)
    console.log('vote === option:', vote === option)
    return(
        <Grid item>
            <Button variant={vote === option ? 'contained' : "outlined"} sx={{ padding: '10px', margin:2}} onClick={handleVote}>{option}</Button>
        </Grid>
    );
};