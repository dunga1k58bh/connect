import GroupAvatar from '@/Components/Groups/GroupAvatar';
import CoverImage from '@/Components/Groups/CoverImage';
import Home from '@/Layouts/HomeLayout';
import React from 'react';
import MyTabs from '@/Components/UI/Tabs';
import MyTab from '@/Components/UI/Tab';
import Posts from '@/Components/Post/Posts';
import GroupProfileInfo from '@/Components/Profile/GroupProfileInfo';


export default function Group(props) {

    console.log(props);
    const {group, posts, canPost, auth} = props;
    const n_member = group.data.members || 0;

    return (
        <Home>
            <div className='page-main h-full'>
                <div className='page-header'>
                    <CoverImage group={group}></CoverImage>
                    <div className="group-info flex justify-items-center pb-[16px] bg-white">
                        <div className='w-[900px] m-auto '>
                            <div className='flex relative'>
                                 <div className='info pt-[16px]'>
                                    <div className='name font-bold text-[32px]'>
                                        {group.name}
                                    </div>

                                    <div className='name text-[17px] font-bold text-slate-400'>
                                        {n_member+ " Members"}
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='tabs flex bg-white'>
                    <div className='w-[900px] m-auto'>
                        <div>
                            <MyTabs value={1}>
                                <MyTab label='About' key={0}></MyTab>
                                <MyTab label='Discussion' key={1}>sddsefsefes</MyTab>
                                <MyTab label='Feature' key={2}></MyTab>
                                <MyTab label='Chats' key={3}></MyTab>
                                <MyTab label='Rooms' key={4}></MyTab>
                                <MyTab label='Topics' key={5}></MyTab>
                                <MyTab label='Members' key={6}></MyTab>
                                <MyTab label='Events' key={7}></MyTab>
                                <MyTab label='More' key={8}></MyTab>
                            </MyTabs>
                        </div>
                    </div>
                </div>
                <div className='page-section'>
                    <div className='flex w-[900px] m-auto'>
                        <div className='right-size flex-1'>
                            <Posts user={auth.user} posts={posts} canPost={canPost} group={group}></Posts>
                        </div>
                        <div className='left-side w-[380px]'>
                            <GroupProfileInfo group={group} title={"About"}></GroupProfileInfo>
                            <GroupProfileInfo group={group} title={"Popular topics in this group"}></GroupProfileInfo>
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    );
}
