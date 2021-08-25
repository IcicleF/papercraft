import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, InputBase } from '@material-ui/core';
import UnauthorizedPage from './unauthorized';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios';
import { signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    userName: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        verticalAlign: 'middle',
    },
    logoutButton: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        fontSize: 16,
    },
    centralTitle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    brand: {
        marginTop: theme.spacing(20),
        fontFamily: 'Nunito',
    },
    searchBox: {
        marginTop: theme.spacing(3),
        display: 'flex',
        margin: '0 auto',
        width: 'auto',
        height: 44,
        borderRadius: 24,
        border: 'solid 1px #CED1D5',
        boxShadow: 'none',
        zIndex: 3,
    },
    searchBoxIcon: {
        color: grey[600],
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1),
    },
    searchBoxInput: {
        width: 'min(550px, 80vw)',
        marginRight: 16,
        display: 'flex',
        flex: 1,
        outline: 'none',
        border: 'none',
        wordWrap: 'break-word',
        WebkitTapHighlightColor: 'transparent',
        color: 'rgba(0, 0, 0, .87)',
        backgroundColor: 'transparent',
    },
}));

export default function Main() {
    const classes = useStyles();
    const [session, loading] = useSession();
    if (!session) {
        return <UnauthorizedPage />;
    }

    const [searchStr, setSearchStr] = useState<string>('');
    const handleChange = (event) => {
        
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container justifyContent='flex-end' alignItems='center'>
                    <Grid item>
                        <Typography variant='h6' className={classes.userName}>
                            {session.user?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.logoutButton}
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.centralTitle}
                    alignItems='center'
                >
                    <Typography variant='h2' className={classes.brand}>
                        Papercraft
                    </Typography>
                </Grid>
                <Grid
                    container
                    className={classes.searchBox}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Grid item className={classes.searchBoxIcon}>
                        <Grid container alignItems='center'>
                            <SearchIcon />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <InputBase
                            className={classes.searchBoxInput}
                            inputProps={{ 'aria-label': 'naked' }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
