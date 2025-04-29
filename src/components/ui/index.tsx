
import React, { ReactNode } from 'react';

// Card component for consistent styling
export const Card = ({
                         children,
                         className = ''
                     }: {
    children: ReactNode,
    className?: string
}) => (
    <div className={`bg-white/80 rounded-lg shadow-md p-6 ${className}`}>
        {children}
    </div>
);

// Tab button component
export const TabButton = ({
                              children,
                              active,
                              onClick
                          }: {
    children: ReactNode,
    active: boolean,
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
            active ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
        {children}
    </button>
);

// Time range button component
export const TimeRangeButton = ({
                                    children,
                                    active,
                                    onClick
                                }: {
    children: ReactNode,
    active: boolean,
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            active ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
        {children}
    </button>
);

// Metric card component
export const MetricCard = ({
                               title,
                               value,
                               change
                           }: {
    title: string,
    value: string,
    change: string
}) => {
    const isPositive = change.startsWith('+');

    return (
        <Card>
            <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
            <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
            </div>
        </Card>
    );
};

// Data table component
export const DataTable = ({
                              headers,
                              data,
                              alignRight = [],
                              highlightFirst = false,
                              colorChange = false
                          }: {
    headers: string[],
    data: string[][],
    alignRight?: boolean[],
    highlightFirst?: boolean,
    colorChange?: boolean
}) => (
    <div className="overflow-x-auto">
        <table className="w-full border-collapse">
            <thead>
            <tr className="border-b border-gray-200">
                {headers.map((header, index) => (
                    <th
                        key={index}
                        className={`py-3 px-4 text-sm font-medium text-gray-500 ${
                            alignRight[index] ? 'text-right' : 'text-left'
                        }`}
                    >
                        {header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-200">
                    {row.map((cell, cellIndex) => {
                        // Determine if this cell needs special styling
                        const isHighlighted = highlightFirst && cellIndex === 0;
                        const isChangeCell = colorChange && cellIndex === row.length - 1;
                        const isPositive = isChangeCell && cell.startsWith('+');
                        const isNegative = isChangeCell && cell.startsWith('-');

                        return (
                            <td
                                key={cellIndex}
                                className={`py-3 px-4 ${
                                    alignRight[cellIndex] ? 'text-right' : 'text-left'
                                } ${
                                    isHighlighted ? 'text-indigo-500' : ''
                                } ${
                                    isPositive ? 'text-green-500 font-medium' : ''
                                } ${
                                    isNegative ? 'text-red-500 font-medium' : ''
                                }`}
                            >
                                {cell}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);
