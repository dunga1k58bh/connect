import { useForm } from "@inertiajs/inertia-react";
import { ChatBubbleOutline, Comment, Share, ThumbUpAltOutlined } from "@mui/icons-material";
import { Button, Divider, Tooltip } from "@mui/material";
import { useState } from "react";
import Like from "../Like/Like";
import Reactions from "../Like/Reactions";


export default function PostFooter(props) {

    const o_post = props.post;
    const user = props.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        type: "",
        user_id: user.id
    });

    const reactions = [
        {name: "Like", value:"nolike", color: "#65676B"},
        {name: "Like", value:"like" ,img: "/images/reaction/like.png", color: "#2078f4"},
        {name: "Love", value:"love" ,img: "/images/reaction/love.png", color: "#f33e58"},
        {name: "Care", value:"care" ,img: "/images/reaction/care.png", color: "#f7b125"},
        {name: "Haha", value:"haha" ,img: "/images/reaction/haha.png", color: "#f7b125"},
        {name: "Wow", value:"wow" ,img: "/images/reaction/wow.png", color: "#f7b125"},
        {name: "Sad", value:"sad" ,img: "/images/reaction/sad.png", color: "#f7b125"},
        {name: "Angry", value:"angry" ,img: "/images/reaction/angry.png", color: "#e9710f"}
    ];


    var reaction = reactions[0];
    if (o_post.my_reaction){
        reaction = reactions.find((e) => {
            return e.value == o_post.my_reaction.type;
        });
    }

    const likePost = (type) => {
        data.type=type;
        post(route('like.post', {id: o_post.id}), {onSuccess: (res) => {
        }});
    }

    const toggleEmoji = () => {
        post(route('toggle.like.post', {id: o_post.id}), {onSuccess: (res) => {
        }});
    }



    return (

        <div>
            <div className="info">
                <div className="reaction">
                    <div></div>
                </div>
                <div className="share-comment"></div>
            </div>
            <div className="px-[16px] pt-[6px]">
                <Divider></Divider>
                <div className="action flex py-[3px]">

                    <Like
                        obj={o_post}
                        like={likePost}
                        toggle={toggleEmoji}
                        className={"flex-1"}
                    >
                        <div className="like cursor-pointer flex  items-center justify-center mr-[10px] hover:bg-slate-100">
                            <div className="icon px-[4px] py-[6px]">
                                {reaction.img ?<img src={reaction.img} width='20' height='20'></img> : <ThumbUpAltOutlined style={{color: "#65676B"}}></ThumbUpAltOutlined>}
                            </div>
                            <div className="label px-[4px] py-[6px] font-semibold" style={{color: reaction.color}}>
                                {reaction.name}
                            </div>
                        </div>
                    </Like>

                    <div className="comment cursor-pointer flex flex-1 relative items-center justify-center mr-[10px] hover:bg-slate-100"
                    onClick={props.loadComment}
                    >
                        <div className="icon px-[4px] py-[6px]">
                            <ChatBubbleOutline style={{color: "#65676B"}}></ChatBubbleOutline>
                        </div>
                        <div className="label px-[4px] py-[6px] font-semibold" style={{color: "#65676B"}}>
                            Comment
                        </div>
                    </div>
                    <div className="share cursor-pointer flex flex-1 relative items-center justify-center mr-[10px] hover:bg-slate-100">
                        <div className="icon px-[4px] py-[6px]">
                            <Share style={{color: "#65676B"}} ></Share>
                        </div>
                        <div className="label px-[4px] py-[6px] font-semibold" style={{color: "#65676B"}}>
                            Share
                        </div>
                    </div>
                </div>
                <Divider></Divider>
            </div>
        </div>
    )
}
