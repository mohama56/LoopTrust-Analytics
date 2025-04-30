import React from 'react';
import Layout from '../components/Layout';

export default function AboutPage() {
    return (
        <Layout title="LoopTrust Analytics - About Us"
                description="Learn about LoopTrust Analytics, our mission, and our approach to blockchain data">
            {/* Page Header - Added faded teal to left side */}
            <div className="page-header bg-gradient-to-r from-teal-600 via-teal-100 to-teal-300 py-16 border-b border-teal-700">
                <div className="container mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-5xl font-extrabold text-teal-700 mb-4 relative">
                        About LoopTrust
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600"></span>
                    </h1>
                    <p className="text-xl text-teal-600">
                        Empowering better decisions with blockchain intelligence
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-16">
                {/* Mission Section - Text changed to white against dark background */}
                <section className="mb-20">
                    <div className="mx-auto text-center max-w-4xl bg-gradient-to-br from-teal-700 to-teal-900 p-10 rounded-xl shadow-xl">
                        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-teal-200 inline-block drop-shadow-md" style={{textShadow: "0 0 15px rgba(255, 255, 255, 0.6)"}}>
                            Our Mission
                        </h2>
                        <p className="text-white text-lg leading-relaxed mb-6">
                            LoopTrust Analytics was founded with a simple mission: to make blockchain data
                            accessible, understandable, and actionable for everyone—from individual investors to enterprise
                            organizations.
                        </p>
                        <p className="text-white text-lg leading-relaxed">
                            We believe that transparent, high-quality data is the foundation of the emerging digital
                            asset economy. Our platform combines powerful analytics tools with expert research to help you
                            navigate the complex world of blockchain and cryptocurrency.
                        </p>
                    </div>
                </section>

                {/* Approach Section */}
                <section className="mb-20">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-teal-400 inline-block drop-shadow-md" style={{textShadow: "0 0 15px rgba(20, 184, 166, 0.5)"}}>
                            Our Approach
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="bg-white shadow-lg p-8 rounded-lg border-t-2 border-teal-400">
                            <h3 className="text-2xl font-semibold text-teal-600 mb-4 text-center">Data Integrity</h3>
                            <p className="text-gray-700 text-base leading-relaxed text-center">
                                We source data directly from blockchains and trusted providers, ensuring accuracy and
                                reliability in every insight we deliver.
                            </p>
                        </div>

                        <div className="bg-white shadow-lg p-8 rounded-lg border-t-2 border-teal-400">
                            <h3 className="text-2xl font-semibold text-teal-600 mb-4 text-center">API-First Architecture</h3>
                            <p className="text-gray-700 text-base leading-relaxed text-center">
                                Our platform is built on a flexible API-first approach, allowing seamless integration
                                with your existing systems, dashboards, and workflows.
                            </p>
                        </div>

                        <div className="bg-white shadow-lg p-8 rounded-lg border-t-2 border-teal-400">
                            <h3 className="text-2xl font-semibold text-teal-600 mb-4 text-center">Expert Research Team</h3>
                            <p className="text-gray-700 text-base leading-relaxed text-center">
                                Our team of analysts and researchers provide context and insights that go beyond raw
                                data, helping you make informed strategic decisions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technology Section - Text changed to white against dark background */}
                <section>
                    <div className="mx-auto text-center max-w-4xl bg-gradient-to-br from-teal-700 to-teal-900 p-10 rounded-xl shadow-xl">
                        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-teal-200 inline-block drop-shadow-md" style={{textShadow: "0 0 15px rgba(255, 255, 255, 0.6)"}}>
                            Our Technology
                        </h2>
                        <p className="text-white text-lg leading-relaxed mb-6">
                            Our proprietary technology stack is designed for speed, scalability, and precision. From
                            high-performance data ingestion pipelines to advanced analytics, we deliver actionable
                            intelligence in real time.
                        </p>
                        <p className="text-white text-lg leading-relaxed">
                            Whether you're tracking market trends, performing due diligence, or optimizing your
                            portfolio, LoopTrust provides the tools you need to succeed in the fast-paced world of blockchain.
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
