import CoverImage from '@/Components/User/CoverImage';
import Home from '@/Layouts/HomeLayout';
import React from 'react';


export default function Profile(props) {

    const user = props.user;

    return (
        <Home>
            <div className='page-main h-full'>
                <div className='page-header'>
                    <CoverImage></CoverImage>
                </div>
                <div className='page-section'></div>
            </div>
        </Home>
    );
}
