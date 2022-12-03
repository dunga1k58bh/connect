import React, {useEffect} from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import * as Mui from '@mui/material/';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
export default function AccountFormLogin({ canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));

    };

    return (
        <Mui.Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '100%'}, }}
            autoComplete="off"
        >

              <Mui.TextField
                    error={errors.email}
                    label="Email or phone number"
                    name="email"
                    variant="outlined"
                    defaultValue={data.email}
                    onChange={onHandleChange}
                    helperText="Email or password not match"
                />

              <Mui.TextField
                    error={errors.password}
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    defaultValue={data.password}
                    onChange={onHandleChange}
                    helperText="Email or password not match"
                />


            <Mui.FormControlLabel
                control={<Mui.Checkbox defaultChecked name='remember' value={data.remember} />}
                label="Remember me"
            />

            <Mui.Button variant="contained"
                sx={{display:"flex", width: "100%", fontWeight:"700"}}
                color="success"
                size="large"
                onClick={submit}
            >
                Log in
            </Mui.Button>

            <div className="flex items-center justify-center mt-4">
                {canResetPassword && (
                    <Link
                        href={route('password.request')}
                        className="underline text-sm text-gray-600 hover:text-[#42b72a]"
                    >
                        Forgot your password?
                    </Link>
                )}
            </div>

            <div className='border-b-[1px] border-solid w-[100%] mt-6'></div>

            <div className=''>
                <></>
            </div>
        </Mui.Box>
    );
}
