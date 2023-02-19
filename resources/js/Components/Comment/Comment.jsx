import { Avatar } from "@mui/material";
import { useForm } from '@inertiajs/inertia-react';
import { createReactEditorJS } from 'react-editor-js';

export default function Comment(props){

    const comment = props.comment;

    const {data, get} = useForm({});
    const ReactEditorJS = createReactEditorJS();

    const goToProfile = (user) => {
        get(route("get.profile", {id: user.id}));
    }

    return (
        <div key={comment.id.toString()} className='comment pl-[16px] pt-[4px] flex'>
            <div className="avatar mt-[2px] mr-[6px]">
                <Avatar src={comment.user.avatar} style={{width:32, height:32}}></Avatar>
            </div>
            <div className='comment-wrap pr-[16px]'>
                <div className="comment px-[12px] py-[8px] max-w-[95%] rounded-3xl bg-slate-100">
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
            </div>
        </div>
    );
}
