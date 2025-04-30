import React from 'react';

type TimeRangeButtonProps = {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    className?: string;
};

const TimeRangeButton: React.FC<TimeRangeButtonProps> = ({ children, active, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
                active
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default TimeRangeButton;
