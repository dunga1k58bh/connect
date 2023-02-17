import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BasicMenu from '../UI/BasicMenu';

export default function Account({ className }) {

    return (
        <BasicMenu
            tooltip="Account"
            icon={<AccountBoxIcon></AccountBoxIcon>}
        >
        </BasicMenu>
    );
}
