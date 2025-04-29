import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const Navigation: React.FC = () => {
    const router = useRouter();

    // Helper function to determine if a link is active
    const isActive = (path: string) => router.pathname === path;

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem rem',
            background: 'linear-gradient(90deg, #1A202C 0%, #319795 100%)',
            color: '#fff',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            marginBottom: '2rem'
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Link href="/" passHref>
                    <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <Image
                            src="/LoopTrustAnalytics_Logo.png"
                            alt="LoopTrust Logo"
                            width={150}
                            height={50}
                            priority
                        />
                        {/* Text removed as requested */}
                    </div>
                </Link>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '2rem', fontSize: '1.2rem'}}>
                    <Link href="/" passHref>
                        <span style={{
                            marginRight: '4.5rem',
                            fontWeight: isActive('/') ? 'bold' : 'normal',
                            color: isActive('/') ? '#E2E8F0' : '#A0AEC0',
                            cursor: 'pointer'
                        }}>
                            Home
                        </span>
                    </Link>
                    <Link href="/services" passHref>
                        <span style={{
                            marginRight: '4.5rem',
                            fontWeight: isActive('/services') ? 'bold' : 'normal',
                            color: isActive('/services') ? '#E2E8F0' : '#A0AEC0',
                            cursor: 'pointer'
                        }}>
                            Services
                        </span>
                    </Link>
                    <Link href="/pricing" passHref>
                        <span style={{
                            marginRight: '4.5rem',
                            fontWeight: isActive('/pricing') ? 'bold' : 'normal',
                            color: isActive('/pricing') ? '#E2E8F0' : '#A0AEC0',
                            cursor: 'pointer'
                        }}>
                            Pricing
                        </span>
                    </Link>
                    <Link href="/research" passHref>
                        <span style={{
                            marginRight: '4.5rem',
                            fontWeight: isActive('/research') ? 'bold' : 'normal',
                            color: isActive('/research') ? '#E2E8F0' : '#A0AEC0',
                            cursor: 'pointer'
                        }}>
                            Research
                        </span>
                    </Link>
                    <Link href="/about" passHref>
                        <span style={{
                            fontWeight: isActive('/about') ? 'bold' : 'normal',
                            color: isActive('/about') ? '#E2E8F0' : '#A0AEC0',
                            cursor: 'pointer'
                        }}>
                            About
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;