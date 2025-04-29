import React from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import NavigationHeader from '../components/NavigationHeader';

// Helper components
const ServiceCard = ({ title, description, iconSrc, link }: { title: string, description: string, iconSrc: string, link: string }) => (
    <div className="service-card">
        <div className="icon-wrapper">
            <Image
                src={iconSrc}
                alt={title}
                width={60}
                height={60}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <Link href={link} passHref>
            <button className="card-btn">
                Learn More
            </button>
        </Link>

        <style jsx>{`
            .service-card {
                background: rgba(4, 12, 24, 0.7);
                border: 1px solid rgba(63, 191, 191, 0.2);
                border-radius: 12px;
                padding: 2rem;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }

            .service-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 12px;
                padding: 2px;
                background: linear-gradient(135deg, rgba(63, 191, 191, 0.5) 0%, transparent 50%, transparent 100%);
                -webkit-mask: 
                    linear-gradient(to bottom, #fff 0%, #fff 100%) content-box,
                    linear-gradient(to bottom, #fff 0%, #fff 100%) border-box;
                -webkit-mask-composite: xor;
                mask:
                        linear-gradient(to bottom, #fff 0%, #fff 100%) content-box,
                        linear-gradient(to bottom, #fff 0%, #fff 100%) border-box;
                mask-composite: exclude;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .service-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                border-color: rgba(63, 191, 191, 0.5);
            }

            .service-card:hover::before {
                opacity: 1;
            }

            .icon-wrapper {
                background: rgba(63, 191, 191, 0.15);
                width: 90px;
                height: 90px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5rem;
                position: relative;
                border: 1px solid rgba(63, 191, 191, 0.3);
            }

            .icon-wrapper::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px dashed rgba(63, 191, 191, 0.5);
                animation: rotate 20s linear infinite;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .service-card:hover .icon-wrapper::after {
                opacity: 1;
            }

            .card-title {
                font-size: 1.4rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: #ffffff;
            }

            .card-description {
                color: #a4c3d2;
                margin-bottom: 1.5rem;
                flex-grow: 1;
                line-height: 1.6;
            }

            .card-btn {
                background: transparent;
                color: #3FBFBF;
                border: 1px solid #3FBFBF;
                padding: 0.5rem 1.25rem;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .card-btn:hover {
                background: rgba(63, 191, 191, 0.1);
                box-shadow: 0 0 15px rgba(63, 191, 191, 0.3);
            }
        `}</style>
    </div>
);

const ClientCard = ({ title, description, iconSrc }: { title: string, description: string, iconSrc: string }) => (
    <div className="client-card">
        <div className="client-icon">
            <Image
                src={iconSrc}
                alt={title}
                width={40}
                height={40}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />
        </div>
        <h3 className="client-title">{title}</h3>
        <p className="client-description">{description}</p>

        <style jsx>{`
            .client-card {
                background: rgba(4, 12, 24, 0.7);
                border: 1px solid rgba(63, 191, 191, 0.15);
                border-radius: 10px;
                padding: 1.5rem;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .client-card:hover {
                transform: translateY(-5px);
                border-color: rgba(63, 191, 191, 0.4);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }

            .client-icon {
                background: rgba(63, 191, 191, 0.1);
                width: 70px;
                height: 70px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
                border: 1px solid rgba(63, 191, 191, 0.2);
                transition: all 0.3s ease;
            }

            .client-card:hover .client-icon {
                background: rgba(63, 191, 191, 0.15);
                transform: scale(1.05);
            }

            .client-title {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: #ffffff;
            }

            .client-description {
                color: #a4c3d2;
                font-size: 0.95rem;
                line-height: 1.5;
            }
        `}</style>
    </div>
);

export default function Home() {
    const { isConnected } = useAccount();

    return (
        <div className="full-bg-wrapper">
            {/* Navigation Header */}
            <NavigationHeader />

            {/* Main content wrapper */}
            <div className="container mx-auto max-w-7xl px-4">
                {/* Hero Section */}
                <div className="hero-section-lg">
                    <div className="hero-content">
                        <div className="logo-container">
                            <Image
                                src="/LoopTrustAnalytics_Logo.png"
                                alt="LoopTrust Logo"
                                width={350}
                                height={350}
                                priority
                            />
                        </div>
                        <h1 className="hero-title">
                            Blockchain Analytics Solutions
                        </h1>
                        <p className="hero-description">
                            Powerful APIs and custom dashboards delivering actionable blockchain insights for
                            businesses, financial institutions, and traders.
                        </p>

                        <div className="hero-cta">
                            <Link href="/services" passHref>
                                <button className="primary-btn">
                                    Explore Our Services
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="glowing-border"></div>
                </div>

                {/* Enterprise Solutions Section */}
                <div className="section solutions-section">
                    <div className="section-header">
                        <h2 className="section-title">Our Enterprise Solutions</h2>
                        <div className="title-decoration"></div>
                    </div>

                    <div className="services-grid">
                        <ServiceCard
                            title="API-Driven On-Chain Data & KPI Dashboards"
                            description="Plug-and-play APIs that help businesses monitor on-chain activity and track performance KPIs. Custom dashboards for blockchain-enhanced business intelligence."
                            iconSrc="/icons/chart-icon-teal.svg"
                            link="/services/api-dashboards"
                        />
                        <div className="glowing-border"></div>
                        <ServiceCard
                            title="Real-Time Risk & Wallet Intelligence"
                            description="Risk score API that flags suspicious wallet behavior. Get detailed reports on address history, clusters, and risk assessment."
                            iconSrc="/icons/security-icon-teal.svg"
                            link="/services/risk-intelligence"
                        />
                        <div className="glowing-border"></div>
                        <ServiceCard
                            title="Market Intel & Trading Analytics"
                            description="Trading dashboards with whale tracker alerts, DEX flow monitoring, and on-chain volume analytics for traders and funds."
                            iconSrc="/icons/trading-icon-teal.svg"
                            link="/services/trading-analytics"
                        />
                        <div className="glowing-border"></div>
                    </div>
                </div>

                {/* Client Types */}
                <div className="section clients-section">
                    <div className="section-header">
                        <h2 className="section-title">Built For Your Business</h2>
                        <div className="title-decoration"></div>
                    </div>

                    <div className="clients-grid">
                        <ClientCard
                            title="DeFi Projects & Protocols"
                            description="Track user growth, monitor smart contract usage, and quantify protocol performance."
                            iconSrc="/icons/defi-icon-teal.svg"
                        />
                        <div className="glowing-border"></div>
                        <ClientCard
                            title="Financial Institutions"
                            description="Enhance compliance workflows with wallet risk intelligence and AML monitoring."
                            iconSrc="/icons/finance-icon-teal.svg"
                        />
                        <div className="glowing-border"></div>
                        <ClientCard
                            title="Web3 Companies"
                            description="Integrate blockchain data into your existing business workflows and KPI dashboards."
                            iconSrc="/icons/web-icon-teal.svg"
                        />
                        <div className="glowing-border"></div>
                        <ClientCard
                            title="Traders & Funds"
                            description="Gain market edge with real-time on-chain insights and whale tracking."
                            iconSrc="/icons/trader-icon-teal.svg"
                        />
                        <div className="glowing-border"></div>
                    </div>
                </div>

                {/* Research Section */}
                <div className="section research-section">
                    <div className="research-panel">
                        <div className="glowing-border"></div>
                        <h2 className="research-title">Research & Intelligence Feed</h2>
                        <p className="research-description">
                            Subscribe to our premium research and news feed for curated insights, trend tracking, and whale behavior reports.
                        </p>
                        <Link href="/research" passHref>
                            <button className="primary-btn">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Add global styles for the tech design */}
            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
                    background-color: #040c18;
                    color: #e6f1ff;
                }

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

                .container {
                    position: relative;
                    z-index: 1;
                    padding: 2rem 0;
                }

                /* Hero Section */
                .hero-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1rem;
                }

                .hero-content {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .logo-container {
                    margin-bottom: 2rem;
                    display: flex;
                    justify-content: center;
                    position: relative;
                }

                .logo-container::after {
                    content: '';
                    position: absolute;
                    width: 180px;
                    height: 180px;
                    border-radius: 50%;
                    background: rgba(63, 191, 191, 0.15);
                    filter: blur(50px);
                    z-index: -1;
                }

                .hero-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(90deg, #ffffff 0%, #b7ecec 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }

                .hero-description {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: #a4c3d2;
                    margin-bottom: 3rem;
                }

                .hero-cta {
                    margin-bottom: 2rem;
                }

                /* Section Styles */
                .section {
                    margin-bottom: 5rem;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    position: relative;
                }

                .section-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: #ffffff;
                    display: inline-block;
                    position: relative;
                }

                .title-decoration {
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(90deg, #3FBFBF 0%, #2D8C8C 100%);
                    margin: 0 auto;
                    border-radius: 2px;
                }

                /* Services Grid */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }

                /* Clients Grid */
                .clients-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                /* Research Panel */
                .research-section {
                    padding: 1rem;
                }

                .research-panel {
                    background: rgba(4, 12, 24, 0.7);
                    border-radius: 15px;
                    padding: 3rem 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(63, 191, 191, 0.2);
                    box-shadow: 0 0 30px rgba(63, 191, 191, 0.1);
                }

                .glowing-border {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #3FBFBF, transparent);
                    animation: glow 4s ease-in-out infinite;
                }

                @keyframes glow {
                    0% { opacity: 0.4; }
                    50% { opacity: 1; }
                    100% { opacity: 0.4; }
                }

                .research-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                }

                .research-description {
                    font-size: 1.2rem;
                    color: #a4c3d2;
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    line-height: 1.6;
                }

                /* Buttons */
                .primary-btn {
                    background: linear-gradient(90deg, #3FBFBF 0%, #2D8C8C 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.75rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(63, 191, 191, 0.3);
                }

                .primary-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: 0.5s;
                }

                .primary-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(63, 191, 191, 0.4);
                }

                .primary-btn:hover::before {
                    left: 100%;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.2rem;
                    }

                    .section-title, .research-title {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
