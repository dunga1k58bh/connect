import React from 'react';

export default function ApplicationLogo({label,  className }) {

    var src = "/images/connect_logo.png";
    if (label == false) {
        src = "/images/connect_logo_1.png";
    }

    return (
        <img src={src} className={className}></img>
    );
}
