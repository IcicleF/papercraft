import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { signIn, signOut, useSession } from 'next-auth/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        margin: '15% 20%',
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: grey[200],
    },
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    typography: {
        marginBottom: theme.spacing(1),
        fontSize: 20,
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        fontSize: 22,
    },
}));

export default function AuthError() {
    const router = useRouter();
    const error = router.query.error as string;

    const classes = useStyles();

    let title: string;
    let details: string[];

    switch (error) {
        case 'Configuration':
            title = 'SERVER CONFIGURATION ERROR';
            details = [
                'The server is currently experiencing issues with its authentication functionalities.',
                'Contact the site manager if you want.',
            ];
            break;
        case 'AccessDenied':
            title = 'ACCESS DENIED';
            details = [
                'Your account is not allowed to access this site.',
                'Contact the site manager if you wish to get a permission.',
            ];
            break;
        default:
            title = 'LOGIN ERROR';
            details = ['Currently, you can not login to this site.', 'Please retry later.'];
            break;
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container justifyContent='center' spacing={2}>
                    <Grid item xs={12}>
                        <Typography align='center' variant='h2' className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {details.map((str, ind) => (
                            <Typography
                                key={'details-' + ind}
                                align='center'
                                variant='body1'
                                className={classes.typography}
                            >
                                {str}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
