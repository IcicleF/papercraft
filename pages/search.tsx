import React, { useState } from 'react';
import {
    makeStyles,
    Accordion,
    Grid,
    Paper,
    Button,
    Typography,
    TextField,
    InputBase,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UnauthorizedPage from './unauthorized';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';

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

    // Search result accordion
    accordionHeading: {
        fontSize: 15,
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Search() {
    // Parse GET params
    const router = useRouter();
    console.log(router.query);
    const title = router.query.q as (string | undefined);
    const author = router.query.a as (string | undefined);
    const engines = router.query.engine as (string | undefined);

    const engine = {
        dblp: Boolean(engines && engines.search('dblp') >= 0),
        google: Boolean(engines && engines.search('google') >= 0),
        arxiv: Boolean(engines &&engines.search('arxiv') >= 0),
    };

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
            <Grid container justifyContent='center' alignItems='center'>
                {engine.dblp &&
                    <Grid item>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel-dblp-content'
                                id='panel-dblp-header'
                            >
                                <Typography className={classes.accordionHeading}>
                                    DBLP
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}
