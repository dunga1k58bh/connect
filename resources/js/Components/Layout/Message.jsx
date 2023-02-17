import * as React from 'react';
import BasicMenu from '../UI/BasicMenu';
import ForumIcon from '@mui/icons-material/Forum';


export default function Message() {

    return (
        <BasicMenu
            tooltip="Message"
            icon={<ForumIcon></ForumIcon>}
        >
        </BasicMenu>
    );
}
