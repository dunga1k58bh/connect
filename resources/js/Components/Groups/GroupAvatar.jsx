import { useForm } from "@inertiajs/inertia-react";
import { Button, ListItem, MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";
import BasicMenu from "../UI/BasicMenu";
import { Avatar } from "@mui/material"


export default function GroupAvatar(props) {

    const group = props.group;

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const handleFileChange = (e) =>{

        setData("file", e.target.files[0]);
        post(route(`edit.avatar`, {'id': user.id}) , {onSuccess: () => {

        }});
    };

    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };

    return (
        <div className="avatar mr-[16px] relative w-[168px] h-[150px]">
            <div className='rounded-full p-[3px] bg-white absolute top-[-40px] w-[168px] h-[168px]'>
                <Button sx={{padding: 0}}
                    onClick={onButtonClick}
                >
                    <input
                        type="file"
                        hidden
                        ref={inputFile}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <img src={group.avatar} className="w-[168px] h-[168px] rounded-full object-cover" />
                </Button>
            </div>
        </div>
    );
}
