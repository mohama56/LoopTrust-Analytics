import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { LOOPTRUST_ABI, LOOPTRUST_ADDRESS } from '../utils/contract';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

type AnalyticsData = {
  totalUsers: number;
  activeSubscriptions: number;
  averageDuration: number;
};

// Mock data - replace with real data from your API or contract
const mockData: AnalyticsData = {
  totalUsers: 1245,
  activeSubscriptions: 782,
  averageDuration: 24, // days
};

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // Check if user has an active subscription
  const { data: hasSub, isLoading } = useReadContract({
    address: LOOPTRUST_ADDRESS as `0x${string}`,
    abi: LOOPTRUST_ABI,
    functionName: 'hasActiveSubscription',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Redirect to home if not connected or no subscription
  React.useEffect(() => {
    if (!isConnected) {
      router.push('/');
    } else if (hasSub === false && !isLoading) {
      router.push('/pricing');
    }
  }, [isConnected, hasSub, isLoading, router]);

  if (!isConnected || hasSub === false) {
    return (
        <Layout title="LoopTrust Analytics - Dashboard" description="Your analytics dashboard">
          <div className="text-center p-12">
            <div className="mb-6">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </Layout>
    );
  }

  return (
      <Layout title="LoopTrust Analytics - Dashboard" description="Your analytics dashboard">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Analytics Dashboard</h1>
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium">
              Premium Access Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
                title="Total Transactions"
                value="247"
                change="+12%"
                isPositive={true}
            />
            <DashboardCard
                title="Gas Spent (MATIC)"
                value="32.45"
                change="-5%"
                isPositive={false}
            />
            <DashboardCard
                title="Smart Contract Interactions"
                value="89"
                change="+23%"
                isPositive={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Activity Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <Image
                    src="/chart-placeholder.png"
                    alt="Activity Chart"
                    width={400}
                    height={200}
                    className="mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML += '<div class="text-gray-400">Transaction activity chart</div>';
                      }
                    }}
                />
              </div>
            </div>

            {/* Wallet Overview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Wallet Overview</h2>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <Image
                    src="/wallet-placeholder.png"
                    alt="Wallet Overview"
                    width={400}
                    height={200}
                    className="mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML += '<div class="text-gray-400">Wallet asset distribution</div>';
                      }
                    }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Hash</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Value</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Gas</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-indigo-500">0x1a2b...3c4d</td>
                  <td className="py-3 px-4">Transfer</td>
                  <td className="py-3 px-4">2025-04-22 14:32</td>
                  <td className="py-3 px-4 text-right">0.5 MATIC</td>
                  <td className="py-3 px-4 text-right">0.002 MATIC</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-indigo-500">0x5e6f...7g8h</td>
                  <td className="py-3 px-4">Contract Call</td>
                  <td className="py-3 px-4">2025-04-21 09:17</td>
                  <td className="py-3 px-4 text-right">0.0 MATIC</td>
                  <td className="py-3 px-4 text-right">0.005 MATIC</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-indigo-500">0x9i0j...1k2l</td>
                  <td className="py-3 px-4">Swap</td>
                  <td className="py-3 px-4">2025-04-20 17:45</td>
                  <td className="py-3 px-4 text-right">25 USDC</td>
                  <td className="py-3 px-4 text-right">0.003 MATIC</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <a href="/analytics" className="text-indigo-600 font-medium text-sm hover:text-indigo-700">
                View All Transactions →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickLinkCard
                title="Detailed Analytics"
                description="Explore transaction history, gas usage, and more"
                link="/analytics"
                icon="📊"
            />
            <QuickLinkCard
                title="Research & Insights"
                description="Access market reports and whale tracking data"
                link="/research"
                icon="🔍"
            />
            <QuickLinkCard
                title="Account"
                description="Manage your subscription and settings"
                link="/pricing"
                icon="👤"
            />
          </div>
        </div>
      </Layout>
  );
}

type DashboardCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
};

function DashboardCard({ title, value, change, isPositive }: DashboardCardProps) {
  return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          <span className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        </div>
      </div>
  );
}

type QuickLinkCardProps = {
  title: string;
  description: string;
  link: string;
  icon: string;
};

function QuickLinkCard({ title, description, link, icon }: QuickLinkCardProps) {
  return (
      <Link href={link}>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
          <div className="text-2xl mb-3">{icon}</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
  );
}