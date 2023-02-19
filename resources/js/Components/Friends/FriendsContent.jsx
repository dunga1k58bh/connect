import { Avatar } from "@mui/material";
import { useState } from "react";

export default function FriendsContent(props) {
    const user = props.auth.user;
    const list_friend = props.friends;

    const initialState = [];

    const removeIndex = (id) => {
        setFriend((current) => current.filter((friend) => friend.id !== id));
    };

    const [friends, setFriend] = useState(initialState);

    function handleDelete_friend(sent_id) {
        removeIndex(sent_id);
        let url =
            "http://127.0.0.1:8000/api/friends/delete_friend/" +
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
            {list_friend.map((friend, index) => {
                initialState.push({
                    Avt: friend.Avt,
                    name: friend.name,
                    id: friend.id,
                });
            })}
            {friends.map((friend, index) => (
                <a className="mx-[10px] min-w-[200px] max-w-[250px] text-center border-solid border-2 border-sky-500 p-[20px] rounded-[20px]">
                    <div className="flex justify-center mb-[10px]">
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={friend.Avt}
                        />
                    </div>
                    <span className="">{friend.name}</span>
                    
                    <div className="flex justify-center mb-[10px]">
                        <button
                            className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded"
                            onClick={() => handleDelete_friend(friend.id)}
                        >
                            Unfriend
                        </button>
                    </div>
                </a>
            ))}
        </div>
    );
}
