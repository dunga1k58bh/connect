import { Avatar } from "@mui/material";
import { useState } from "react";

export default function RequestFriendsContent(props) {
    const user = props.auth.user;
    const list_request_friend = props.request_friends;
    const initialState = [];

    const removeIndex = (id) => {
        setRequest_friend((current) =>
            current.filter((request_friend) => request_friend.id !== id)
        );
    };

    const [request_friends, setRequest_friend] = useState(initialState);

    function handleAccept_request(sent_id) {
        removeIndex(sent_id);
        let url =
            "http://127.0.0.1:8000/api/friends/accept_request/" +
            user.id +
            "/" +
            sent_id;
        fetch(url, {
            method: "POST",
            mode: "cors",
        });
    }function handleDelete_request(sent_id) {
        removeIndex(sent_id);
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
            {list_request_friend.map((request_friend, index) => {
                initialState.push({
                    Avt: request_friend.Avt,
                    name: request_friend.name,
                    id: request_friend.id,
                });
            })}
            {request_friends.map((request_friend, index) => (
                <a className="mx-[10px] min-w-[200px] max-w-[250px] text-center border-solid border-2 border-sky-500 p-[20px] rounded-[20px]">
                    <div className="flex justify-center mb-[10px]">
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={request_friend.Avt}
                        />
                    </div>
                    <span className="">{request_friend.name}</span>
                    <div className="flex justify-center mb-[10px]">
                        <button
                            className="bg-blue-500 font-semibold text-white py-2 px-4 border border-transparent rounded"
                            onClick={() => handleAccept_request(request_friend.id)}
                        >
                            Confirm
                        </button>
                    </div>
                    <div className="flex justify-center mb-[10px]">
                        <button
                            className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded"
                            onClick={() => handleDelete_request(request_friend.id)}
                        >
                            Delete
                        </button>
                    </div>
                </a>
            ))}
        </div>
    );
}
