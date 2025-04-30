import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavigationHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isConnected } = useAccount();

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-gray-900/95 backdrop-blur-md py-0.25 shadow-lg' : 'bg-transparent py-0.25'
        }`}>
            {/* Glowing border at the bottom of the header */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-70 glow-animation"></div>

            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-white">LoopTrust<span className="text-teal-400">Analytics</span></span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/services">Services</NavLink>
                    <NavLink href="/research">Research</NavLink>
                    <NavLink href="/pricing">Pricing</NavLink>

                    {isConnected && (
                        <NavLink href="/dashboard">Dashboard</NavLink>
                    )}

                    <div className="ml-4">
                        <ConnectButton />
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
                        <MobileNavLink href="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</MobileNavLink>
                        <MobileNavLink href="/research" onClick={() => setIsMobileMenuOpen(false)}>Research</MobileNavLink>
                        <MobileNavLink href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileNavLink>

                        {isConnected && (
                            <MobileNavLink href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                        )}

                        <div className="pt-2">
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            )}

            {/* CSS for the glowing animation */}
            <style jsx>{`
                .glow-animation {
                    box-shadow: 0 0 10px 1px rgba(45, 212, 191, 0.7);
                    animation: glow 3s ease-in-out infinite;
                }
                
                @keyframes glow {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }
            `}</style>
        </header>
    );
};

// Helper components for navigation links
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors">
        {children}
    </Link>
);

const MobileNavLink: React.FC<{ href: string; onClick: () => void; children: React.ReactNode }> = ({
                                                                                                       href,
                                                                                                       onClick,
                                                                                                       children
                                                                                                   }) => (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors block py-2" onClick={onClick}>
        {children}
    </Link>
);

export default NavigationHeader;
