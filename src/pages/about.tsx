
import React from 'react';
import Layout from '../components/Layout';

export default function AboutPage() {
    return (
        <Layout title="LoopTrust Analytics - About Us"
                description="Learn about LoopTrust Analytics, our mission, and our approach to blockchain data">
            {/* Page Header - Added faded teal to left side */}
            <div className="page-header bg-gradient-to-r from-teal-100 via-teal-50 to-teal-200 py-16 border-b border-teal-300">
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
            
            {/* Main content */}
            <div className="container mx-auto max-w-6xl px-4 py-16">
                <div className="mb-16">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-teal-400 inline-block drop-shadow-md" style={{textShadow: "0 0 15px rgba(20, 184, 166, 0.5)"}}>
                            Our Mission
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            At LoopTrust Analytics, we believe that blockchain data holds the key to unlocking unprecedented 
                            business intelligence. Our mission is to transform complex on-chain data into actionable insights 
                            that drive better decision-making for enterprises and institutions.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            We&apos;re committed to making blockchain analytics accessible, reliable, and valuable for organizations 
                            at every stage of their blockchain journey - from those exploring the technology to those 
                            building the future of decentralized finance.
                        </p>
                    </div>
                </div>

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
                            <h3 className="text-2xl font-semibold text-teal-600 mb-4 text-center">Enterprise Focus</h3>
                            <p className="text-gray-700 text-base leading-relaxed text-center">
                                We design our solutions specifically for enterprise needs, with robust security,
                                compliance features, and dedicated support.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-teal-400 inline-block drop-shadow-md" style={{textShadow: "0 0 15px rgba(20, 184, 166, 0.5)"}}>
                            Our Team
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            LoopTrust brings together experts in blockchain technology, data science, and enterprise
                            software to create a unique analytics platform that bridges the gap between on-chain data
                            and business intelligence.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Our team combines decades of experience from leading technology companies, financial
                            institutions, and blockchain projects to deliver solutions that meet the highest standards
                            of quality and reliability.
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
