import UserAvatar from '@/Components/User/UserAvatar';
import CoverImage from '@/Components/User/CoverImage';
import Home from '@/Layouts/HomeLayout';
import React from 'react';
import { Tab, Tabs } from '@mui/material';
import MyTabs from '@/Components/UI/Tabs';
import MyTab from '@/Components/UI/Tab';
import BoardPost from '@/Components/Post/BoardPost';
import Posts from '@/Components/Post/Posts';


export default function Profile(props) {

    const {user, posts, canPost} = props;
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
                        <div>
                            <MyTabs>
                                <MyTab label='Posts' key={0}></MyTab>
                                <MyTab label='About' key={1}>sddsefsefes</MyTab>
                                <MyTab label='Friends' key={2}></MyTab>
                                <MyTab label='Photos' key={3}></MyTab>
                                <MyTab label='Videos' key={4}></MyTab>
                                <MyTab label='Check-ins' key={5}></MyTab>
                                <MyTab label='More' key={6}></MyTab>
                            </MyTabs>
                        </div>
                    </div>
                </div>
                <div className='page-section'>
                    <div className='flex w-[900px] m-auto'>
                        <div className='left-side w-[300px]'>dsdcsdcsdasd</div>
                        <div className='right-size flex-1'>
                            <Posts user={user} posts={posts} canPost={canPost}></Posts>
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    );
}
