import React from 'react';

type CardProps = {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    className?: string;
};

const Card: React.FC<CardProps> = ({ title, value, change, positive, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
            <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
            <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className={`text-sm font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
            </div>
        </div>
    );
};

export default Card;
