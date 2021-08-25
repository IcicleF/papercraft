import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/theme';
import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../css/fonts.css';

export default function App({ Component, pageProps }: AppProps) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Papercraft</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <ThemeProvider theme={theme}>
                <NextAuthProvider session={pageProps.session}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </NextAuthProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
