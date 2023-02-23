import { useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import Like from "../Like/Like";

export default function CommentLike(props){

    const comment = props.comment;
    const user = props.user;
    const my_reaction = comment.my_reaction || {};

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

    const getReaction = (value) =>{
        return reactions.find((e) => {
            return e.value == value;
        });
    }

    const [reaction, setReaction] = useState(
        getReaction(my_reaction.type) || reactions[0]
    );

    const likeComment = (type) => {
        data.type=type;
        axios.post(route('like.comment', {id: comment.id}), data).then(
            response => {
                var like = response.data.like;
                setReaction(getReaction(like.type || "nolike"));
            }
        )
    }

    const toggleEmoji = () => {

        axios.post(route('toggle.like.comment', {id: comment.id}), data).then(
            response => {
                var like = response.data.like;
                setReaction(getReaction(like.type || "nolike"));
            }
        )
    }

    return (<div className="hover:underline cursor-pointer">
        <Like
            obj={comment}
            toggle={toggleEmoji}
            like={likeComment}
        >
            <div className="font-bold" style={{color: reaction.color}}>
                {reaction.name}
            </div>
        </Like>
    </div>)
}
