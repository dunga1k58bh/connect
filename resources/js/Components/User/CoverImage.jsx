import { useForm } from "@inertiajs/inertia-react";
import { Camera } from "@mui/icons-material";
import { Button, ListItem, MenuItem } from "@mui/material";
import React, { useRef } from "react";
import BasicMenu from "../UI/BasicMenu";


export default function CoverImage(props) {

    const user = props.user;

    const default_src = 'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/52602830_395079624650323_3198448491630166016_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=I9rfvmzieMQAX_SAt85&_nc_ht=scontent.fhan14-2.fna&oh=00_AfACmEZGZMElxANAxnVorb8aRgZzKaQSCEktn9ht9rz0Bg&oe=63AB3F25'
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });


    const handleFileChange = (e) =>{

        setData("file", e.target.files[0]);
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        user.cover_photo = objectUrl;
    }

    const submit = () => {
        post(route(`edit.coverphoto`, {'id': user.id}) , {onSuccess: () => {}});
    }

    return (
        <div className="cover">
            <div className="cover-photo w-[940px] m-auto relative">
                <div className="rounded-xl">
                    <img src={user.cover_photo} className="object-cover w-[940px] h-[350px] rounded-xl" />
                </div>
                <div className="absolute bottom-0 h-[68px] w-full">
                    <div className="flex justify-end pr-[30px]">
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        sx={{marginRight: 1}}
                        >
                        Upload
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </Button>
                    <Button  variant="contained" color="success" onClick={submit}>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
