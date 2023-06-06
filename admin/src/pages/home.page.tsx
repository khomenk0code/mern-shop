import React from "react";
import styled from "styled-components";
import FeaturedInfo from "../components/featured-info.component";
import Chart from "../components/chart.component";
import { userData } from "../data.mock";
import SmallWidget from "../components/small-widget.component";
import LargeWidget from "../components/large-widget.component";

const Home: React.FC = () => {
    return (
        <Container>
            <FeaturedInfo />
            <Chart
                data={userData}
                title="User Analitycs"
                grid
                dataKey="ActiveUsers"
            />
            <HomeWidget>
                <SmallWidget />
                <LargeWidget />
            </HomeWidget>
        </Container>
    );
};

const Container = styled.div`
    flex: 4;
`;

const HomeWidget = styled.div`
    display: flex;
    margin: 20px;
`;

export default Home;
