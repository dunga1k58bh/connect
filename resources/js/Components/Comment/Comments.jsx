import { Send } from '@mui/icons-material';
import { Avatar, Input } from '@mui/material';
import React from 'react';
import CommentFormCreate from '../Form/Comment/Create';
import Comment from './Comment';

export default function Comments(props) {

    const comments = props.comments;
    const user = props.user;
    const post = props.post;

    return (
        <div className="pb-[16px]">

            <CommentFormCreate post={post} user={user}></CommentFormCreate>
            <div className='comments'>
            {comments.map((comment, index) => {

                return (
                    <Comment comment={comment}></Comment>
                )
            })}
            </div>
        </div>
    );
}
