import * as React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Paper, IconButton } from '@mui/material';
import Search from '@mui/icons-material/Search';


export default function SearchBox(props) {

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: "rgb(241,245,249)",
                borderRadius: 30, width: "100%",
            }}
        >
            <IconButton>
                <Search></Search>
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                size="medium"
            />
        </Paper>
    )
}
