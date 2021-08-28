import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Grid,
    Paper,
    Button,
    Typography,
    TextField,
    InputBase,
} from '@material-ui/core';
import UnauthorizedPage from './unauthorized';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    // Top
    brand: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(10),
        fontFamily: 'Nunito',
    },
    searchBox: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: 44,
        borderRadius: 24,
        border: 'solid 1px ' + grey[600],
        backgroundColor: 'white',
        boxShadow: 'none',
        zIndex: 3,
    },
    searchBoxIcon: {
        color: grey[600],
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1),
    },
    searchBoxInput: {
        width: 'min(800px, 80vw)',
        marginRight: 16,
        fontSize: 15,
        display: 'flex',
        flex: 1,
        outline: 'none',
        border: 'none',
        wordWrap: 'break-word',
        WebkitTapHighlightColor: 'transparent',
        color: 'rgba(0, 0, 0, .87)',
        backgroundColor: 'transparent',
    },
    divider: {
        width: '90vw',
    },
}));

export default function Search() {
    const router = useRouter();
    const title = router.query.q as (string | undefined);
    const author = router.query.a as (string | undefined);

    const classes = useStyles();
    const [session, loading] = useSession();

    // Query
    const [query, setQuery] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (query === '') return;

        // TODO: build param and redirect
    };

    if (!session) {
        return <UnauthorizedPage />;
    }

    return (
        <Grid container className={classes.root}>
            <Grid container justifyContent='flex-start' alignItems='center'>
                <Grid item>
                    <Typography variant='h4' className={classes.brand}>Papercraft</Typography>
                </Grid>
                <Grid item>
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
                                value={query}
                                inputProps={{ 'aria-label': 'naked' }}
                                onKeyDown={handleSearchKeyDown}
                                onChange={handleSearchChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
