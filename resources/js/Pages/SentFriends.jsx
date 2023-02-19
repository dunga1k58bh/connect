import React from "react";
import {
    GroupRounded,
    GroupsRounded,
    MovieRounded,
    RestoreRounded,
    StorefrontRounded,
} from "@mui/icons-material";
import {
    Avatar,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import HomeLayout from "@/Layouts/HomeLayout";

import SentFriendsHeader from "../Components/Friends/SentFriendsHeader";
import SentFriendsContent from "../Components/Friends/SentFriendsContent";


export default function SentFriends(props) {
    const user = props.auth.user;
    return (
        <HomeLayout>
            <div className="page-main flex">
                <div className="page-menu w-[300px] p-[8px] h-[calc(100vh-56px)] overflow-y-auto sticky top-0">
                    <List
                        dense={false}
                        component="nav"
                        sx={{ "& .MuiTypography-root": {} }}
                    >
                        <ListItemButton href={`../../profile/${user.id}`}>
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <Avatar
                                    sx={{ width: 24, height: 24 }}
                                    src={user.avatar}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.full_name}
                            ></ListItemText>
                        </ListItemButton>

                        <ListItemButton
                            href={`../../friends/${user.id}`}
                            sx={{
                                border: 1,
                                borderColor: "#0ea517",
                                borderRadius: 2,
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <GroupRounded color="primary"></GroupRounded>
                            </ListItemIcon>
                            <ListItemText primary="Friends"></ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <GroupsRounded color="primary"></GroupsRounded>
                            </ListItemIcon>
                            <ListItemText primary="Groups"></ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <StorefrontRounded color="primary"></StorefrontRounded>
                            </ListItemIcon>
                            <ListItemText primary="Marketplace"></ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <MovieRounded color="primary"></MovieRounded>
                            </ListItemIcon>
                            <ListItemText primary="Watch"></ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <RestoreRounded color="primary"></RestoreRounded>
                            </ListItemIcon>
                            <ListItemText primary="Memories"></ListItemText>
                        </ListItemButton>
                    </List>

                    <Divider></Divider>
                </div>
                <div className="page flex-auto w-full border-solid border-2 border-sky-500 p-[20px]">
                    <SentFriendsHeader {...props}/>
                    <SentFriendsContent {...props}/>
                </div>
            </div>
        </HomeLayout>
    );
}
