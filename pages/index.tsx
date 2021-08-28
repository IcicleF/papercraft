import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Button,
    Typography,
    TextField,
    InputBase,
    Checkbox,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    FormHelperText,
} from '@material-ui/core';
import UnauthorizedPage from './unauthorized';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import { signOut, useSession } from 'next-auth/client';

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
        width: 'min(600px, 80vw)',
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
    formControl: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(4),
    },
    authorInput: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        backgroundColor: 'white',
    },
    authorInputResize: {
        fontSize: 15,
    },
    authorHelp: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    }
}));

export default function Main() {
    const classes = useStyles();
    const [session, loading] = useSession();

    // Search engine
    const [searchEngine, setSearchEngine] = useState<Record<string, boolean>>({
        dblp: true,
        google: false,
        arxiv: false,
    });

    const handleSearchEngineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchEngine({
            ...searchEngine,
            [event.target.name]: event.target.checked,
        });
    };
    const searchEngineError =
        Object.keys(searchEngine).filter((key) => Boolean(searchEngine[key])).length < 1;

    // Advanced search
    const [advancedSearch, setAdvancedSearch] = useState<Record<string, boolean>>({
        title: true,
        author: false,
    });
    const [authorName, setAuthorName] = useState('');

    const handleAdvancedSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdvancedSearch({
            ...advancedSearch,
            [event.target.name]: event.target.checked,
        });
    };
    const advancedSearchError =
        Object.keys(advancedSearch).filter((key) => Boolean(advancedSearch[key])).length < 1;

    // Query
    const [query, setQuery] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (searchEngineError || advancedSearchError) return;

        let args: Record<string, string> = {};
        if (advancedSearch.title && query !== '')
            args['q'] = query;
        if (advancedSearch.author && authorName !== '')
            args['a'] = authorName;

        let param = Object.keys(args).map((key) => key + '=' + encodeURIComponent(args[key])).join('&');
        if (param !== '')
            window.location.href = `/search?${param}`;
    };

    // Return must below all hooks
    if (!session) {
        return <UnauthorizedPage />;
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
            <Grid container className={classes.centralTitle} alignItems='center'>
                <Typography variant='h2' className={classes.brand}>
                    Papercraft
                </Typography>
            </Grid>
            <Grid container className={classes.central}>
                <Paper elevation={3} className={classes.paper}>
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
                                disabled={!advancedSearch.title}
                                inputProps={{ 'aria-label': 'naked' }}
                                onKeyDown={handleSearchKeyDown}
                                onChange={handleSearchChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center'>
                        <Grid item xs={6}>
                            <FormControl
                                required
                                error={searchEngineError}
                                component='fieldset'
                                className={classes.formControl}
                            >
                                <FormLabel component='legend'>Search engine</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={searchEngine.dblp}
                                                onChange={handleSearchEngineChange}
                                                name='dblp'
                                            />
                                        }
                                        label='DBLP'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={searchEngine.google}
                                                onChange={handleSearchEngineChange}
                                                name='google'
                                            />
                                        }
                                        label='Google Scholar'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={searchEngine.arxiv}
                                                onChange={handleSearchEngineChange}
                                                name='arxiv'
                                            />
                                        }
                                        label='arXiv CoRR'
                                    />
                                </FormGroup>
                                {searchEngineError && (
                                    <FormHelperText>Need a search engine.</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl
                                required
                                error={advancedSearchError}
                                component='fieldset'
                                className={classes.formControl}
                            >
                                <FormLabel component='legend'>Advanced search</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={advancedSearch.title}
                                                onChange={handleAdvancedSearchChange}
                                                name='title'
                                            />
                                        }
                                        label='Search title'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={advancedSearch.author}
                                                onChange={handleAdvancedSearchChange}
                                                name='author'
                                            />
                                        }
                                        label='Search author'
                                    />
                                    {advancedSearch.author && (
                                        <TextField
                                            id='author-input'
                                            className={classes.authorInput}
                                            InputProps={{
                                                classes: {
                                                    input: classes.authorInputResize,
                                                },
                                            }}
                                            value={authorName}
                                            onKeyDown={handleSearchKeyDown}
                                            onChange={(event) => setAuthorName(event.target.value)}
                                            label='Author Name'
                                            variant='outlined'
                                        />
                                    )}
                                </FormGroup>
                                {advancedSearch.author &&
                                    <FormHelperText className={classes.authorHelp}>
                                        Author search is not fully supported.
                                    </FormHelperText>
                                }
                                {advancedSearchError && (
                                    <FormHelperText>Need to search something.</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
