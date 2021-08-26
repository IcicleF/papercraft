import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Search() {
    const router = useRouter();
    const pKey = router.query.key as string[] | undefined;

    const classes = useStyles();

    const key = pKey?.join('/');

    return (
        <div className={classes.root}>
            {key}
            <a href='/'>Go back</a>
        </div>
    );
}
