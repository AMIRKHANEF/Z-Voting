import { Button, Grid } from "@mui/material";
import React, { useCallback } from 'react';

export function Vote({option, confirmVote, vote, readOnly}){
    const handleVote = useCallback(()=>{
        confirmVote(option);
    },[confirmVote, option]);

    return(
        <Grid item>
            <Button variant={vote === option ? 'contained' : "outlined"} sx={{ padding: '10px', margin:2}} onClick={handleVote} disabled={readOnly}>{option}</Button>
        </Grid>
    );
};