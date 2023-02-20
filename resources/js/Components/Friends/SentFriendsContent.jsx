import { Avatar } from "@mui/material";
import { useState } from "react";

export default function SentFriendsContent(props) {
    const user = props.auth.user;
    const list_sent_friend = props.sent_friends;

    const initialState = [];

    const removeIndex = (id) => {
        setSent_friends((current) =>
            current.filter((sent_friend) => sent_friend.id !== id)
        );
    };

    const [sent_friends, setSent_friends] = useState(initialState);

    function handleClick(sent_id) {
        removeIndex(sent_id);
        let url =
            props.ziggy.url +
            "/api/friends/delete_friend/" +
            user.id +
            "/" +
            sent_id;
        fetch(url, {
            method: "POST",
            mode: "cors",
        });
    }

    return (
        <div className="py-[10px] flex">
            {list_sent_friend.map((sent_friend, index) => {
                var today = new Date();
                var time = new Date(sent_friend.created_at);
                var time_diff = today - time;
                var ago;
                if (Math.round(time_diff / 1000 / 60 / 60 / 24 / 365) >= 1) {
                    ago =
                        Math.round(time_diff / 1000 / 60 / 60 / 24 / 365) +
                        " year";
                } else if (Math.round(time_diff / 1000 / 60 / 60 / 24) >= 1) {
                    ago = Math.round(time_diff / 1000 / 60 / 60 / 24) + " day";
                } else if (Math.round(time_diff / 1000 / 60 / 60) >= 1) {
                    ago = Math.round(time_diff / 1000 / 60 / 60) + " hour";
                } else if (Math.round(time_diff / 1000 / 60) >= 1) {
                    ago = Math.round(time_diff / 1000 / 60) + " minute";
                } else if (Math.round(time_diff / 1000) >= 1) {
                    ago = Math.round(time_diff / 1000) + " second";
                }
                initialState.push({
                    Avt: sent_friend.Avt,
                    name: sent_friend.name,
                    id: sent_friend.id,
                    ago: ago,
                });
            })}
            {sent_friends.map((sent_friends, index) => (
                <a className="mx-[10px] min-w-[200px] max-w-[250px] text-center border-solid border-2 border-sky-500 p-[20px] rounded-[20px]">
                    <div className="flex justify-center mb-[10px]">
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={sent_friends.Avt}
                        />
                    </div>
                    <span className="">{sent_friends.name}</span>
                    <div className="flex justify-center mb-[10px]">
                        <button
                            className="bg-blue-500 font-semibold text-white py-2 px-4 border border-transparent rounded"
                            onClick={() => handleClick(sent_friends.id)}
                        >
                            Cancel
                        </button>
                    </div>

                    <span className="">Since: {sent_friends.ago}</span>
                </a>
            ))}
        </div>
    );
}
