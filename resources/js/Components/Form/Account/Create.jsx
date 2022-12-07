import { useForm} from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as React from 'react';

export default function AccountFormCreate() {

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        re_email: '',
        password: '',
        birthdate: dayjs(),
        gender: ''
    });

    const [open, setOpen] = React.useState(false);

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route('register'), {onSuccess: () => {
            console.log("success");
        }});
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onDateChange = (date) => {
        setData('birthdate', date);
    }

    const onGenderChange = (new_value) => {
        console.log(new_value);
        setData('gender', new_value);
    }

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
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
            <DialogContentText>
                It's quick and easy
            </DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField error={errors.firstname} helperText="Incorrect entry." label="First name" name="firstname" fullWidth size="small" value={data.firstname} onChange={onHandleChange} autoComplete="off"></TextField>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField error={errors.lastname} helperText="Incorrect entry." size="small" label="Last name" name="lastname" fullWidth value={data.lastname} onChange={onHandleChange} autoComplete="off"></TextField>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <TextField error={errors.email} helperText="Incorrect entry." size="small" label="Email or phone number" name="email" value={data.email} fullWidth onChange={onHandleChange} autoComplete="off"></TextField>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <TextField error={errors.re_email} helperText="Incorrect entry." size="small" label="Re-enter email or phone number" name="re_email" value={data.re_email} fullWidth onChange={onHandleChange} autoComplete="off"></TextField>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <TextField error={errors.passowrd} helperText="Incorrect entry." size="small" label="Password" name="password" type="password" value={data.password} fullWidth onChange={onHandleChange} autoComplete="off"></TextField>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birth day"
                                name="birthdate"
                                value={data.birthdate}
                                inputFormat="MM/DD/YYYY"
                                onChange={onDateChange}
                                renderInput={(params) => <TextField size="small" {...params} />}

                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="select-gender">Gender</InputLabel>
                            <Select
                                name="gender"
                                value={data.gender}
                                label="Gender"
                                onChange={onHandleChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Sign up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
