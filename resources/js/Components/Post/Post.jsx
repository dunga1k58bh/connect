import { EmojiEmotions, InsertPhoto, VideoCameraFront } from '@mui/icons-material';
import { Avatar, Button, Grid, useScrollTrigger } from '@mui/material';
import React, { useEffect } from 'react';
import UserAvatar from '../User/UserAvatar';
import { createReactEditorJS } from 'react-editor-js';
import PostFooter from './PostFooter';
import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import Comments from '../Comment/Comments';

export default function Post(props) {

    const o_post = props.post;
    const post_user = o_post.user;

    const ReactEditorJS = createReactEditorJS();
    const user = props.user;

    const [showComment, setShowComment] = useState(false);
    const { data, setData, post} = useForm({
        page: 0,
    });

    const [comments, setComments] = useState([]);

    const loadComment = () => {
        setShowComment(true);
        axios.post(route('get-post-comments', {id: o_post.id}), data).then(
            response => {
                var comments = response.data.comments.data;
                setComments(comments);
            }
        )
    }

    const formattedTimestamp = new Date(o_post.created_at).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });


    return (
        <div className='post mt-[16px] w-full bg-white rounded-lg'>
            <div className='header p-[16px] flex'>
                <Avatar src={post_user.avatar} sx={{width: 40, height: 40}}></Avatar>
                <div className='info ml-[8px]'>
                    <div className='name font-semibold'>
                        <span><a href={`/profile/${post_user.id}`}>{post_user.first_name + " " + post_user.last_name}</a></span>
                    </div>
                    <div className='time text-[12px]'>
                        {formattedTimestamp}
                    </div>
                </div>
            </div>
            <div className='post-content'>
                <div className='content px-[16px] mb-[10px]'>
                    <ReactEditorJS
                        minHeight={0}
                        defaultValue={o_post.content.content}
                        readOnly={true}

                    />
                </div>
                <div className='media'>
                    {o_post.content.images[0] && <img className='object-cover' src={"images/posts/" + o_post.content.images[0]}></img>}
                </div>
            </div>
            <div className='post-footer'>
                <PostFooter post={o_post} user={user} loadComment={loadComment}></PostFooter>
            </div>
            <div className='post-comment pb-[20px]'>
                {showComment &&
                    <Comments user={user} post={o_post} comments={comments} callback={loadComment} show={true}></Comments>
                }
            </div>
        </div>
    );
}
