// Update your contract.ts file first with this ABI:

// Contract address on Polygon (with proper typing for wagmi v2)
export const LOOPTRUST_ADDRESS = '0x2d1D7f03d3F24bd238F4281578Cb64eC7Db49265';

// Contract ABI (Application Binary Interface)
export const LOOPTRUST_ABI = [
    {
        "inputs": [],
        "name": "payWithUSDC", // This is the actual function name in your contract
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" }
        ],
        "name": "hasActiveSubscription",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" }
        ],
        "name": "getSubscriptionEndDate",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const; // Adding 'as const' helps with TypeScript inference