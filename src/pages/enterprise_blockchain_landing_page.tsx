return (
    <div className="full-bg-wrapper">
        {/* Navigation Header */}
        <NavigationHeader/>

        {/* Main content wrapper */}
        <div className="container mx-auto max-w-7xl px-4">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="logo-container">
                        <Image
                            src="/LoopTrust_Logo2.png"
                            alt="LoopTrust Logo"
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <h1 className="hero-title">
                        Enterprise Blockchain Analytics Solutions
                    </h1>
                    <p className="hero-description">
                        Powerful APIs and custom dashboards delivering actionable insights for
                        businesses, financial institutions, and traders.
                    </p>

                    <div className="hero-cta">
                        {!isConnected ? (
                            <ConnectButton/>
                        ) : (
                            <Link href="/services" passHref>
                                <button className="primary-btn">
                                    Explore Our Services
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Solutions Section */}
            <div className="section solutions-section">
                <div className="section-header">
                    <h2 className="section-title">Our Enterprise Solutions</h2>
                    <div className="title-decoration"></div>
                </div>

                <div className="services-grid">
                    <ServiceCard
                        title="API-Driven Data & Dashboards"
                        description="Plug-and-play APIs for monitoring on-chain performance and creating custom dashboards."
                        iconSrc="/icons/chart-icon-teal.svg"
                        link="/services/api-dashboards"
                    />
                    <ServiceCard
                        title="Risk & Wallet Intelligence"
                        description="Risk score API to flag wallet behavior, offering detailed address reports."
                        iconSrc="/icons/security-icon-teal.svg"
                        link="/services/risk-intelligence"
                    />
                    <ServiceCard
                        title="Market & Trading Analytics"
                        description="Tools like whale tracker alerts and DEX flow monitoring for advanced trading."
                        iconSrc="/icons/trading-icon-teal.svg"
                        link="/services/trading-analytics"
                    />
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
                        title="DeFi Projects"
                        description="Track growth, monitor contracts, and measure performance easily."
                        iconSrc="/icons/defi-icon-teal.svg"
                    />
                    <ClientCard
                        title="Financial Institutions"
                        description="Enhanced compliance with wallet risk intelligence and AML monitoring."
                        iconSrc="/icons/finance-icon-teal.svg"
                    />
                    <ClientCard
                        title="Web3 Companies"
                        description="Seamless integration of blockchain data into workflows and dashboards."
                        iconSrc="/icons/web-icon-teal.svg"
                    />
                    <ClientCard
                        title="Traders & Funds"
                        description="Real-time insights for competitive advantage and strategic decisions."
                        iconSrc="/icons/trader-icon-teal.svg"
                    />
                </div>
            </div>

            {/* Research Section */}
            <div className="section research-section">
                <div className="research-panel">
                    <div className="glowing-border"></div>
                    <h2 className="research-title">Intelligence Feed</h2>
                    <p className="research-description">
                        Access premium research, tracking trends, and on-chain activity.
                    </p>
                    <Link href="/research" passHref>
                        <button className="primary-btn">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);