import { useState } from "react";
import Reactions from "./Reactions";

export default function Like(props){

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

    const reaction = props.reaction || reactions[0];

    const [emoji, showEmoji] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const showReactions = () => {
        const id = setTimeout(() => {
            showEmoji(true);
          }, 1000);

          setTimeoutId(id);
    }

    const hideReactions = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        showEmoji(false);
    }

    return (
        <div className={"like " + props.className}>
            <div className="relative flex-1"
                onMouseLeave={hideReactions}
                onMouseEnter={showReactions}
            >
                <div className=""
                    onClick={props.toggle}
                >
                    {props.children}
                </div>
                {emoji &&
                    <div className="">
                        <Reactions reactions={reactions} callback={props.like}></Reactions>
                    </div>
                }
            </div>
        </div>
    )
}
