import React from 'react';

type TabButtonProps = {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    className?: string;
};

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 font-medium border-b-2 ${
                active
                    ? 'text-teal-600 border-teal-600'
                    : 'text-gray-500 border-transparent hover:text-teal-600 hover:border-teal-300'
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default TabButton;
