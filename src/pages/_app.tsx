import type { AppProps } from 'next/app';
import WalletProvider from '../components/WalletProvider';
import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WalletProvider>
            <Head>
                <title>LoopTrust Analytics</title>
                <meta name="description" content="Enterprise blockchain analytics solutions" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </WalletProvider>
    );
}
