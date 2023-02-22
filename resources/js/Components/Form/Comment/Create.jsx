import Button from '@/Components/UI/Button';
import { useForm } from '@inertiajs/inertia-react';
import { Face, Gif, GifBox, PhotoCameraBack, Send, SentimentSatisfied, WebAsset } from '@mui/icons-material';
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
            props.callback();
            editorCore.current.reset();
        }});
    }, []);

    return (
        <div className='your-comment px-[16px] pt-[4px] my-[4px] flex'>
                <div className="avatar mt-[2px] mr-[6px]">
                    <Avatar src={user.avatar} style={{width:32, height:32}}></Avatar>
                </div>
                <div className="comment-editor pr-[16px] w-full flex-1">
                    <div className="comment w-full rounded-3xl bg-slate-100">
                        <div className='px-[12px] pt-[8px]'>
                            <ReactEditorJS
                                onInitialize={handleInitialize}
                                minHeight={0}
                                sx={{
                                    '.codex-editor' :{
                                        paddingLeft: 20
                                    }
                                }}
                            />
                        </div>
                        <div className='comment-action flex justify-between pb-[6px]'>
                            <div className='options flex p-[6px] '>
                                <Button
                                    tooltip={"Comment with an avatar sticker"} icon={<Face/>} size={16}
                                ></Button>
                                <Button
                                    tooltip={"Insert an emoji"} icon={<SentimentSatisfied/>} size={16}
                                ></Button>
                                <Button
                                    tooltip={"Attach a photo or video"} icon={<PhotoCameraBack/>} size={16}
                                ></Button>
                                <Button
                                    tooltip={"Comment with a gif"} icon={<GifBox/>} size={16}
                                ></Button>
                                <Button
                                    tooltip={"Comment with a sticker"} icon={<WebAsset/>} size={16}
                                ></Button>
                            </div>
                            <div className='p-[6px]'>
                                <Button
                                    size={16}
                                    icon={<Send/>}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: '#ccc',
                                            color: 'blue'
                                            },

                                        '.MuiSvgIcon-root': {
                                            width: 16,
                                            height: 16
                                        }
                                    }}
                                    onClick={submit}
                                ></Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    );
}
