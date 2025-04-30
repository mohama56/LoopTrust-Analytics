import React, {useState} from 'react';
import Layout from '../components/Layout';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
    ZAxis
} from 'recharts';

const sampleData = [
    {name: 'January', value: 400},
    {name: 'February', value: 300},
    {name: 'March', value: 500},
    {name: 'April', value: 200},
    {name: 'May', value: 600},
];

const radarData = [
    {subject: 'Blockchain', A: 120, B: 110, fullMark: 150},
    {subject: 'AI', A: 90, B: 100, fullMark: 150},
    {subject: 'ML', A: 140, B: 130, fullMark: 150},
    {subject: 'Analytics', A: 100, B: 80, fullMark: 150},
    {subject: 'Insights', A: 85, B: 90, fullMark: 150},
];

// New DeFi data for additional charts
const defiTVLData = [
    {name: 'Jan', Lending: 4000, DEX: 2400, Yield: 1800},
    {name: 'Feb', Lending: 4500, DEX: 2800, Yield: 2200},
    {name: 'Mar', Lending: 5000, DEX: 3200, Yield: 2600},
    {name: 'Apr', Lending: 4800, DEX: 3500, Yield: 2900},
    {name: 'May', Lending: 5200, DEX: 3800, Yield: 3100},
];

const defiProtocolShare = [
    {name: 'Aave', value: 35},
    {name: 'Uniswap', value: 25},
    {name: 'Curve', value: 15},
    {name: 'Compound', value: 12},
    {name: 'MakerDAO', value: 8},
    {name: 'Others', value: 5},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const defiYieldData = [
    {x: 2, y: 8, z: 300, protocol: 'Aave'},
    {x: 4, y: 12, z: 200, protocol: 'Compound'},
    {x: 1, y: 5, z: 400, protocol: 'Curve'},
    {x: 6, y: 15, z: 150, protocol: 'Yearn'},
    {x: 3, y: 10, z: 250, protocol: 'Convex'},
    {x: 5, y: 7, z: 180, protocol: 'Balancer'},
];

// Market reports data
const marketReports = [
    {
        id: 1,
        title: "Q2 2023 DeFi Market Analysis",
        date: "June 15, 2023",
        author: "Dr. Sarah Chen",
        summary: "Total Value Locked (TVL) in DeFi protocols has increased by 28% this quarter, reaching $52 billion despite market volatility.",
        tags: ["DeFi", "Market Analysis", "TVL"],
        imageUrl: "/images/reports/defi-q2-2023.jpg"
    },
    {
        id: 2,
        title: "Ethereum Layer 2 Scaling Solutions Comparison",
        date: "May 22, 2023",
        author: "Michael Rodriguez",
        summary: "Optimistic rollups and ZK-rollups continue to gain adoption, with transaction volumes on Arbitrum and Optimism increasing by 215% since January.",
        tags: ["Ethereum", "Layer 2", "Scaling"],
        imageUrl: "/images/reports/l2-scaling-2023.jpg"
    },
    {
        id: 3,
        title: "Regulatory Landscape for Digital Assets: Global Perspective",
        date: "April 10, 2023",
        author: "Jennifer Watkins, J.D.",
        summary: "New regulatory frameworks in the EU, Singapore, and Japan are creating clearer guidelines for crypto businesses while the US approach remains fragmented.",
        tags: ["Regulation", "Compliance", "Global"],
        imageUrl: "/images/reports/crypto-regulation-2023.jpg"
    },
    {
        id: 4,
        title: "NFT Market Recovery: Beyond the Hype Cycle",
        date: "March 5, 2023",
        author: "Thomas Lee",
        summary: "After a 76% decline in trading volume, the NFT market is showing signs of maturity with focus shifting to utility and IP rights rather than speculation.",
        tags: ["NFT", "Digital Assets", "Market Trends"],
        imageUrl: "/images/reports/nft-recovery-2023.jpg"
    }
];

// Project insights data
const projectInsights = [
    {
        id: 1,
        project: "Ethereum",
        title: "Post-Merge Performance Analysis",
        date: "June 2, 2023",
        summary: "Six months after The Merge, Ethereum has reduced energy consumption by 99.95% while maintaining network security and decreasing issuance by 90%.",
        metrics: {
            innovation: 92,
            adoption: 88,
            development: 95,
            sustainability: 98
        },
        status: "Strong Growth"
    },
    {
        id: 2,
        project: "Polygon",
        title: "zkEVM Adoption & Performance",
        date: "May 17, 2023",
        summary: "Polygon's zkEVM mainnet has processed over 10 million transactions with 85% lower fees than Ethereum L1 while maintaining EVM equivalence.",
        metrics: {
            innovation: 90,
            adoption: 82,
            development: 88,
            sustainability: 85
        },
        status: "Rapid Expansion"
    },
    {
        id: 3,
        project: "Chainlink",
        title: "CCIP Cross-Chain Infrastructure",
        date: "April 28, 2023",
        summary: "Chainlink's Cross-Chain Interoperability Protocol is enabling secure cross-chain messaging and token transfers across 12 major blockchains.",
        metrics: {
            innovation: 94,
            adoption: 78,
            development: 90,
            sustainability: 82
        },
        status: "Key Infrastructure"
    },
    {
        id: 4,
        project: "Uniswap",
        title: "V3 Concentrated Liquidity Impact",
        date: "March 12, 2023",
        summary: "Uniswap V3's concentrated liquidity model has improved capital efficiency by up to 4000% for LPs while maintaining 62% DEX market share.",
        metrics: {
            innovation: 96,
            adoption: 92,
            development: 88,
            sustainability: 85
        },
        status: "Market Leader"
    }
];

export default function ResearchPage() {
    const [activeTab, setActiveTab] = useState<'charts' | 'reports' | 'insights'>('charts');

    return (
        <Layout title="LoopTrust Analytics - Research & Intelligence"
                description="Expert blockchain research, market insights, and whale tracking for investors and enterprises">
            <div className="relative overflow-hidden bg-gradient-to-b from-gray-700 to-gray-800 pb-20">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#1e293b" fillOpacity="1" d="M0,192L1440,0L1440,320L0,320Z"></path>
                    </svg>
                </div>
                <div className="relative z-10 text-white py-10">
                    <div className="header-content max-w-6xl mx-auto px-4 text-center">
                        <h1 className="page-title text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
                            Research & Intelligence
                        </h1>
                        <div className="title-accent h-1 w-20 mx-auto bg-teal-500 rounded-full"></div>
                        <p className="page-description text-lg md:text-xl mt-4">
                            Our platform combines blockchain analytics with market research to deliver actionable insights.
                            We transform complex on-chain data into strategic intelligence, helping you navigate the digital
                            asset landscape with confidence.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
                <div className="mt-8 bg-gradient-to-r from-teal-800 via-cyan-700 to-teal-800 rounded-xl p-6 border border-teal-400 shadow-xl text-center transform hover:scale-[1.01] transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-yellow-900 text-3xl mr-2">💡</span>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 text-transparent bg-clip-text">Did you know?</h3>
                    </div>

                    <p className="text-gray-100 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto relative">
                        <span className="absolute -left-3 top-0 text-4xl text-teal-400 opacity-60">"</span>
                        Blockchain networks collectively process over <span className="font-bold text-teal-300">10 million transactions daily</span> while using less than 0.05% of global computing resources. The most efficient systems now validate transactions using <span className="font-bold text-teal-300">99.95% less energy</span> than earlier implementations, with costs reduced by over <span className="font-bold text-teal-300">80%</span> in just two years!
                        <span className="absolute -right-3 bottom-0 text-4xl text-teal-400 opacity-60">"</span>
                    </p>

                    <div className="mt-4 flex justify-center">
                        <div className="px-12 py-3 bg-yellow-200 bg-opacity-50 rounded-full text-teal-600 text-lg border border-teal-500 animate-pulse">
                            Powering the Future of Finance
                        </div>
                    </div>
                </div>

                <div
                    className="flex justify-center mb-8 mt-10 bg-gray-900 bg-opacity-70 rounded-xl shadow-lg p-2 max-w-fit mx-auto border border-gray-800">
                    <TabButton
                        active={activeTab === 'charts'}
                        onClick={() => setActiveTab('charts')}
                    >
                        Charts and Analytics
                    </TabButton>
                    <TabButton
                        active={activeTab === 'reports'}
                        onClick={() => setActiveTab('reports')}
                    >
                        Market Reports
                    </TabButton>
                    <TabButton
                        active={activeTab === 'insights'}
                        onClick={() => setActiveTab('insights')}
                    >
                        Project Insights
                    </TabButton>
                </div>

                <div className="bg-gray-900 bg-opacity-80 rounded-xl shadow-lg p-8 border border-gray-800 text-white">
                    {activeTab === 'reports' && (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Market Reports</h2>
                            <p className="text-lg text-center mb-8 max-w-4xl mx-auto text-gray-300">
                                Our expert analysts provide comprehensive reports on blockchain market trends, regulatory developments,
                                and emerging opportunities to help you make informed strategic decisions.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {marketReports.map(report => (
                                    <div key={report.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-cyan-900/20 transition-all duration-300 hover:scale-[1.02]">
                                        <div className="h-40 bg-gradient-to-r from-teal-800 to-blue-900 relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-3xl font-bold text-white">{report.title.split(' ')[0]}</div>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                                                {report.date}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2 text-teal-400">{report.title}</h3>
                                            <p className="text-sm text-gray-300 mb-4">{report.summary}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-400">By {report.author}</div>
                                                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-cyan-600 transition-colors duration-300">
                                                    Read Report
                                                </button>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {report.tags.map(tag => (
                                                    <span key={tag} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl text-lg font-medium hover:from-teal-600 hover:to-cyan-600 transition-colors duration-300 shadow-lg">
                                    View All Reports
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'insights' && (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Project Insights</h2>
                            <p className="text-lg text-center mb-8 max-w-4xl mx-auto text-gray-300">
                                Our in-depth analysis of blockchain projects evaluates technical innovation, adoption metrics,
                                development activity, and long-term sustainability to identify promising technologies.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {projectInsights.map(insight => (
                                    <div key={insight.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-cyan-900/20 transition-all duration-300 hover:scale-[1.02]">
                                        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-white">{insight.project}</h3>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                insight.status === 'Strong Growth' ? 'bg-green-500/20 text-green-300' :
                                                    insight.status === 'Rapid Expansion' ? 'bg-blue-500/20 text-blue-300' :
                                                        insight.status === 'Key Infrastructure' ? 'bg-purple-500/20 text-purple-300' :
                                                            'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                                {insight.status}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-lg font-semibold mb-2 text-teal-400">{insight.title}</h4>
                                            <p className="text-sm text-gray-300 mb-4">{insight.summary}</p>

                                            <div className="mb-4">
                                                <div className="text-sm font-medium text-gray-400 mb-2">Performance Metrics</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {Object.entries(insight.metrics).map(([key, value]) => (
                                                        <div key={key} className="flex items-center">
                                                            <div className="w-24 text-xs text-gray-400 capitalize">{key}:</div>
                                                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                                <div
                                                                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                                                                    style={{width: `${value}%`}}
                                                                ></div>
                                                            </div>
                                                            <div className="ml-2 text-xs text-teal-400">{value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="text-xs text-gray-400">{insight.date}</div>
                                                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors duration-300">
                                                    Full Analysis
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-xl text-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors duration-300 shadow-lg">
                                    Explore All Projects
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'charts' && (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">DeFi Analytics Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center mb-16">
                                {/* Chart 1: Original Line Chart */}
                                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">Token Price Trends</h3>
                                    <LineChart width={400} height={400} data={sampleData}>
                                        <Line type="monotone" dataKey="value" stroke="#38bdf8"/>
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                    </LineChart>
                                </div>

                                {/* Chart 2: New DeFi TVL Area Chart */}
                                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">DeFi TVL by Category</h3>
                                    <AreaChart width={400} height={400} data={defiTVLData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="Lending" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                        <Area type="monotone" dataKey="DEX" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                        <Area type="monotone" dataKey="Yield" stackId="1" stroke="#ffc658" fill="#ffc658" />
                                    </AreaChart>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center mb-16">
                                {/* Chart 3: Original Radar Chart */}
                                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">Technology Metrics</h3>
                                    <RadarChart outerRadius={120} width={400} height={400} data={radarData}>
                                        <PolarGrid/>
                                        <PolarAngleAxis dataKey="subject"/>
                                        <PolarRadiusAxis/>
                                        <Radar name="Metric A" dataKey="A" stroke="#38bdf8" fill="#38bdf8"
                                               fillOpacity={0.6}/>
                                        <Radar name="Metric B" dataKey="B" stroke="#2dd4bf" fill="#2dd4bf"
                                               fillOpacity={0.6}/>
                                        <Legend/>
                                    </RadarChart>
                                </div>

                                {/* Chart 4: New DeFi Protocol Distribution Pie Chart */}
                                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">DeFi Protocol Market Share</h3>
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={defiProtocolShare}
                                            cx={200}
                                            cy={200}
                                            labelLine={false}
                                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={120}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {defiProtocolShare.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
                                {/* Chart 5: New DeFi Risk vs Yield Scatter Chart */}
                                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">DeFi Risk vs Yield Analysis</h3>
                                    <ScatterChart
                                        width={400}
                                        height={400}
                                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    >
                                        <CartesianGrid />
                                        <XAxis type="number" dataKey="x" name="Risk Score" unit="" />
                                        <YAxis type="number" dataKey="y" name="APY" unit="%" />
                                        <ZAxis type="number" dataKey="z" range={[60, 400]} name="TVL" unit="M" />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => {
                                            if (name === 'z') return [`$${value}M`, 'TVL'];
                                            if (name === 'y') return [`${value}%`, 'APY'];
                                            return [value, name];
                                        }} />
                                        <Legend />
                                        <Scatter name="DeFi Protocols" data={defiYieldData} fill="#8884d8" />
                                    </ScatterChart>
                                </div>

                                {/* Chart 6: Original Bar Chart (moved to last position) */}
                                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">Monthly Performance</h3>
                                    <BarChart width={400} height={400} data={sampleData}>
                                        <Bar dataKey="value" fill="#2dd4bf"/>
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

const TabButton = ({
                       children,
                       active,
                       onClick
                   }: {
    children: React.ReactNode,
    active: boolean,
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        className={`px-8 py-4 text-lg font-medium rounded-xl shadow-md transition-transform transform hover:scale-105 mx-2 ${
            active ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white' : 'text-gray-400 bg-gray-800 hover:bg-gray-700'
        }`}
    >
        {children}
    </button>
);
