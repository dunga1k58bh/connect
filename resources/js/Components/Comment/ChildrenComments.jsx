import { Send } from '@mui/icons-material';
import { Avatar, Input } from '@mui/material';
import React, { useState } from 'react';
import CommentFormCreate from '../Form/Comment/Create';
import Comment from './Comment';

export default function ChildrenComments(props) {

    const comments = props.comments;
    const user = props.user;
    const post = props.post || {};
    const comment = props.comment || {};

    const show_form = props.show;

    return (
        <div className="">
            <div className='comments'>
            {comments.map((comment, index) => {

                return (
                    <Comment comment={comment} user={user}></Comment>
                )
            })}
            </div>
            {show_form && <CommentFormCreate post={post} user={user} comment={comment} callback={props.callback}></CommentFormCreate>}
        </div>
    );
}
