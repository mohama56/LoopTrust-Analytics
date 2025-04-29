import React from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import NavigationHeader from '../components/NavigationHeader';

export default function ServicesPage() {
    const { isConnected } = useAccount();

    return (
        <div className="full-bg-wrapper">
            {/* Navigation Header */}
            <NavigationHeader />

            <div className="container mx-auto max-w-7xl px-4">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="page-title">Our Analytics Services</h1>
                        <div className="title-accent"></div>
                        <p className="page-description">
                            Powerful blockchain analytics tools to help you make data-driven decisions
                        </p>
                    </div>
                </div>

                {/* API Dashboards Service */}
                <ServiceSection
                    id="api-dashboards"
                    title="On-Chain Data & KPI Dashboards"
                    description="Access comprehensive blockchain data with custom dashboards for tracking key performance indicators."
                    iconSrc="/icons/chart-icon-teal.svg"
                    features={[
                        "Real-time blockchain data integration",
                        "Custom KPI dashboards for performance tracking",
                        "Historical data analysis with custom time frames",
                        "Transaction monitoring and insights",
                        "Automated alerts based on custom triggers",
                        "Export capabilities for reporting"
                    ]}
                    useCases={[
                        {
                            title: "DeFi Projects",
                            description: "Track protocol usage, TVL changes, and user growth metrics."
                        },
                        {
                            title: "Web3 Companies",
                            description: "Monitor smart contract interactions and blockchain operations."
                        },
                        {
                            title: "Traditional Businesses",
                            description: "Integrate blockchain payment data with existing BI tools."
                        }
                    ]}
                />

                {/* Risk Intelligence Service */}
                <ServiceSection
                    id="risk-intelligence"
                    title="Risk & Wallet Intelligence"
                    description="Analyze wallet behavior and assess risks for improved security and compliance."
                    iconSrc="/icons/security-icon-teal.svg"
                    features={[
                        "Wallet risk scoring using proprietary algorithms",
                        "Address profiling and entity identification",
                        "Transaction pattern analysis for fraud detection",
                        "Wallet clustering to identify related entities",
                        "Historical transaction analysis",
                        "Risk alerts for suspicious activities"
                    ]}
                    useCases={[
                        {
                            title: "Financial Services",
                            description: "Enhance KYC/AML workflows with detailed wallet intelligence."
                        },
                        {
                            title: "Exchanges",
                            description: "Screen wallets for suspicious activity before processing transactions."
                        },
                        {
                            title: "Security Teams",
                            description: "Monitor for potential threats and unauthorized activities."
                        }
                    ]}
                />

                {/* Trading Analytics Service */}
                <ServiceSection
                    id="trading-analytics"
                    title="Market Intel & Trading Analytics"
                    description="Get valuable market insights and trading signals to improve your investment decisions."
                    iconSrc="/icons/trading-icon-teal.svg"
                    features={[
                        "Whale wallet tracking and movement alerts",
                        "DEX flow monitoring and liquidity analysis",
                        "Volume trend visualization and analysis",
                        "Smart money tracking across multiple chains",
                        "Price impact assessment for large transactions",
                        "Historical performance data for strategy development"
                    ]}
                    useCases={[
                        {
                            title: "Traders",
                            description: "Gain market edge with real-time on-chain insights and whale tracking."
                        },
                        {
                            title: "Investment Firms",
                            description: "Incorporate on-chain data into investment strategies."
                        },
                        {
                            title: "Market Analysts",
                            description: "Understand market trends through blockchain data."
                        }
                    ]}
                />

                {/* Research Service */}
                <ServiceSection
                    id="research"
                    title="Research & Market Insights"
                    description="Access curated research, market trends, and expert analysis on blockchain projects."
                    iconSrc="/icons/research-icon-teal.svg"
                    features={[
                        "Regular market reports and trends analysis",
                        "Project research and insights",
                        "Narrative tracking and theme identification",
                        "Whale behavior reports",
                        "Market sentiment analysis",
                        "Educational content on blockchain concepts"
                    ]}
                    useCases={[
                        {
                            title: "Investors",
                            description: "Stay informed on market trends and project developments."
                        },
                        {
                            title: "Business Strategists",
                            description: "Understand blockchain trends for strategic planning."
                        },
                        {
                            title: "Project Teams",
                            description: "Track competitor analysis and industry movements."
                        }
                    ]}
                />

                {/* CTA */}
                <div className="cta-section">
                    <div className="cta-content">
                        <div className="glow-line"></div>
                        <h2 className="cta-title">Ready to unlock the power of blockchain data?</h2>
                        <p className="cta-description">
                            Connect your wallet to access our powerful analytics platform
                        </p>

                        {!isConnected ? (
                            <div className="cta-button-container">
                                <ConnectButton />
                            </div>
                        ) : (
                            <Link href="/dashboard" passHref>
                                <button className="primary-btn glow">
                                    Go to Dashboard
                                </button>
                            </Link>
                        )}
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
                
                /* Page Header */
                .page-header {
                    padding: 4rem 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                
                .header-content {
                    text-align: center;
                    max-width: 800px;
                    position: relative;
                }
                
                .page-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                    position: relative;
                    display: inline-block;
                }
                
                .title-accent {
                    width: 100px;
                    height: 4px;
                    background: linear-gradient(90deg, #3FBFBF 0%, transparent 100%);
                    margin: 0 auto 1.5rem;
                    border-radius: 2px;
                }
                
                .page-description {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: #a4c3d2;
                    margin-bottom: 2rem;
                }
                
                /* CTA Section */
                .cta-section {
                    margin: 5rem 0;
                    padding: 1rem;
                }
                
                .cta-content {
                    background: rgba(4, 12, 24, 0.7);
                    border-radius: 15px;
                    padding: 3rem 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(63, 191, 191, 0.2);
                    box-shadow: 0 0 30px rgba(63, 191, 191, 0.1);
                }
                
                .glow-line {
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
                
                .cta-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                }
                
                .cta-description {
                    font-size: 1.2rem;
                    color: #a4c3d2;
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    line-height: 1.8;
                }
                
                .cta-button-container {
                    display: flex;
                    justify-content: center;
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
                }
                
                .primary-btn.glow {
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
                }
                
                .primary-btn.glow:hover {
                    box-shadow: 0 8px 20px rgba(63, 191, 191, 0.4);
                }
                
                .primary-btn:hover::before {
                    left: 100%;
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .page-title, .cta-title {
                        font-size: 2.2rem;
                    }
                }
            `}</style>
        </div>
    );
}

// Helper Component
const ServiceSection = ({
                            id,
                            title,
                            description,
                            iconSrc,
                            features,
                            useCases
                        }: {
    id: string,
    title: string,
    description: string,
    iconSrc: string,
    features: string[],
    useCases: { title: string, description: string }[]
}) => (
    <div id={id} className="service-section">
        <div className="service-panel">
            <div className="grid-layout">
                <div className="service-details">
                    <div className="service-icon">
                        <Image
                            src={iconSrc}
                            alt={title}
                            width={80}
                            height={80}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                    <h2 className="service-title">{title}</h2>
                    <p className="service-description">{description}</p>

                    <h3 className="features-title">Key Features</h3>
                    <ul className="features-list">
                        {features.map((feature, index) => (
                            <li key={index} className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Link href={`/pricing#${id}`} passHref>
                        <button className="primary-btn">
                            Get Access
                        </button>
                    </Link>
                </div>

                <div className="visualization-container">
                    <div className="tech-grid"></div>
                    <div className="service-image-area">
                        <Image
                            src={`/service-images/${id}.png`}
                            alt={title}
                            width={400}
                            height={250}
                            className="mx-auto rounded"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML = `
                                        <div class="placeholder-viz">
                                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#3FBFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M14.5 4.5v2c0 1.1.9 2 2 2h2M10 13l-2 2 2 2M14 13l2 2-2 2" stroke="#3FBFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                            <div class="placeholder-text">${title}</div>
                                        </div>
                                    `;
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="use-cases-section">
                <h3 className="use-cases-title">Use Cases</h3>
                <div className="use-cases-grid">
                    {useCases.map((useCase, index) => (
                        <div key={index} className="use-case-card">
                            <h4 className="use-case-title">{useCase.title}</h4>
                            <p className="use-case-description">{useCase.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <style jsx>{`
            .service-section {
                margin-bottom: 4rem;
                padding: 1rem;
            }
            
            .service-panel {
                background: rgba(4, 12, 24, 0.7);
                border-radius: 15px;
                overflow: hidden;
                position: relative;
                border: 1px solid rgba(63, 191, 191, 0.15);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(10px);
            }
            
            .grid-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                padding: 2rem;
            }
            
            @media (max-width: 1024px) {
                .grid-layout {
                    grid-template-columns: 1fr;
                }
            }
            
            .service-details {
                padding: 1rem;
                display: flex;
                flex-direction: column;
            }
            
            .service-icon {
                background: rgba(63, 191, 191, 0.1);
                width: 110px;
                height: 110px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5rem;
                border: 1px solid rgba(63, 191, 191, 0.3);
                position: relative;
            }
            
            .service-icon::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                border: 1px dashed rgba(63, 191, 191, 0.5);
                opacity: 0.5;
            }
            
            .service-title {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: #ffffff;
                position: relative;
                display: inline-block;
            }
            
            .service-title::after {
                content: '';
                position: absolute;
                bottom: -0.5rem;
                left: 0;
                width: 60px;
                height: 3px;
                background: linear-gradient(90deg, #3FBFBF 0%, transparent 100%);
                border-radius: 2px;
            }
            
            .service-description {
                font-size: 1.1rem;
                line-height: 1.7;
                color: #a4c3d2;
                margin-bottom: 2rem;
            }
            
            .features-title, .use-cases-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: #ffffff;
            }
            
            .features-list {
                list-style: none;
                padding: 0;
                margin: 0 0 2rem;
            }
            
            .feature-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 0.75rem;
                color: #a4c3d2;
            }
            
            .feature-icon {
                color: #3FBFBF;
                margin-right: 0.75rem;
                font-weight: bold;
            }
            
            .visualization-container {
                position: relative;
                min-height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border-radius: 12px;
                background: rgba(4, 12, 24, 0.5);
                border: 1px solid rgba(63, 191, 191, 0.2);
            }
            
            .tech-grid {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    linear-gradient(to right, rgba(63, 191, 191, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(63, 191, 191, 0.1) 1px, transparent 1px);
                background-size: 20px 20px;
                background-position: center;
                opacity: 0.5;
            }
            
            .service-image-area {
                position: relative;
                z-index: 1;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1.5rem;
            }
            
            .placeholder-viz {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: rgba(63, 191, 191, 0.7);
            }
            
            .placeholder-text {
                margin-top: 1rem;
                font-size: 1.1rem;
                text-align: center;
            }
            
            .use-cases-section {
                padding: 2rem;
                border-top: 1px solid rgba(63, 191, 191, 0.15);
            }
            
            .use-cases-title {
                text-align: center;
                margin-bottom: 2rem;
                position: relative;
                display: inline-block;
                left: 50%;
                transform: translateX(-50%);
            }
            
            .use-cases-title::after {
                content: '';
                position: absolute;
                bottom: -0.5rem;
                left: 0;
                width: 80%;
                height: 2px;
                left: 10%;
                background: linear-gradient(90deg, transparent, #3FBFBF, transparent);
                border-radius: 2px;
            }
            
            .use-cases-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }
            
            .use-case-card {
                background: rgba(4, 12, 24, 0.5);
                border: 1px solid rgba(63, 191, 191, 0.15);
                border-radius: 10px;
                padding: 1.5rem;
                transition: all 0.3s ease;
            }
            
            .use-case-card:hover {
                transform: translateY(-5px);
                border-color: rgba(63, 191, 191, 0.3);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .use-case-title {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 0.75rem;
                color: #ffffff;
            }
            
            .use-case-description {
                color: #a4c3d2;
                font-size: 0.95rem;
                line-height: 1.5;
            }
        `}</style>
    </div>
);

