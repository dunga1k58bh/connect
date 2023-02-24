import { Avatar } from "@mui/material";
import { useState } from "react";

export default function UnknownPeopleContent(props) {
    const user = props.auth.user;
    const list_unknown_people = props.unknown_people;
    const initialState = [];

    const removeIndex = (id) => {
        setUnknown_people((current) =>
            current.filter((unknown_people) => unknown_people.id !== id)
        );
    };

    const [unknown_peoples, setUnknown_people] = useState(initialState);

    function handleClick(sent_id) {
        removeIndex(sent_id);
        let url =
            props.ziggy.url +
            "/api/friends/send_request/" +
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
            {list_unknown_people.map((unknown_people, index) => {
                initialState.push({
                    Avt: unknown_people.Avt,
                    name: unknown_people.name,
                    id: unknown_people.id,
                });
            })}
            {unknown_peoples.map((unknown_people, index) => (
                <a className="mx-[10px] min-w-[200px] max-w-[250px] text-center border-solid border-2 border-sky-500 p-[20px] rounded-[20px]">
                    <div className="flex justify-center mb-[10px]">
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={unknown_people.Avt}
                        />
                    </div>
                    <span className="">{unknown_people.name}</span>
                    <div className="flex justify-center mb-[10px]">
                        <button
                            className="bg-blue-500 font-semibold text-white py-2 px-4 border border-transparent rounded"
                            onClick={() => handleClick(unknown_people.id)}
                        >
                            Add friend
                        </button>
                    </div>
                </a>
            ))}
        </div>
    );
}
