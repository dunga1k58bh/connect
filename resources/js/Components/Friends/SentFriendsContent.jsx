import { Avatar } from "@mui/material";
import { useState } from 'react';

export default function SentFriendsContent(props) {
    const user = props.auth.user;
    const list_sent_friend = props.sent_friends;

    const initialState = [
      ];

      const removeIndex = (id) => {
        setSent_friends((current) =>
          current.filter((sent_friend) => sent_friend.id !== id)
        );
      };
    
      const [sent_friends, setSent_friends] = useState(initialState);
    

    function handleClick(sent_id) {
        removeIndex(sent_id)
        let url =
            "http://127.0.0.1:8000/api/friends/delete_request/" +
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
            {
            list_sent_friend.map((sent_friend, index) => {
                initialState.push({
                    Avt: sent_friend.Avt,
                    name: sent_friend.name,
                    id: sent_friend.id
                })
            })
        }
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
                </a>
            ))}
        </div>
    );
}
