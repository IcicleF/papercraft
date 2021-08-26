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
    const key = router.query.key as string;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {key}
            <a href='/'>Go back</a>
        </div>
    );
}