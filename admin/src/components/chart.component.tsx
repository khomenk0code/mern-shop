import React from "react";
import styled from "styled-components";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";

export interface ChartData {
    name: string;
    ActiveUsers?: number;
}


export interface ChartProps<T extends ChartData> {
    title: string;
    data: T[];
    dataKey: keyof T | string;
    grid?: boolean;
}

const Chart = ({ title, data, dataKey, grid }: ChartProps<ChartData>) => {

    return (
        <ChartContainer>
            <ChartTitle>{title}</ChartTitle>
            <ResponsiveContainer width="100%" aspect={4}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && (
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

const ChartContainer = styled.div`
    margin: 20px;
    padding: 20px;
    -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const ChartTitle = styled.h3`
    margin-bottom: 20px;
`;

export default Chart;
