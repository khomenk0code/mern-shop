import React from 'react';
import styled from "styled-components";
import FeaturedInfo from "../components/featured-info.component";
import Chart from "../components/chart.component";
import { userData } from "../data.mock";


const Home: React.FC = () => {



    return (
        <Container>
            <FeaturedInfo/>
            <Chart data={userData} title="User Analitycs" grid dataKey="ActiveUsers"/>
        </Container>
    );
};

const Container = styled.div`
    flex: 4;
`

export default Home;
