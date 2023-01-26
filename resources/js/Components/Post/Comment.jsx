import { useForm } from '@inertiajs/inertia-react';
import { Avatar, Input } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { redirect } from 'react-router-dom';

export default function Comment(props) {

    const comments = props.comments;

    const {data, get} = useForm({});

    const goToProfile = (user) => {
        get(route("get.profile", {id: user.id}));
    }

    return (
        <div>
            <div className='your-comment'>
                
            </div>
            <div className='comments'>
            {comments.map((comment, index) => {

                const user = comment.user;

                return (
                    <div key={comment.id.toString()} className='comment pl-[16px] pt-[4px] flex'>
                        <div className="avatar mt-[2px] mr-[6px]">
                            <Avatar src={comment.user.avatar} style={{width:32, height:32}}></Avatar>
                        </div>
                        <div className='comment-wrap pr-[16px]'>
                            <div className="comment px-[12px] py-[8px] max-w-[95%] rounded-3xl bg-slate-100">
                                <div className='user-name font-bold hover:underline cursor-pointer'
                                    onClick={e => goToProfile(user)}
                                >
                                    {comment.user.full_name}
                                </div>
                                <div className='content break-words'>
                                    {comment.content}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    );
}
