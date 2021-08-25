import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { signIn, signOut, useSession } from 'next-auth/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const useStyles = makeStyles((theme) => ({
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    return {
        props: {
            error: query.error,
        },
    };
};

export default function AuthError({
    error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const classes = useStyles();

    let title: string;
    let details: string[];

    switch (error) {
        case 'Configuration':
            title = 'SERVER CONFIGURATION ERROR';
            details = [
                'The server is currently experiencing issues with its authentication functionalities.',
                'Contact the site manager if you can.',
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
            details = [
                'Currently, you can not login to this site.',
                'Please retry later.',
            ];
            break;
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container justifyContent='center' spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            align='center'
                            variant='h2'
                            className={classes.title}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {details.map((str, ind) => (
                            <Typography
                                id={'details-' + ind}
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
