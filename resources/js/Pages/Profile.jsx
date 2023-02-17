import UserAvatar from '@/Components/User/UserAvatar';
import CoverImage from '@/Components/User/CoverImage';
import Home from '@/Layouts/HomeLayout';
import React from 'react';
import { Tab, Tabs } from '@mui/material';
import MyTabs from '@/Components/UI/Tabs';
import MyTab from '@/Components/UI/Tab';


export default function Profile(props) {

    const user = props.user;
    var num_friend = 0
    if (user.data && user.data.num_friend) {
        num_friend = user.data.num_friend;
    }

    return (
        <Home>
            <div className='page-main h-full'>
                <div className='page-header'>
                    <CoverImage user={user}></CoverImage>
                    <div className="user-info flex justify-items-center pb-[16px] bg-white">
                        <div className='w-[900px] m-auto '>
                            <div className='flex relative'>
                                 <UserAvatar user={user}></UserAvatar>
                                 <div className='info pt-[16px]'>
                                    <div className='name font-bold text-[32px]'>
                                        {user.first_name + " " + user.last_name}
                                    </div>

                                    <div className='name text-[17px] font-bold text-slate-400'>
                                        {num_friend + " Friends"}
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='tabs flex bg-white'>
                    <div className='w-[900px] m-auto'>
                        <MyTabs>
                            <MyTab label='Posts' value={0}></MyTab>
                            <MyTab label='About' value={1}></MyTab>
                            <MyTab label='Friends' value={2}></MyTab>
                            <MyTab label='Photos' value={2}></MyTab>
                            <MyTab label='Videos' value={2}></MyTab>
                            <MyTab label='Check-ins' value={2}></MyTab>
                            <MyTab label='More' value={2}></MyTab>
                        </MyTabs>
                    </div>
                </div>
                <div className='page-section'></div>
            </div>
        </Home>
    );
}
