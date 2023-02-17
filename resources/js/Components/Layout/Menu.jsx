import * as React from 'react';
import BasicMenu from '../UI/BasicMenu';
import MenuIcon  from '@mui/icons-material/Menu';
import { Box, Grid } from '@mui/material';
import SearchBox from '../UI/SearchBox';


export default function Menu() {

    return (
        <BasicMenu
            tooltip="Menu"
            icon={<MenuIcon></MenuIcon>}
        >
            <Box sx={{width: 600 , height: 550, p: "0 16px 16px 16px"}}>
                <h2>Menu</h2>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <div className='box-search p-[16px] bg-white rounded-md'>
                            <SearchBox placeholder="Search menu"></SearchBox>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className='box-create p-[16px] bg-white rounded-md'>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </BasicMenu>
    );
}
