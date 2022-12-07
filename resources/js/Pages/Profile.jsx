import UserAvatar from '@/Components/User/UserAvatar';
import CoverImage from '@/Components/User/CoverImage';
import Home from '@/Layouts/HomeLayout';
import React from 'react';


export default function Profile(props) {

    const user = props.user;

    return (
        <Home>
            <div className='page-main h-full'>
                <div className='page-header'>
                    <CoverImage user={user}></CoverImage>
                    <UserAvatar user={user}></UserAvatar>
                </div>
                <div className='page-section'></div>
            </div>
        </Home>
    );
}
