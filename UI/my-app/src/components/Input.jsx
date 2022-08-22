import { Grid,TextField, Button } from "@mui/material";
import React, { useCallback, useState } from 'react';

export function Input({_lable, btnText, btnOnClickFunction}){
    const [inputText, setInputText] = useState();

    const inputChangeHandler = useCallback((event)=>{
        const txt = event.target.value;
        txt && setInputText(txt)
        // !txt && setInputText()
    },[]);

    const buttonClickHandler = useCallback(()=>{
        inputText && btnOnClickFunction(inputText)
    },[btnOnClickFunction, inputText]);

    return(
        <Grid container justifyContent={'center'} alignItems={'center'}>
            <Grid item>
                <TextField id="outlined-basic" label={_lable} variant="outlined" sx={{width:'500px'}} onChange={inputChangeHandler}/>
            </Grid>
            <Grid item>
                <Button variant="contained" sx={{ padding: '10px', marginLeft:2}} onClick={buttonClickHandler}>{btnText}</Button>
            </Grid>
        </Grid>
    );
}