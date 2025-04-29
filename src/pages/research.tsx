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
    Radar
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
                    className="flex justify-center mb-8 mt-10 bg-gray-900 bg-opacity-70 rounded-xl shadow-lg p-1 max-w-fit mx-auto border border-gray-800">
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
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Market Reports</h2>
                            <p className="text-sm md:text-base">
                                Analyzing the latest blockchain trends and providing key insights for informed
                                decisions.
                            </p>
                        </div>
                    )}
                    {activeTab === 'insights' && (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Project Insights</h2>
                            <p className="text-sm md:text-base">
                                Diving deep into blockchain projects, uncovering the potential of emerging
                                technologies.
                            </p>
                        </div>
                    )}
                    {activeTab === 'charts' && (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Charts and Analytics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                                <div className="mb-8">
                                    <LineChart width={400} height={400} data={sampleData}>
                                        <Line type="monotone" dataKey="value" stroke="#38bdf8"/>
                                        <CartesianGrid stroke="#ccc"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                    </LineChart>
                                </div>
                                <div className="mb-8">
                                    <BarChart width={400} height={400} data={sampleData}>
                                        <Bar dataKey="value" fill="#2dd4bf"/>
                                        <CartesianGrid stroke="#ccc"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                    </BarChart>
                                </div>
                                <div>
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
        className={`px-5 py-3 rounded-xl font-medium shadow-md transition-transform transform hover:scale-105 ${
            active ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white' : 'text-gray-400 bg-gray-800 hover:bg-gray-700'
        }`}
    >
        {children}
    </button>
);