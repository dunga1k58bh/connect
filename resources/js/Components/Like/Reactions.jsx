export default function Reactions(props){

    const reactions = props.reactions;
    return (
        <div className="reactions flex absolute bottom-[35px] left-0 bg-white rounded-full p-[6px]">
            {reactions.map((reaction, index) => {
                if (reaction.value == "nolike") return;
                if (!reaction.img) return;
                return (
                <div key={reaction.value} className="w-[40px] h-[40px] mr-[5px] cursor-pointer hover:scale-150 duration-200"
                    onClick={e => props.callback(reaction.value)}
                >
                    <img src={reaction.img} />
                </div>)
            })}
        </div>
    )
}
