import { useForm } from "@inertiajs/inertia-react";
import { Avatar } from "@mui/material";
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
export default function GroupsContent(props) {
    const user = props.auth.user;
    const list_group = props.groups;
    const initialState = [];

    const {data, get} = useForm({});

    const getUrl = (url, props) => {
        get(route(url, props))
    }

    const removeIndex = (id) => {
        setGroups((current) => current.filter((group) => group.id !== id));
    };

    const [groups, setGroups] = useState(initialState);

    function handleClick(group_id) {
        removeIndex(group_id);
        let url =
            props.ziggy.url +
            "/api/group/leave_group/" +
            user.id +
            "/" +
            group_id;
        fetch(url, {
            method: "POST",
            mode: "cors",
        });
    }

    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        setOpen(false);
        let url = props.ziggy.url + "/api/group/make_group/" + user.id;
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name_group: itemName,
            }),
        });
        groups.push({
            Avt: "",
            name: itemName,
            cover_img: ""
        });
    };

    return (
        <div className="py-[10px] flex">
            {list_group.map((group, index) => {
                initialState.push({
                    Avt: group.Avt,
                    name: group.name,
                    cover_img: group.cover_img,
                    id: group.id,
                });
            })}
            {groups.map((group, index) => (
                <a className="mx-[10px] min-w-[200px] max-w-[250px] text-center border-solid border-2 border-sky-500 p-[20px] rounded-[20px]">
                    <div className="flex justify-center mb-[10px]">
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={group.Avt}
                        />
                    </div>
                    <div className="cursor-pointer"
                        onClick={e => getUrl(`group`, {id: group.id})}
                    >{group.name}</div>
                    <div className="flex justify-center mb-[10px]">
                        <button
                            className="bg-blue-500 font-semibold text-white py-2 px-4 border border-transparent rounded"
                            onClick={() => handleClick(group.id)}
                        >
                            Leave group
                        </button>
                    </div>
                </a>
            ))}
        </div>
    );
}
