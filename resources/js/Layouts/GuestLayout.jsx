import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen items-stretch flex px-[10%] pt-[112px] pb-[72px] bg-gray-100">
            <div className="w-2/3 pr-20">
                <ApplicationLogo className="h-[106px]">

                </ApplicationLogo>
                <div className="title text-black text-[28px] pl-[15px]" >Connect helps you connect and share with the people in your life.</div>
            </div>

            <div className="flex-auto w-2/5 bg-white p-4 mb-24 rounded-[10px] shadow-2xl pr-8]">
                {children}
            </div>
        </div>
    );
}
