import { EmojiEmotions, InsertPhoto, VideoCameraFront } from '@mui/icons-material';
import { Avatar, Button, Grid, useScrollTrigger } from '@mui/material';
import React from 'react';
import UserAvatar from '../User/UserAvatar';

export default function Post(props) {

    const post = props.post;
    const openCreatePost = () => {
        console.log("some things");
    }

    const user = props.user;

    return (
        <div className='post mt-[16px] w-full bg-white rounded-lg'> 
            <div className='header p-[16px] flex'>
                <Avatar src={user.avatar} sx={{width: 40, height: 40}}></Avatar>
                <div className='info'>
                    <div className='name font-semibold ml-[8px]'>
                        <span><a href={`/profile/${user.id}`}>{user.first_name + " " + user.last_name}</a></span>
                    </div>
                </div>
            </div>
            <div className='content px-[16px]'></div>
            <div className='media'></div>
        </div>
    );
}
