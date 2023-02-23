import { Avatar } from "@mui/material";
import { useForm } from '@inertiajs/inertia-react';
import { createReactEditorJS } from 'react-editor-js';
import { useState } from "react";
import ChildrenComments from "./ChildrenComments";

export default function Comment(props){

    const comment = props.comment;
    const [child_comments, setChildren] = useState([]);

    const user = props.user;

    const {data, get} = useForm({});
    const ReactEditorJS = createReactEditorJS();

    const goToProfile = (user) => {
        get(route("get.profile", {id: user.id}));
    }

    const [show_form, show] = useState(false);
    const replyComment = () => {
        if (show_form){
            show(false);
            return;
        }

        show(true);
    }

    const showResponse = () => {
        axios.post(route('get-response-comments', {id: comment.id}), data).then(
            response => {
                var comments = response.data.comments.data;
                setChildren(comments);
            }
        )
    }


    //For like and Comment


    return (
        <div className="comment-item relative">
            <div key={comment.id.toString()} className='comment pl-[16px] pt-[4px] flex'>
                <div className="avatar mt-[2px] mr-[6px]">
                    <Avatar src={comment.user.avatar} style={{width:32, height:32}}></Avatar>
                </div>
                <div className='comment-wrap pr-[16px] relative'>
                    <div className="comment px-[12px] py-[8px] flex-1 rounded-3xl bg-slate-100">
                        <div className='user-name font-bold hover:underline cursor-pointer'
                            onClick={e => goToProfile(comment.user)}
                        >
                            {comment.user.full_name}
                        </div>
                        <div className='content break-words'>
                            <ReactEditorJS
                                minHeight={0}
                                defaultValue={comment.content}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="actions pl-[8px] pt-[4px]">
                        <div className="flex text-[12px] font-semibold decoration-[#65676b]">

                            <div className="reply pl-[10px] cursor-pointer hover:underline"
                                onClick={replyComment}
                            >Reply</div>
                            <div className="reply pl-[10px] cursor-pointer hover:underline"
                                onClick={showResponse}
                            >Show responese</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="children ml-[40px]">
                <ChildrenComments comment={comment} comments={child_comments} user={user} show={show_form} callback={showResponse}></ChildrenComments>
            </div>
        </div>
    );
}
