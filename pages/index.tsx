import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UnauthorizedUser from './auth/unauthorized';

import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Main() {
    const classes = useStyles();
    const [dbObj, setDbObj] = useState<string>('');

    const [session, loading] = useSession();

    const reqPutPaper = async () => {
        // console.log('reqPutPaper');
        let res = await axios.put('/api/paper', { title: 'Orion' });
        // console.log(res.status);
    };

    if (session?.user?.email !== "ii@icyf.me") {
        return UnauthorizedUser();
    }

    return (
        <div className={classes.root}>
            <Button variant='contained' color='primary' onClick={reqPutPaper}>
                Put paper
            </Button>
            <Button variant='contained' color='primary'>
                Get paper
            </Button>
            {!session && <Button onClick={() => signIn()}>Login</Button>}
            {session && (
                <div>
                    <Typography>Signed in as {session.user?.email}</Typography>
                    <Button onClick={() => signOut()}>Logout</Button>
                </div>
            )}
            <Typography variant='body1'>{dbObj}</Typography>
        </div>
    );
}
