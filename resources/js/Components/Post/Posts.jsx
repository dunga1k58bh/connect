import { EmojiEmotions, InsertPhoto, VideoCameraFront } from '@mui/icons-material';
import { Avatar, Button, Grid } from '@mui/material';
import React from 'react';
import PostFormCreate from '../Form/Post/Create';
import BoardPost from './BoardPost';

export default function Posts(props) {

    const [open, setOpen] = React.useState(false);
    const openCreatePost = () => {
        setOpen(true);
    }

    const {user, posts, canPost} = props;
    console.log(props);
    const closeCreatePost = () => {
        setOpen(false);
    }

    return (
        <div className='w-[500px]'>
            {canPost && <div className='add-post bg-white rounded-lg mt-[10px] divide-y divide-slate-200 px-[16px]'>
                <div className='flex  '>
                    <div className='py-[16px]'>
                        <Avatar sx={{ width: 40, height: 40 }} src={props.user.avatar} />
                    </div>
                    <div className='ml-[10px] p-[16px] pl-0 w-full'>
                        <div className='py-[8px] pl-[10px] bg-[#f1f5f9] rounded-[30px] cursor-pointer text-[#ccc]'
                            onClick={openCreatePost}
                        >
                            What's on your mind, {props.user.first_name}
                        </div>
                        {<PostFormCreate user={props.user} open={open} onClose={closeCreatePost} ></PostFormCreate>}
                    </div>
                </div>
                <div className='cta flex py-[10px]'>
                    <Button startIcon={<VideoCameraFront></VideoCameraFront>}>Live Video</Button>
                    <Button startIcon={<InsertPhoto></InsertPhoto>}>Photo/video</Button>
                    <Button startIcon={<EmojiEmotions></EmojiEmotions>}>Felling/activity</Button>
                </div>
            </div>}

            <div className='board-posts'>
                <BoardPost posts={posts} user={props.user}></BoardPost>
            </div>
        </div>
    );
}
