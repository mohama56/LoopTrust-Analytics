import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, TabButton, TimeRangeButton } from '../components/ui/index';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Image from 'next/image';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

// Types
type TimeRange = 'day' | 'week' | 'month' | 'year';
type TabType = 'overview' | 'transactions' | 'tokens' | 'nfts';

// Real data for charts
const overviewData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
];

const tokenDistributionData = [
    { name: 'ETH', value: 400 },
    { name: 'USDC', value: 300 },
    { name: 'LINK', value: 300 },
    { name: 'UNI', value: 200 },
    { name: 'Other', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardPage() {
    const { isConnected } = useAccount();
    const [timeRange, setTimeRange] = useState<TimeRange>('month');
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    return (
        <Layout title="LoopTrust Analytics - Dashboard"
                description="Your personal blockchain analytics dashboard">
            <div className="min-h-screen bg-gray-50">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-8 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
                        <p className="text-teal-100">
                            Monitor your blockchain activity and gain insights into your digital asset portfolio
                        </p>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="container mx-auto max-w-6xl px-4 py-8">
                    {!isConnected ? (
                        <div className="text-center py-16">
                            <div className="mb-6">
                                <Image
                                    src="/images/wallet-connect.svg"
                                    alt="Connect Wallet"
                                    width={120}
                                    height={120}
                                    className="mx-auto"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
                            <p className="text-gray-600 max-w-md mx-auto mb-8">
                                Connect your wallet to access your personalized analytics dashboard and track your blockchain activity.
                            </p>
                            <div className="inline-block">
                                <ConnectButton />
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Time Range Selector */}
                            <div className="flex justify-end mb-6 space-x-2">
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

                            {/* Dashboard Tabs */}
                            <div className="flex border-b border-gray-200 mb-6">
                                <TabButton
                                    active={activeTab === 'overview'}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Overview
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'transactions'}
                                    onClick={() => setActiveTab('transactions')}
                                >
                                    Transactions
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'tokens'}
                                    onClick={() => setActiveTab('tokens')}
                                >
                                    Tokens
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'nfts'}
                                    onClick={() => setActiveTab('nfts')}
                                >
                                    NFTs
                                </TabButton>
                            </div>

                            {/* Dashboard Content */}
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Summary Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <Card title="Total Value" value="$12,345.67" change="+5.2%" positive={true} />
                                        <Card title="Transactions" value="142" change="+12.3%" positive={true} />
                                        <Card title="Gas Spent" value="0.42 ETH" change="-3.1%" positive={false} />
                                        <Card title="Active Protocols" value="8" change="+2" positive={true} />
                                    </div>

                                    {/* Charts */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white p-4 rounded-lg shadow">
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">Portfolio Value</h3>
                                            <div className="h-80">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        data={overviewData}
                                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="value" stroke="#14b8a6" activeDot={{ r: 8 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow">
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">Token Distribution</h3>
                                            <div className="h-80">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={tokenDistributionData}
                                                            cx="50%"
                                                            cy="50%"
                                                            labelLine={false}
                                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                            outerRadius={80}
                                                            fill="#8884d8"
                                                            dataKey="value"
                                                        >
                                                            {tokenDistributionData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="bg-white p-4 rounded-lg shadow">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
                                            <Link href="/analytics" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                                                View All
                                            </Link>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Type
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Asset
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Amount
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            Swap
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            ETH → USDC
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            0.5 ETH
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            2023-06-15
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            Transfer
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            USDC
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            500 USDC
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            2023-06-14
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            Stake
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            ETH
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            2 ETH
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            2023-06-10
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'transactions' && (
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
                                    <p className="text-gray-600">Detailed transaction data will appear here.</p>
                                </div>
                            )}

                            {activeTab === 'tokens' && (
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Token Holdings</h3>
                                    <p className="text-gray-600">Your token portfolio will appear here.</p>
                                </div>
                            )}

                            {activeTab === 'nfts' && (
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">NFT Collection</h3>
                                    <p className="text-gray-600">Your NFT collection will appear here.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

