import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';


const NavigationHeader: React.FC = () => {
    const router = useRouter();

    // Helper function to determine if a link is active
    const isActive = (path: string) => router.pathname === path;

    return (
        <header className="navigation-header-lg">
            <div className="navigation-container">
                <div className="logo-container">
                    <Link href="/" passHref>
                        <div className="logo-link">
                            <Image
                                src="/LoopTrustAnalytics_Logo.png"
                                alt="LoopTrust Logo"
                                width={200}
                                height={200}
                                priority
                            />
                            <span className="logo-text">LoopTrust Analytics</span>
                        </div>
                    </Link>
                </div>

                <div className="navigation-actions">
                    <nav className="main-nav">
                        <Link href="/" passHref>
                            <span className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                                Home
                            </span>
                        </Link>
                        <Link href="/services" passHref>
                            <span className={`nav-link ${isActive('/services') ? 'active' : ''}`}>
                                Services
                            </span>
                        </Link>
                        <Link href="/pricing" passHref>
                            <span className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>
                                Pricing
                            </span>
                        </Link>
                        <Link href="/research" passHref>
                            <span className={`nav-link ${isActive('/research') ? 'active' : ''}`}>
                                Research
                            </span>
                        </Link>
                        <Link href="/about" passHref>
                            <span className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                                About
                            </span>
                        </Link>
                    </nav>
                    <div className="connect-button">
                        <ConnectButton />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .navigation-header {
                    position: sticky;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    background: rgba(4, 12, 24, 0.8);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(63, 191, 191, 0.2);
                    height: 100px;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .navigation-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 2300px;
                    margin: 0 auto;
                    padding: 1rem;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    margin-right: auto; /* Push everything else to the right */
                    padding-right: 2rem; /* Add some space after the logo */
                    padding-top: 1px; /* Move the logo down */
                    align-self: flex-start; /* Align to the top of the container */
                    margin-top: 5px; /* Additional top margin */
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    transition: opacity 0.2s ease;
                }

                .logo-link:hover {
                    opacity: 0.9;
                }

                .logo-text {
                    margin-left: -3rem;
                    font-weight: 1000;
                    font-size: 1.8rem;
                    color: #ffffff;
                    background: linear-gradient(90deg, #ffffff 0%, #a4d8d8 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }

                .navigation-actions {
                    display: flex;
                    align-items: center;
                    margin-left: auto; /* Push to the right */
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    margin-right: 2.5rem;
                }

                .nav-link {
                    padding: 0.5rem 1rem;
                    color: #a4c3d2;
                    font-weight: 700;
                    transition: all 0.2s ease;
                    position: relative;
                    cursor: pointer;
                }

                .nav-link:hover {
                    color: #ffffff;
                }

                .nav-link.active {
                    color: #3FBFBF;
                    font-weight: 1200;
                }

                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 2px;
                    background: #3FBFBF;
                    border-radius: 1px;
                }

                /* Responsive adjustments */
                @media (max-width: 900px) {
                    .navigation-header {
                        height: auto;
                    }

                    .navigation-container {
                        flex-direction: column;
                        padding: 1rem;
                    }

                    .logo-container {
                        margin: 0 0 1rem 0;
                        padding: 0;
                        align-self: center; /* Center logo on mobile */
                    }

                    .navigation-actions {
                        flex-direction: column;
                        width: 100%;
                        justify-content: center;
                        margin: 0;
                    }

                    .main-nav {
                        margin-right: 0;
                        margin-bottom: 1rem;
                        width: 100%;
                        justify-content: center;
                        flex-wrap: wrap;
                    }

                    .nav-link {
                        padding: 0.5rem 0.75rem;
                    }

                    .connect-button {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }
                }

                @media (max-width: 600px) {
                    .main-nav {
                        gap: 0.25rem;
                    }

                    .nav-link {
                        padding: 0.5rem 0.5rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </header>
    );
};

export default NavigationHeader;