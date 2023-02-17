import { EmojiEmotions, InsertPhoto, VideoCameraFront } from '@mui/icons-material';
import { Avatar, Button, Grid, useScrollTrigger } from '@mui/material';
import React, { useEffect } from 'react';
import UserAvatar from '../User/UserAvatar';
import { createReactEditorJS } from 'react-editor-js';
import PostFooter from './PostFooter';
import { useState } from 'react';
import Comment from './Comment';
import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';

export default function Post(props) {

    const o_post = props.post;

    const ReactEditorJS = createReactEditorJS();
    const user = props.user;

    const [showComment, setShowComment] = useState(false);
    const { data, setData, post} = useForm({
        page: 0,
    });

    const [comments, setComments] = useState([]);

    const loadComment = () => {
        setShowComment(true);
        axios.post(route('get-post-comment', {id: o_post.id}), data).then(
            response => {
                var comments = response.data.comments.data;
                setComments(comments);
            }
        )


        // post(route('get-post-comment', {id: o_post.id}))
    }

    return (
        <div className='post mt-[16px] w-full bg-white rounded-lg'>
            <div className='header p-[16px] flex'>
                <Avatar src={user.avatar} sx={{width: 40, height: 40}}></Avatar>
                <div className='info ml-[8px]'>
                    <div className='name font-semibold'>
                        <span><a href={`/profile/${user.id}`}>{user.first_name + " " + user.last_name}</a></span>
                    </div>
                    <div className='time text-[12px]'>
                        {o_post.id || 0}
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
                    <img className='object-cover' src={"images/posts/" + o_post.content.images[0]}></img>
                </div>
            </div>
            <div className='post-footer'>
                <PostFooter post={o_post} user={user} loadComment={loadComment}></PostFooter>
            </div>
            <div className='post-comment'>
                {showComment &&
                    <Comment comments={comments}></Comment>
                }
            </div>
        </div>
    );
}
