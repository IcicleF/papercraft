import React, { useState } from 'react';
import {
    withStyles,
    makeStyles,
    Grid,
    Paper,
    Button,
    Typography,
    TextField,
    InputBase,
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails as MuiAccordionDetails,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnauthorizedPage from './unauthorized';

import { signOut, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { SearchEngineResult } from 'src/types/common';
import { searchDblp } from 'src/search/searchDblp';
import { buildQueryString } from 'src/utils';

// Styles and styled components
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
    flexGrow: {
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

    // Divider
    divider: {
        width: '98vw',
        height: 1,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(5),
        backgroundColor: grey[400],
    },

    // Search result accordion
    accordionContainer: {
        display: 'flex',
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
    },
    accordion: {
        minWidth: 'max(min(800px, 80vw), 60vw)',
    },
    accordionHeading: {
        fontSize: 15,
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

// Styled Accordion
const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .25)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

// Page render
type SearchProps = Partial<{
    ok: boolean;
    title: string;
    author: string;
    dblp: SearchEngineResult;
    google: SearchEngineResult;
    arxiv: SearchEngineResult;
}>;
type WrappedSearchProps = { data: SearchProps };
const wrapSearchProps = (data: SearchProps) => ({ props: { data } });

export const getServerSideProps: GetServerSideProps = async (
    context
): Promise<{ props: WrappedSearchProps }> => {
    const title = context.query.q as string | undefined;
    const author = context.query.a as string | undefined;
    const engines = context.query.engine as string | undefined;
    const engine = {
        dblp: Boolean(engines && engines.search('dblp') >= 0),
        google: Boolean(engines && engines.search('google') >= 0),
        arxiv: Boolean(engines && engines.search('arxiv') >= 0),
    };

    // Check query validity
    if ((!title && !author) || (!engine.dblp && !engine.google && !engine.arxiv)) {
        return wrapSearchProps({ ok: false });
    }

    let props: SearchProps = { ok: true, title, author };
    if (engine.dblp) props.dblp = await searchDblp(title, author, 0);

    return wrapSearchProps(props);
};

export default function Search({ data }: WrappedSearchProps) {
    const { ok, title, author, dblp, google, arxiv } = data;

    const classes = useStyles();
    const [session, loading] = useSession();

    // Query
    const [query, setQuery] = useState(
        buildQueryString(title, author, {
            dblp: Boolean(dblp),
            google: Boolean(google),
            arxiv: Boolean(arxiv),
        }) || ''
    );
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (query === '') return;

        // TODO: build param and redirect
        console.log('Keydown ignored');
    };

    // Return must below all hooks
    if (!session) {
        return <UnauthorizedPage />;
    }

    // If entered this page by mistake, redirect to home page
    if (!ok || query === '') {
        window.location.href = '/';
    }

    return (
        <Grid container className={classes.root}>
            <Grid container justifyContent='flex-start' alignItems='center'>
                <Grid item>
                    <Typography variant='h4' className={classes.brand}>
                        Papercraft
                    </Typography>
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
                <Grid item className={classes.flexGrow} />
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
            <Grid container justifyContent='center'>
                <Grid item className={classes.divider} />
            </Grid>
            <Grid container justifyContent='flex-start' alignItems='center'>
                {Boolean(dblp) && (
                    <Grid item className={classes.accordionContainer}>
                        <Accordion defaultExpanded className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel-dblp-content'
                                id='panel-dblp-header'
                            >
                                <Typography className={classes.accordionHeading}>DBLP</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{JSON.stringify(dblp)}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
