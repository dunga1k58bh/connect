import { Camera } from "@mui/icons-material";
import { Button, ListItem, MenuItem } from "@mui/material";
import React from "react";
import BasicMenu from "../UI/BasicMenu";


export default function CoverImage(src) {

    const default_src = 'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/52602830_395079624650323_3198448491630166016_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=I9rfvmzieMQAX_SAt85&_nc_ht=scontent.fhan14-2.fna&oh=00_AfACmEZGZMElxANAxnVorb8aRgZzKaQSCEktn9ht9rz0Bg&oe=63AB3F25'

    return (
        <div className="cover">
            <div className="cover-photo w-[940px] m-auto relative">
                <div className="rounded-xl">
                    <img src={default_src} className="object-cover w-[940px] h-[350px] rounded-xl" />
                </div>
                <div className="absolute bottom-0 h-[68px] w-full">
                    <div className="flex justify-end pr-[30px]">
                    <Button
                        variant="contained"
                        component="label"
                        color="success"
                        >
                        Edit cover photo
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
