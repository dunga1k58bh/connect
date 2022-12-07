import { useForm } from "@inertiajs/inertia-react";
import { Button, ListItem, MenuItem } from "@mui/material";
import React from "react";
import BasicMenu from "../UI/BasicMenu";
import { Avatar } from "@mui/material"


export default function UserAvatar(props) {

    const user = props.user;
    const handleFileChange = (e) =>{

        setData("file", e.target.files[0]);
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        user.cover_photo = objectUrl;
    }

    const submit = () => {
        post(route(`edit.coverphoto`, {'id': user.id}) , {onSuccess: () => {}});
    }

    return (
        <div className="avatar">
            {/* <BasicMenu render={(params) => <Avatar src={user.avatar} {...params} />}>

            </BasicMenu> */}
        </div>
    );
}
