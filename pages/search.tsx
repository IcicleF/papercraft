import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Popover from '@mui/material/Popover';

import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import DblpIcon from 'src/icons/Dblp';
import GoogleIcon from 'src/icons/Google';
import ArxivIcon from 'src/icons/Arxiv';

import { signOut, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { SearchEngineResult } from 'src/types/common';
import { searchDblp } from 'src/search/searchDblp';
import UnauthorizedPage from './unauthorized';
import PaperEntry from 'src/components/PaperEntry';

// Styles and styled components
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },

    // Top
    brand: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(8),
        fontFamily: 'Nunito',
    },
    engineSelector: {
        marginRight: theme.spacing(2),

        borderRadius: theme.shape.borderRadius,
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
        marginRight: theme.spacing(0.5),
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
    searchBoxTuner: {
        marginRight: theme.spacing(1),
    },
    searchBoxAuthor: {
        margin: theme.spacing(1),
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

    accordionHeading: {
        fontSize: 15,
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

// Styled Accordion
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: '1px solid rgba(0, 0, 0, .25)',
    boxShadow: 'none',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

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

    let props: SearchProps = { ok: true };

    // Prevent explicit undefined value
    if (title) props.title = title;
    if (author) props.author = author;
    if (engine.dblp) props.dblp = await searchDblp(title, author, 0);

    return wrapSearchProps(props);
};

export default function Search({ data }: WrappedSearchProps) {
    const { ok, title, author, dblp, google, arxiv } = data;

    const classes = useStyles();
    const [session, loading] = useSession();

    // Search Engine
    const undefableEngines = [dblp && 'dblp', google && 'google', arxiv && 'arxiv'];
    const [engines, setEngines] = useState(() => undefableEngines.filter((x) => Boolean(x)));
    const handleEngineChange = (event: React.MouseEvent<HTMLElement>, newEngines: string[]) => {
        setEngines(newEngines);
    };

    // Author Search Box
    const [authorSearch, setAuthorSearch] = useState(author || '');
    const handleAuthorSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorSearch(event.target.value);
    };

    // Author Search Popup
    const [authorPopupAnchorEl, setAuthorPopupAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleTunerClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAuthorPopupAnchorEl(event.currentTarget);
    const handleAuthorPopupClose = () => setAuthorPopupAnchorEl(null);
    const authorPopupOpen = Boolean(authorPopupAnchorEl);

    // Query
    const [query, setQuery] = useState(title);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (query === '' && authorSearch === '') return;

        let args: Record<string, string> = {};
        args['engine'] = engines.join('_');
        if (args['engine'] === '') return;

        if (query && query !== '') args['q'] = query;
        if (authorSearch !== '') args['a'] = authorSearch;

        let param = Object.keys(args)
            .map((key) => key + '=' + encodeURIComponent(args[key]))
            .join('&');
        if (param !== '') {
            window.location.href = `/search?${param}`;
        }
    };

    const handleBrandClick = () => (window.location.href = '/');

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
                    <Typography variant='h4' className={classes.brand} onClick={handleBrandClick}>
                        Papercraft
                    </Typography>
                </Grid>
                <Grid item>
                    <ToggleButtonGroup
                        className={classes.engineSelector}
                        size='small'
                        color='primary'
                        value={engines}
                        onChange={handleEngineChange}
                    >
                        <ToggleButton value='dblp' aria-label='dblp'>
                            <DblpIcon />
                        </ToggleButton>
                        <ToggleButton value='google' aria-label='google'>
                            <GoogleIcon />
                        </ToggleButton>
                        <ToggleButton value='arxiv' aria-label='arxiv'>
                            <ArxivIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
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
                        <Grid item>
                            <IconButton
                                className={classes.searchBoxTuner}
                                color={authorSearch !== '' ? 'primary' : 'inherit'}
                                component='span'
                                onClick={handleTunerClick}
                            >
                                <TuneIcon />
                            </IconButton>
                            <Popover
                                id={authorPopupOpen ? 'author-popover' : undefined}
                                open={authorPopupOpen}
                                anchorEl={authorPopupAnchorEl}
                                onClose={handleAuthorPopupClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <TextField
                                    className={classes.searchBoxAuthor}
                                    id='author-name'
                                    label='Author Name'
                                    variant='outlined'
                                    value={authorSearch}
                                    onChange={handleAuthorSearchChange}
                                    onKeyDown={handleSearchKeyDown}
                                />
                            </Popover>
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
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel-dblp-content'
                                id='panel-dblp-header'
                            >
                                <Typography className={classes.accordionHeading}>DBLP</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.flexGrow}>
                                {
                                    dblp?.res.map((element, index) => (
                                        <PaperEntry key={index} record={element} />
                                    ))
                                }
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
