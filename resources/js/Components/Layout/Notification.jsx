import * as React from 'react';
import BasicMenu from '../UI/BasicMenu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


export default function Notification() {

    return (
        <BasicMenu
            tooltip="Notification"
            icon={<NotificationsActiveIcon></NotificationsActiveIcon>}
        >
        </BasicMenu>
    );
}
