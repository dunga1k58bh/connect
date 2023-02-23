import { useForm } from "@inertiajs/inertia-react";

export default function CommentLike(props){

    const comment = props.comment;
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
    if (comment.my_reaction){
        reaction = reactions.find((e) => {
            return e.value == comment.my_reaction.type;
        });
    }

    const likePost = (type) => {
        data.type=type;
        post(route('like.post', {id: comment.id}), {onSuccess: (res) => {
        }});
    }

    const toggleEmoji = () => {
        post(route('toggle.like.post', {id: comment.id}), {onSuccess: (res) => {
        }});
    }

    return (<div>
        
    </div>)
}
