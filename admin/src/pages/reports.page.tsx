import React from "react";
import styled from "styled-components";
import Chart from "../components/chart.component";
import FeaturedInfo from "../components/featured-info.component";
import { categoryStatsData, newUsersData, salesData } from "../data.mock";

const Reports = () => {
    return (
        <ReportsContainer>
            <FeaturedInfo />
            <ChartContainer>
                <Chart title="Sales" data={salesData} dataKey="Sales" grid />
            </ChartContainer>
            <ChartContainer>
                <Chart
                    title="New Users"
                    data={newUsersData}
                    dataKey="NewUsers"
                    grid
                />
            </ChartContainer>
            <ChartContainer>
                <Chart
                    title="Category Statistics"
                    data={categoryStatsData}
                    dataKey="Count"
                    grid
                />
            </ChartContainer>
        </ReportsContainer>
    );
};

const ReportsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ChartContainer = styled.div``;

export default Reports;
