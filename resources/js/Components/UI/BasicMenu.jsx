import * as React from 'react';
import Menu from '@mui/material/Menu';
import { IconButton, Tooltip, Button} from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function BasicMenu({tooltip, icon, render, children}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  var button = (
    <Tooltip title={tooltip}>
    <IconButton
        sx={{height: "56px", width: "56px"}}
        onClick={handleClick}
    >
        {icon}
        <input type="file" hidden/>
    </IconButton>
    </Tooltip>
  );

  if (render) {
    button = (
        {render}
    );
  }

  return (
    <div>
    {button}
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{"& .MuiPaper-root": {
            backgroundColor: "rgb(241 245 249)"
        }}}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
    >

        {children}
    </Menu>
    </div>
  );
}
