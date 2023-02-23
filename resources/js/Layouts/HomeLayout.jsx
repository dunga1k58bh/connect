import ApplicationLogo from '@/Components/ApplicationLogo';
import { Box, Button, Grid, Tab, Tabs, Tooltip } from '@mui/material';
import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Groups2Outlined, MusicVideoOutlined, SportsEsportsOutlined, StorefrontOutlined, SubscriptOutlined } from '@mui/icons-material';
import Menu from '@/Components/Layout/Menu';
import Message from '@/Components/Layout/Message';
import Notification from '@/Components/Layout/Notification';
import Account from '@/Components/Layout/Account';
import SearchBox from '@/Components/UI/SearchBox';

export default function Home({ children }) {


    return (
        <div className='home-layout min-h-screen '>
                <div className='navigation h-[58px] absoltue top-0 bg-white shadow-2xl'>
                    <Grid container>
                        <Grid item xs={2}>
                            <div className="flex sticky">
                                <Button sx={{padding: 0}} href='/'>
                                    <ApplicationLogo label={false} className="pl-[16px] h-[56px]"></ApplicationLogo>
                                </Button>
                                <div className="pt-[5px] pb-[5px]">
                                    <SearchBox></SearchBox>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={8} >
                            <Tabs
                                aria-label="icon tabs"
                                value={0}
                                sx={{'& .MuiTabs-flexContainer': {
                                    justifyContent: 'center',
                                    height: '56px',
                                },
                            }}
                            >
                                <Tooltip title="Home">
                                    <Tab className="tab" icon={<HomeOutlinedIcon />} aria-label="home" />
                                </Tooltip>
                                <Tooltip title="Watch">
                                    <Tab className="tab" icon={<MusicVideoOutlined />} aria-label="favorite" />
                                </Tooltip>
                                <Tooltip title="Marketplace">
                                    <Tab className="tab" icon={<StorefrontOutlined />} aria-label="person" />
                                </Tooltip>
                                <Tooltip title="Groups">
                                    <Tab className="tab" icon={<Groups2Outlined />} aria-label="person" />
                                </Tooltip>
                                <Tooltip title="Gaming">
                                    <Tab className="tab" icon={<SportsEsportsOutlined />} aria-label="person" />
                                </Tooltip>
                            </Tabs>
                        </Grid>
                        <Grid item xs={2}>
                            <div className='flex'>
                                <Menu ></Menu>
                                <Message></Message>
                                <Notification></Notification>
                                <Account></Account>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            <div className='h-[calc(100vh-56px)] bg-slate-100 overflow-y-scroll'>
                {children}
            </div>
        </div>
    );
}
