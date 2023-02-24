import { useForm} from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as React from 'react';

export default function GroupFormCreate() {

    const { data, setData, post, processing, errors, reset } = useForm({
       name: "",
       type: 0

    });

    const [open, setOpen] = React.useState(false);

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route('group.create'), {onSuccess: () => {
            handleClose();
            reset();
        }});
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    <div>
        <Button variant="contained" onClick={handleClickOpen}
            sx={{width: "100%"}}
        >
            Create new account
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Create your own group
            </DialogContentText>
            <Box sx={{ flexGrow: 1, paddingTop: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={12}>
                        <TextField error={errors.name} helperText="Incorrect entry." label="Group name" name="name" fullWidth size="small" value={data.name} onChange={onHandleChange} autoComplete="off"></TextField>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="select-gender">Gender</InputLabel>
                            <Select
                                name="type"
                                value={data.type}
                                label="type"
                                onChange={onHandleChange}
                            >
                                <MenuItem value={0}>Public</MenuItem>
                                <MenuItem value={1}>Private</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
