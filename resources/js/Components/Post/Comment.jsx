import { useForm } from '@inertiajs/inertia-react';
import { Send } from '@mui/icons-material';
import { Avatar, Input } from '@mui/material';
import React from 'react';
import { createReactEditorJS } from 'react-editor-js';

export default function Comment(props) {

    const comments = props.comments;
    const user = props.user;

    const {data, get} = useForm({});

    const ReactEditorJS = createReactEditorJS();

    const goToProfile = (user) => {
        get(route("get.profile", {id: user.id}));
    }

    return (
        <div className="pb-[16px]">
            <div className='your-comment px-[16px] pt-[4px] my-[4px] flex'>
                <div className="avatar mt-[2px] mr-[6px]">
                    <Avatar src={user.avatar} style={{width:32, height:32}}></Avatar>
                </div>
                <div className="comment-editor pr-[16px] w-full flex-1">
                    <div className="comment px-[12px] py-[8px] w-full rounded-3xl bg-slate-100">
                        <ReactEditorJS
                            minHeight={0}
                        />
                        <div className='comment-action flex justify-between'>
                            <div className='options flex'></div>
                            <div className='button'>
                                <Send style={{fontSize: 20, color: 'gray'}}></Send>
                            </div>
                        </div>
                    </div>

                </div>
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
