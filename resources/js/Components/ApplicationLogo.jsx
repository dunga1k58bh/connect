import React from 'react';

export default function ApplicationLogo({ className }) {

    return (
        <img src={window.location.origin + "/images/connect_logo.png"} className={className}></img>
    );
}
