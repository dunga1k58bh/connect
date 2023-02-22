import { IconButton, Tooltip } from "@mui/material";

export default function Button(props) {

    const onClick = props.onClick || null;

    var icon, button;
    if (props.icon){
        icon = props.icon;
        var size = props.size || 16;
        var sx = props.sx || {
            '&:hover': {
              bgcolor: '#ccc',
              color: '#000'
            },

            '.MuiSvgIcon-root': {
                width: props.size,
                height: props.size
            }
        }
        button = (<IconButton
            onClick={onClick}
            style={{width: size*2, height: size*2}}
            sx={sx}
        >
            {icon}
        </IconButton>);
    }

    return (<div className="">
        <Tooltip title={props.tooltip || ""}>
        {button}
        </Tooltip>
    </div>);
}
