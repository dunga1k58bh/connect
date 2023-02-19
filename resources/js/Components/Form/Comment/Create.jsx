import { useForm } from '@inertiajs/inertia-react';
import { Send } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import { createReactEditorJS } from 'react-editor-js';

export default function CommentFormCreate(props) {

    const user = props.user;
    const o_post = props.post || {};
    const comment = props.comment || {};

    const ReactEditorJS = createReactEditorJS();

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        post_id: o_post.id || 0,
        comment_id: comment.id || 0,
        content: {},
    });

    const editorCore = React.useRef(null)

    const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    const submit = React.useCallback(async () => {
        data.content = await editorCore.current.save();
        post(route('comment'), {onSuccess: (res) => {

        }});
    }, []);

    return (
        <div className='your-comment px-[16px] pt-[4px] my-[4px] flex'>
                <div className="avatar mt-[2px] mr-[6px]">
                    <Avatar src={user.avatar} style={{width:32, height:32}}></Avatar>
                </div>
                <div className="comment-editor pr-[16px] w-full flex-1">
                    <div className="comment px-[12px] py-[8px] w-full rounded-3xl bg-slate-100">
                        <ReactEditorJS
                            onInitialize={handleInitialize}
                            minHeight={0}
                        />
                        <div className='comment-action flex justify-between'>
                            <div className='options flex'></div>
                            <div className='button'
                                onClick={submit}
                            >
                                <Send style={{fontSize: 20, color: 'gray'}}></Send>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    );
}
