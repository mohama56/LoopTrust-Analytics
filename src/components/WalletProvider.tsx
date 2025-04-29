'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { polygon } from 'wagmi/chains';
import { ReactNode } from 'react';

// Create a client
const queryClient = new QueryClient();

// Configure wagmi & rainbowkit
const config = getDefaultConfig({
    appName: 'LoopTrust Analytics',
    projectId: 'looptrust-default', // Your WalletConnect project ID
    chains: [polygon],
    ssr: true, // Enable server-side rendering support
});

export default function WalletProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
