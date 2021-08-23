import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

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

    const reqPutPaper = async () => {
        console.log('reqPutPaper');
        let res = await axios.put('/api/paper', { title: 'LocoFS' });
        console.log(res.status);
    };

    return (
        <div className={classes.root}>
            <Button variant='contained' color='primary' onClick={reqPutPaper}>
                Put paper
            </Button>
            <Button variant='contained' color='primary'>
                Get paper
            </Button>
            <Typography variant='body1'>{dbObj}</Typography>
        </div>
    );
}
