import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import AccountFormLogin from '@/Components/Form/Account/Login';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AccountFormCreate from '@/Components/Form/Account/Create';

export default function Login({ status, canResetPassword }) {

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div>
                <AccountFormLogin canResetPassword={canResetPassword}></AccountFormLogin>
                <AccountFormCreate></AccountFormCreate>
            </div>
        </GuestLayout>
    );
}
