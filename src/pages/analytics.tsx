import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Layout from '../components/Layout';
import { LOOPTRUST_ABI, LOOPTRUST_ADDRESS } from '../utils/contract';
import { Card, TabButton, TimeRangeButton, MetricCard, DataTable } from '../components/ui/index';
import Image from 'next/image';
import Link from 'next/link';

// Types
type TimeRange = 'day' | 'week' | 'month' | 'year';
type TabType = 'transactions' | 'gas' | 'contracts' | 'tokens';

export default function AnalyticsPage() {
    const { address, isConnected } = useAccount();
    const [hasSubscription, setHasSubscription] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('transactions');
    const [timeRange, setTimeRange] = useState<TimeRange>('week');
    const [isLoading, setIsLoading] = useState(true);
    const [showSampleData, setShowSampleData] = useState(false);

    // Check if user has an active subscription
    const { data: subscriptionData } = useReadContract({
        address: LOOPTRUST_ADDRESS,
        abi: LOOPTRUST_ABI,
        functionName: 'hasActiveSubscription',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        },
    });

    useEffect(() => {
        if (subscriptionData !== undefined) {
            setHasSubscription(!!subscriptionData);
            // Simulate loading data
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        } else if (subscriptionData === undefined && isConnected) {
            // Simulate loading data
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [subscriptionData, isConnected]);

    const renderTabContent = () => {
        if (!isConnected) {
            return <NotConnectedMessage />;
        }

        if (!hasSubscription) {
            return <SubscriptionRequiredMessage showSample={showSampleData} onToggleSample={() => setShowSampleData(!showSampleData)} />;
        }

        if (isLoading) {
            return <LoadingMessage />;
        }

        switch (activeTab) {
            case 'transactions':
                return <TransactionsAnalytics timeRange={timeRange} />;
            case 'gas':
                return <GasAnalytics timeRange={timeRange} />;
            case 'contracts':
                return <ContractsAnalytics timeRange={timeRange} />;
            case 'tokens':
                return <TokensAnalytics timeRange={timeRange} />;
            default:
                return <TransactionsAnalytics timeRange={timeRange} />;
        }
    };

    return (
        <Layout title="LoopTrust Analytics - Detailed Analytics" description="View detailed analytics for your blockchain activities">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

                {(hasSubscription || showSampleData) && isConnected && !isLoading && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex bg-white rounded-lg shadow-sm p-1">
                                <TabButton
                                    active={activeTab === 'transactions'}
                                    onClick={() => setActiveTab('transactions')}
                                >
                                    Transactions
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'gas'}
                                    onClick={() => setActiveTab('gas')}
                                >
                                    Gas Usage
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'contracts'}
                                    onClick={() => setActiveTab('contracts')}
                                >
                                    Contracts
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'tokens'}
                                    onClick={() => setActiveTab('tokens')}
                                >
                                    Tokens
                                </TabButton>
                            </div>

                            <div className="flex bg-white rounded-lg shadow-sm p-1">
                                <TimeRangeButton
                                    active={timeRange === 'day'}
                                    onClick={() => setTimeRange('day')}
                                >
                                    24h
                                </TimeRangeButton>
                                <TimeRangeButton
                                    active={timeRange === 'week'}
                                    onClick={() => setTimeRange('week')}
                                >
                                    7d
                                </TimeRangeButton>
                                <TimeRangeButton
                                    active={timeRange === 'month'}
                                    onClick={() => setTimeRange('month')}
                                >
                                    30d
                                </TimeRangeButton>
                                <TimeRangeButton
                                    active={timeRange === 'year'}
                                    onClick={() => setTimeRange('year')}
                                >
                                    1y
                                </TimeRangeButton>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <MetricCard title="Total Transactions" value="247" change="+12%" />
                            <MetricCard title="Gas Spent (MATIC)" value="32.45" change="-5%" />
                            <MetricCard title="Active Contracts" value="8" change="+2" />
                            <MetricCard title="Token Transfers" value="124" change="+18%" />
                        </div>
                    </>
                )}

                {showSampleData ? (
                    <>
                        {activeTab === 'transactions' && <SampleTransactionsAnalytics timeRange={timeRange} />}
                        {activeTab === 'gas' && <SampleGasAnalytics timeRange={timeRange} />}
                        {activeTab === 'contracts' && <SampleContractsAnalytics timeRange={timeRange} />}
                        {activeTab === 'tokens' && <SampleTokensAnalytics timeRange={timeRange} />}

                        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-lg p-6 text-center">
                            <p className="text-indigo-700 mb-4">This is sample data. Subscribe to access your actual blockchain analytics.</p>
                            <Link href="/pricing" passHref>
                                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                                    View Pricing
                                </button>
                            </Link>
                        </div>
                    </>
                ) : (
                    renderTabContent()
                )}
            </div>
        </Layout>
    );
}

// Message Components
const NotConnectedMessage = () => (
    <Card className="text-center p-12">
        <p className="text-lg mb-8 text-gray-600">
            Connect your wallet to view your blockchain analytics
        </p>
        <ConnectButton />
    </Card>
);

const SubscriptionRequiredMessage = ({ showSample, onToggleSample }: { showSample: boolean, onToggleSample: () => void }) => (
    <Card className="text-center p-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Premium Access Required</h2>
        <p className="text-lg mb-8 text-gray-600">
            You need an active subscription to access detailed analytics of your blockchain activities.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link href="/pricing" passHref>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors">
                    Subscribe Now - Only $7/month
                </button>
            </Link>
            <button
                onClick={onToggleSample}
                className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-md font-bold hover:bg-indigo-50 transition-colors"
            >
                {showSample ? "Hide Sample Data" : "Show Sample Data"}
            </button>
        </div>
    </Card>
);

const LoadingMessage = () => (
    <Card className="text-center p-12">
        <div className="mb-6">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-gray-600">Loading your analytics data...</p>
    </Card>
);

// Sample Analytics Tab Components
const SampleTransactionsAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Transaction Analytics (Sample Data)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Transaction Volume</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/transaction-volume.png"
                            alt="Transaction Volume Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Transaction volume chart for ' + timeRange + '</div>';
                                }
                            }}
                        />
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Transaction Types</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/transaction-types.png"
                            alt="Transaction Types Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Transaction types pie chart</div>';
                                }
                            }}
                        />
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Recent Transactions</h3>
                <DataTable
                    headers={['Hash', 'Type', 'Date', 'Value', 'Gas']}
                    data={[
                        ['0x1a2b...3c4d', 'Transfer', '2025-04-22 14:32', '0.5 MATIC', '0.002 MATIC'],
                        ['0x5e6f...7g8h', 'Contract Call', '2025-04-21 09:17', '0.0 MATIC', '0.005 MATIC'],
                        ['0x9i0j...1k2l', 'Swap', '2025-04-20 17:45', '25 USDC', '0.003 MATIC']
                    ]}
                    alignRight={[false, false, false, true, true]}
                    highlightFirst={true}
                />
            </Card>
        </Card>
    );
};

const SampleGasAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Gas Usage Analytics (Sample Data)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Gas Spent Over Time</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/gas-over-time.png"
                            alt="Gas Usage Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Gas usage chart for ' + timeRange + '</div>';
                                }
                            }}
                        />
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Gas by Transaction Type</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/gas-by-type.png"
                            alt="Gas by Type Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Gas by transaction type chart</div>';
                                }
                            }}
                        />
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Gas Price Trends</h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                    <Image
                        src="/gas-price-trends.png"
                        alt="Gas Price Trends"
                        width={600}
                        height={200}
                        className="mx-auto"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                parent.innerHTML += '<div class="text-gray-400">Gas price trends chart for ' + timeRange + '</div>';
                            }
                        }}
                    />
                </div>
            </Card>
        </Card>
    );
};

const SampleContractsAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Smart Contract Analytics (Sample Data)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Contract Interactions</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/contract-interactions.png"
                            alt="Contract Interactions Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Contract interactions chart for ' + timeRange + '</div>';
                                }
                            }}
                        />
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Most Used Contracts</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/most-used-contracts.png"
                            alt="Most Used Contracts Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Most used contracts chart</div>';
                                }
                            }}
                        />
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Your Smart Contracts</h3>
                <DataTable
                    headers={['Contract', 'Type', 'Interactions', 'Last Used', 'Gas Used']}
                    data={[
                        ['0x1a2b...3c4d', 'ERC-20', '42', '2025-04-15', '0.45 MATIC'],
                        ['0x5e6f...7g8h', 'DEX', '18', '2025-04-14', '1.23 MATIC'],
                        ['0x9i0j...1k2l', 'NFT', '7', '2025-04-10', '0.78 MATIC']
                    ]}
                    alignRight={[false, false, true, false, true]}
                    highlightFirst={true}
                />
            </Card>
        </Card>
    );
};

const SampleTokensAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Token Analytics (Sample Data)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Token Transfers</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <Image
                            src="/token-transfers.png"
                            alt="Token Transfers Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Token transfers chart for ' + timeRange + '</div>';
                                }
                            }}
                        />
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Token Distribution</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center
                    justify-center">
                        <Image
                            src="/token-distribution.png"
                            alt="Token Distribution Chart"
                            width={400}
                            height={200}
                            className="mx-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML += '<div class="text-gray-400">Token distribution pie chart</div>';
                                }
                            }}
                        />
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Your Tokens</h3>
                <DataTable
                    headers={['Token', 'Type', 'Balance', 'Value (USD)', 'Change (24h)']}
                    data={[
                        ['MATIC', 'Native', '125.45', '$150.54', '+2.3%'],
                        ['USDC', 'ERC-20', '250.00', '$250.00', '+0.1%'],
                        ['WETH', 'ERC-20', '0.15', '$450.75', '-1.8%']
                    ]}
                    alignRight={[false, false, true, true, true]}
                    highlightFirst={false}
                    colorChange={true}
                />
            </Card>
        </Card>
    );
};

// Original Analytics Tab Components
const TransactionsAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Transaction Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Transaction Volume</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Transaction volume chart for {timeRange}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Transaction Types</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Transaction types pie chart
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Recent Transactions</h3>
                <DataTable
                    headers={['Hash', 'Type', 'Date', 'Value', 'Gas']}
                    data={[
                        ['0x1a2b...3c4d', 'Transfer', '2025-04-22 14:32', '0.5 MATIC', '0.002 MATIC'],
                        ['0x5e6f...7g8h', 'Contract Call', '2025-04-21 09:17', '0.0 MATIC', '0.005 MATIC'],
                        ['0x9i0j...1k2l', 'Swap', '2025-04-20 17:45', '25 USDC', '0.003 MATIC']
                    ]}
                    alignRight={[false, false, false, true, true]}
                    highlightFirst={true}
                />
            </Card>
        </Card>
    );
};

const GasAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Gas Usage Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Gas Spent Over Time</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Gas usage chart for {timeRange}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Gas by Transaction Type</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Gas by transaction type chart
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Gas Price Trends</h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                    Gas price trends chart for {timeRange}
                </div>
            </Card>
        </Card>
    );
};

const ContractsAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Smart Contract Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Contract Interactions</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Contract interactions chart for {timeRange}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Most Used Contracts</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Most used contracts chart
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Your Smart Contracts</h3>
                <DataTable
                    headers={['Contract', 'Type', 'Interactions', 'Last Used', 'Gas Used']}
                    data={[
                        ['0x1a2b...3c4d', 'ERC-20', '42', '2025-04-15', '0.45 MATIC'],
                        ['0x5e6f...7g8h', 'DEX', '18', '2025-04-14', '1.23 MATIC'],
                        ['0x9i0j...1k2l', 'NFT', '7', '2025-04-10', '0.78 MATIC']
                    ]}
                    alignRight={[false, false, false, true, true]}
                    highlightFirst={true}
                />
            </Card>
        </Card>
    );
};

const TokensAnalytics = ({ timeRange }: { timeRange: TimeRange }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Token Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Token Transfers</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Token transfers chart for {timeRange}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium mb-4 text-gray-700">Token Distribution</h3>
                    <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500">
                        Token distribution pie chart
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-medium mb-4 text-gray-700">Your Tokens</h3>
                <DataTable
                    headers={['Token', 'Type', 'Balance', 'Value (USD)', 'Change (24h)']}
                    data={[
                        ['MATIC', 'Native', '125.45', '$150.54', '+2.3%'],
                        ['USDC', 'ERC-20', '250.00', '$250.00', '+0.1%'],
                        ['WETH', 'ERC-20', '0.15', '$450.75', '-1.8%']
                    ]}
                    alignRight={[false, false, true, true, true]}
                    highlightFirst={false}
                    colorChange={true}
                />
            </Card>
        </Card>
    );
};