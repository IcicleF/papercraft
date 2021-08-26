import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Button,
    Typography,
    InputBase,
    Checkbox,
} from '@material-ui/core';
import {
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
} from '@material-ui/core';
import UnauthorizedPage from './unauthorized';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';

import { signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    // Top
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

    // Middle - Text
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

    // Middle - Search
    central: {
        marginTop: theme.spacing(3),
        display: 'flex',
        margin: '0 auto',
        width: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: grey[100],
        borderRadius: 24,
    },
    searchBox: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        height: 44,
        borderRadius: 24,
        border: 'solid 1px ' + grey[600],
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
    formControl: {
        margin: theme.spacing(2),
    },
}));

export default function Main() {
    const classes = useStyles();
    const [session, loading] = useSession();

    // Query & redirect to search page
    const [hQueryTimeout, setHQueryTimeout] =
        useState<ReturnType<typeof setTimeout>>();
    const [redirect, setRedirect] = useState('');

    const doSearch = (searchStr: string) => () => {
        console.log(searchStr);
        setRedirect(`/search/${searchStr}`);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(Number(hQueryTimeout));
        setHQueryTimeout(setTimeout(doSearch(event.target.value), 750));
    };

    // Checkboxes
    const [searchEngine, setSearchEngine] = useState({
        dblp: true,
        google: false,
        arxiv: false,
    });

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchEngine({
            ...searchEngine,
            [event.target.name]: event.target.checked,
        });
    };

    // Return must below all hooks
    if (!session) {
        return <UnauthorizedPage />;
    }

    // If redirect flag set and is not empty, then go there
    if (redirect !== '' && redirect !== '/search/') {
        window.location.href = redirect;
    }

    return (
        <Grid container className={classes.root}>
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
            <Grid container className={classes.central}>
                <Paper elevation={2} className={classes.paper}>
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
                                onChange={handleSearchChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <FormControl
                                component='fieldset'
                                className={classes.formControl}
                            >
                                <FormLabel component='legend'>
                                    Search engine
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={searchEngine.dblp}
                                                onChange={handleCheckboxChange}
                                                name='dblp'
                                            />
                                        }
                                        label='DBLP'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={searchEngine.google}
                                                onChange={handleCheckboxChange}
                                                name='google'
                                            />
                                        }
                                        label='Google Scholar'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={searchEngine.arxiv}
                                                onChange={handleCheckboxChange}
                                                name='arxiv'
                                            />
                                        }
                                        label='arXiv CoRR'
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
