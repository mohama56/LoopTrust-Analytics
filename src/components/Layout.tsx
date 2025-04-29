import React, { ReactNode } from 'react';
import Head from 'next/head';
import NavigationHeader from './NavigationHeader';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

const Layout: React.FC<LayoutProps> = ({
                                           children,
                                           title = 'LoopTrust Analytics',
                                           description = 'Enterprise blockchain analytics solutions for businesses, financial institutions, and traders'
                                       }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="full-bg-wrapper">
                {/* Navigation Header - consistent across all pages */}
                <NavigationHeader />

                {/* Page content */}
                <main>{children}</main>
            </div>

            <style jsx>{`
                .full-bg-wrapper {
                    min-height: 100vh;
                    background-image: url('/LoopTrustA_Background.png');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    position: relative;
                }

                .full-bg-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to bottom, rgba(4, 12, 24, 0.85), rgba(4, 12, 24, 0.93));
                    z-index: 0;
                }

                main {
                    position: relative;
                    z-index: 1;
                }
            `}</style>
        </>
    );
};

export default Layout;