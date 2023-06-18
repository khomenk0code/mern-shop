import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FeaturedInfo from "../components/featured-info.component";
import Chart from "../components/chart.component";
import SmallWidget from "../components/small-widget.component";
import LargeWidget from "../components/large-widget.component";
import { userRequest } from "../utils/requestMethods";

interface UserData {
    _id: number;
    total: number;
}


const Home: React.FC = () => {
    const [userStats, setUserStats] = useState<any[]>([]);


    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                res.data.map((item: UserData) => {
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], ActiveUsers: item.total },
                    ]);
                });
            } catch (e) {
                console.error(e);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <Container>
            <FeaturedInfo />
            <Chart
                data={userStats}
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
