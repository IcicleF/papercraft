import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { signIn, signOut, useSession } from 'next-auth/client';

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

export default function UnauthorizedUser() {
    const classes = useStyles();
    const [session, loading] = useSession();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} >
                <Grid container justifyContent='center' spacing={2}>
                    <Grid item xs={12}>
                        <Typography align='center' variant='h2' className={classes.title}>
                            UNAUTHORIZED ACCESS
                        </Typography>
                    </Grid>
                    {session &&
                        <>
                            <Grid item xs={12}>
                                {session.user?.email &&
                                    <>
                                        <Typography align='center' variant='body1' className={classes.typography}>
                                            This site is only open to authorized users.
                                        </Typography>
                                        <Typography align='center' variant='body1' className={classes.typography}>
                                            Your email address {session.user?.email} is not accepted.
                                        </Typography>
                                        <Typography align='center' variant='body1' className={classes.typography}>
                                            If you believe you are eligible to access this site,
                                            contact the site manager.
                                        </Typography>
                                    </>
                                }
                                {!(session.user?.email) &&
                                    <>
                                        <Typography align='center' variant='body1' className={classes.typography}>
                                            This site is only open to authorized users.
                                            However, we can't get your email address to verify your identity.
                                        </Typography>
                                        <Typography align='center' variant='body1' className={classes.typography}>
                                            Make sure you have a public email address for your Tsinghua Git account.
                                        </Typography>
                                    </>
                                }
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='contained' color='primary'
                                    className={classes.button} onClick={() => signOut()}
                                >
                                    Logout
                                </Button>
                            </Grid>
                        </>
                    }
                    {!session &&
                        <>
                            <Grid item xs={12}>
                                <Typography align='center' variant='body1' className={classes.typography}>
                                    This site is only open to authorized logged-in users.
                                </Typography>
                                <Typography align='center' variant='body1' className={classes.typography}>
                                    Prepare a valid Tsinghua Git account, then login with it.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='contained' color='primary'
                                    className={classes.button} onClick={() => signIn()}
                                >
                                    Login with Tsinghua Git
                                </Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Paper>
        </div>
    );
}