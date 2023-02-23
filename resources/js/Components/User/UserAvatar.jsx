import { useForm } from "@inertiajs/inertia-react";
import { Button, ListItem, MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";
import BasicMenu from "../UI/BasicMenu";
import { Avatar } from "@mui/material"


export default function UserAvatar(props) {

    const user = props.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const [src, setSrc] = useState(user.avatar);

    const handleFileChange = (e) =>{

        setData("file", e.target.files[0]);
        post(route(`edit.avatar`, {'id': user.id}) , {onSuccess: () => {
            
        }});
    };

    const inputFile = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted file input element
       console.log("aaaaaa");
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
                    <img src={user.avatar} className="w-[168px] h-[168px] rounded-full object-cover" />
                </Button>
            </div>
        </div>
    );
}
