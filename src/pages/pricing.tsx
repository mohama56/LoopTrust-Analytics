import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { LOOPTRUST_ABI, LOOPTRUST_ADDRESS } from '@/utils/contract';
import NavigationHeader from '../components/NavigationHeader';

export function PricingPage() {
    const { address, isConnected } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

    const { writeContract, data: txHash, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: txHash,
            confirmations: 1,
        });

    // Handle loading state
    React.useEffect(() => {
        setIsLoading(isPending || isConfirming);
    }, [isPending, isConfirming]);

    // Handle successful transaction
    React.useEffect(() => {
        if (isConfirmed) {
            setSubscriptionSuccess(true);
            // Reset success message after 5 seconds
            const timer = setTimeout(() => setSubscriptionSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isConfirmed]);

    const handleSubscribe = () => {
        setError(null);
        writeContract({
            address: LOOPTRUST_ADDRESS,
            abi: LOOPTRUST_ABI,
            functionName: 'payWithUSDC',
        });
    };

    return (
        <div className="full-bg-wrapper">
            <NavigationHeader />
            <div className="container mx-auto max-w-7xl px-4">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="page-title">Simple, Transparent Pricing</h1>
                        <div className="title-accent"></div>
                        <p className="page-description">
                            Access all our powerful blockchain analytics tools for one low monthly price
                        </p>
                    </div>
                </div>


                {/* Pricing Card */}

                <div className="pricing-section">
                    <div className="pricing-card" style={{
                        boxShadow: '0 0 15px rgba(63, 191, 191, 0.6)',
                        border: '1px solid rgba(63, 191, 191, 0.3)',
                        borderRadius: '15px'
                    }}>
                        <div className="pricing-ribbon">
                        </div>

                        <div className="pricing-content">
                            <div className="price">
                                <span className="dollar-sign">$</span>
                                <span className="price-value">TBD</span>
                                <span className="period">/month</span>
                            </div>

                            <div className="pricing-divider"></div>

                            <div className="features-list">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path fill="none" stroke="#3FBFBF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </div>
                                    <span className="feature-text">Full access to all analytics dashboards</span>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path fill="none" stroke="#3FBFBF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </div>
                                    <span className="feature-text">Real-time blockchain data insights</span>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path fill="none" stroke="#3FBFBF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </div>
                                    <span className="feature-text">Smart contract monitoring and analytics</span>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path fill="none" stroke="#3FBFBF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </div>
                                    <span className="feature-text">Wallet risk scoring and intelligence</span>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path fill="none" stroke="#3FBFBF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </div>
                                    <span className="feature-text">Trading analytics and market insights</span>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path fill="none" stroke="#3FBFBF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </div>
                                    <span className="feature-text">Research reports and intelligence feed</span>
                                </div>
                            </div>

                            <div className="subscription-action">
                                {!isConnected ? (
                                    <div className="connect-container">
                                        <p className="connect-text">Connect your wallet to subscribe</p>
                                        <ConnectButton/>
                                    </div>
                                ) : (
                                    <button
                                        className={`subscribe-button ${isLoading ? 'loading' : ''}`}
                                        onClick={handleSubscribe}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="spinner"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            'Subscribe Now'
                                        )}
                                    </button>
                                )}

                                {error && (
                                    <div className="error-message">
                                        <div className="error-icon">
                                            <svg viewBox="0 0 24 24" width="22" height="22">
                                                <path fill="none" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                            </svg>
                                        </div>
                                        <span>{error}</span>
                                    </div>
                                )}

                                {subscriptionSuccess && (
                                    <div className="success-message">
                                        <div className="success-icon">
                                            <svg viewBox="0 0 24 24" width="22" height="22">
                                                <path fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round"
                                                      strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </div>
                                        <span>Subscription successful! Your access is now active.</span>
                                    </div>
                                )}

                                <p className="subscription-note">Billed monthly. Cancel anytime.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enterprise Section */}
                <div className="enterprise-section">
                    <div className="enterprise-card">
                        <div className="card-content">
                            <h2 className="enterprise-title">Need More Power?</h2>
                            <p className="enterprise-description">
                                For enterprise needs, advanced analytics, or custom solutions,
                                contact our team for a tailored package.
                            </p>
                            <button className="enterprise-button">
                                Contact for Enterprise Solutions
                            </button>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <div className="section-header">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <div className="title-accent"></div>
                    </div>

                    <div className="faq-grid">
                        <div className="faq-item">
                            <h3 className="faq-question">How does billing work?</h3>
                            <p className="faq-answer">
                                Billing is handled monthly through USDC payments on the Polygon network.
                                You can cancel your subscription at any time.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">What happens when I subscribe?</h3>
                            <p className="faq-answer">
                                Once your transaction is confirmed, you'll immediately gain access
                                to all premium features for 30 days.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">Which blockchains do you support?</h3>
                            <p className="faq-answer">
                                We currently support Ethereum, Polygon, Binance Smart Chain,
                                Avalanche, and Arbitrum.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">Can I upgrade to an enterprise plan later?</h3>
                            <p className="faq-answer">
                                Yes, you can upgrade to a custom enterprise plan at any time.
                                Contact our team for details.
                            </p>
                        </div>
                        
                        <div className="faq-item">
                            <h3 className="faq-question">How accurate is your trading analytics data?</h3>
                            
                            <p className="faq-answer">
                                Our trading analytics pulls data directly from on-chain sources with near real-time updates.
                                We provide timestamps with all data to ensure transparency.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-question">Do you offer custom business intelligence solutions?</h3>

                            <p className="faq-answer">
                                Yes, we provide tailored business analytics solutions that connect blockchain data
                                with your existing business metrics and KPIs. Contact us for a consultation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global styles */}
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
                
                /* Pricing Section */
                .pricing-section {
                    display: flex;
                    justify-content: center;
                    padding: 1rem;
                    margin-bottom: 4rem;
                }
                
                .pricing-card {
                    background: rgba(4, 12, 24, 0.7);
                    border-radius: 15px;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(63, 191, 191, 0.2);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    max-width: 500px;
                    width: 100%;
                }
                
                .pricing-ribbon {
                    position: absolute;
                    top: 15px;
                    right: -30px;
                    background: linear-gradient(90deg, #3FBFBF 0%, #2D8C8C 100%);
                    color: white;
                    text-align: center;
                    width: 150px;
                    transform: rotate(45deg);
                    padding: 5px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    z-index: 2;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                }
                
                .pricing-content {
                    padding: 3rem 2rem;
                }
                
                .price {
                    text-align: center;
                    margin-bottom: 2rem;
                    position: relative;
                }
                
                .dollar-sign {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #ffffff;
                    vertical-align: top;
                    position: relative;
                    top: 0.5rem;
                }
                
                .price-value {
                    font-size: 5rem;
                    font-weight: 700;
                    background: linear-gradient(90deg, #3FBFBF 0%, #2D8C8C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    line-height: 1;
                }
                
                .period {
                    font-size: 1.2rem;
                    color: #a4c3d2;
                    margin-left: 0.3rem;
                }
                
                .pricing-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(63, 191, 191, 0.2), transparent);
                    margin: 0 auto 2rem;
                    width: 80%;
                }
                
                .features-list {
                    margin-bottom: 2rem;
                }
                
                .feature-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .feature-icon {
                    margin-right: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .feature-text {
                    color: #a4c3d2;
                    font-size: 1.05rem;
                }
                
                .subscription-action {
                    text-align: center;
                }
                
                .connect-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .connect-text {
                    color: #a4c3d2;
                    margin-bottom: 0.5rem;
                }
                
                .subscribe-button {
                    background: linear-gradient(90deg, #3FBFBF 0%, #2D8C8C 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(63, 191, 191, 0.3);
                }
                
                .subscribe-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: 0.5s;
                }
                
                .subscribe-button:hover:not(.loading) {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(63, 191, 191, 0.4);
                }
                
                .subscribe-button:hover:not(.loading)::before {
                    left: 100%;
                }
                
                .subscribe-button.loading {
                    cursor: default;
                    opacity: 0.8;
                }
                
                .spinner {
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top: 3px solid #ffffff;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    animation: spin 1s linear infinite;
                    margin-right: 0.75rem;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .error-message, .success-message {
                    display: flex;
                    align-items: center;
                    margin-top: 1rem;
                    padding: 0.75rem;
                    border-radius: 8px;
                }
                
                .error-message {
                    background: rgba(255, 75, 75, 0.1);
                    border: 1px solid rgba(255, 75, 75, 0.3);
                }
                
                .success-message {
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }
                
                .error-icon, .success-icon {
                    margin-right: 0.75rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .subscription-note {
                    margin-top: 1rem;
                    color: #a4c3d2;
                    font-size: 0.9rem;
                    opacity: 0.8;
                    text-align: center;
                }
                
                /* Included Section */
                .included-section, .faq-section {
                    padding: 1rem;
                    margin-bottom: 4rem;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                
                .section-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: #ffffff;
                    position: relative;
                    display: inline-block;
                }
                
                .included-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }
                
                .included-category {
                    background: rgba(4, 12, 24, 0.7);
                    border: 1px solid rgba(63, 191, 191, 0.15);
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }
                
                .included-category:hover {
                    transform: translateY(-5px);
                    border-color: rgba(63, 191, 191, 0.3);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                
                .category-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                
                .category-icon {
                    width: 60px;
                    height: 60px;
                    background: rgba(63, 191, 191, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    border: 1px solid rgba(63, 191, 191, 0.2);
                }
                
                .category-title {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0;
                }
                
                .category-features {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .category-feature {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #a4c3d2;
                }
                
                .category-feature::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.5rem;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #3FBFBF;
                }
                
                /* Enterprise Section */
                .enterprise-section {
                    padding: 1rem;
                    margin-bottom: 4rem;
                }
                
                .enterprise-card {
                    background: linear-gradient(135deg, rgba(4, 12, 24, 0.8) 0%, rgba(4, 30, 45, 0.8) 100%);
                    border-radius: 15px;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(63, 191, 191, 0.3);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                
                .enterprise-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #3FBFBF, transparent);
                }
                
                .card-content {
                    padding: 3rem 2rem;
                    text-align: center;
                }
                
                .enterprise-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                }
                
                .enterprise-description {
                    font-size: 1.1rem;
                    color: #a4c3d2;
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    line-height: 1.6;
                }
                
                .enterprise-button {
                    background: transparent;
                    color: #3FBFBF;
                    border: 2px solid #3FBFBF;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .enterprise-button:hover {
                    background: rgba(63, 191, 191, 0.1);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(63, 191, 191, 0.2);
                }
                
                /* FAQ Section */
                .faq-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                
                .faq-item {
                    background: rgba(4, 12, 24, 0.7);
                    border: 1px solid rgba(63, 191, 191, 0.15);
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                }
                
                .faq-item:hover {
                    border-color: rgba(63, 191, 191, 0.3);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                
                .faq-question {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #ffffff;
                    position: relative;
                    padding-bottom: 0.75rem;
                }
                
                .faq-question::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 40px;
                    height: 2px;
                    background: #3FBFBF;
                    border-radius: 2px;
                }
                
                .faq-answer {
                    color: #a4c3d2;
                    font-size: 1rem;
                    line-height: 1.6;
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .page-title, .section-title, .enterprise-title {
                        font-size: 2rem;
                    }
                    
                    .price-value {
                        font-size: 4rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default PricingPage;
                                    