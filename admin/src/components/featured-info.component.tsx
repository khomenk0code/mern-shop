import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from "../utils/requestMethods";

interface IncomeData {
    total: number;
    _id: number;
}

const FeaturedInfo: React.FC = () => {
    const [income, setIncome] = useState<IncomeData[]>([]);
    const [incomePercentage, setIncomePercentage] = useState(0);
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const [monthOrdersCount, setMonthOrdersCount] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get Revenue
                const incomeRes = await userRequest("/orders/income");
                const sortedIncome = incomeRes.data.sort(
                    (a: IncomeData, b: IncomeData) => a._id - b._id
                );
                setIncome(sortedIncome);
                setIncomePercentage(
                    ((sortedIncome[1]?.total - sortedIncome[0]?.total) /
                        sortedIncome[0]?.total) *
                        100
                );

                // Top sales and product details
                const topSalesRes = await userRequest("/orders/topsales");


                const productIds: string[] = topSalesRes.data.map(
                    (sale: any) => sale._id
                );
                const productDetailsRes = await Promise.all(
                    productIds.map((productId) =>
                        userRequest(`/products/find/${productId}`)
                    )
                );
                const productDetails = productDetailsRes.map((res) => res.data);
                setProductDetails(productDetails);

                // Orders per month counter
                const monthOrdersCountRes = await userRequest("/orders/month");
                const sortedOrdersCount = monthOrdersCountRes.data.sort(
                    (a: IncomeData, b: IncomeData) => a._id - b._id
                );
                setMonthOrdersCount(sortedOrdersCount);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        fetchData();
    }, []);

    const arrowProps = Boolean(productDetails.length);

    return (
        <FeaturedContainer>
            <FeaturedItem>
                <FeaturedTitle>Revenue</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>
                        ${income.length > 1 ? income[1]?.total : "...calc"}
                    </FeaturedMoney>
                    <FeaturedMoneyRate>
                        {Math.floor(incomePercentage)} %
                        {arrowProps ? <FeaturedIconUp /> : <FeaturedIconDown />}
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Top sales</FeaturedTitle>
                <FeaturedProductsContainer>
                    <FeaturedProductsList>
                        {productDetails.map((product: any) => (
                            <FeaturedProductName key={product?._id}>
                                {product?.title}
                                <Image src={product.img} />
                            </FeaturedProductName>
                        ))}
                    </FeaturedProductsList>
                </FeaturedProductsContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Average Order Cost</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>
                        $
                        {income.length > 1
                            ? income[1]?.total / monthOrdersCount[1]?.total
                            : "...calc"}
                    </FeaturedMoney>
                    <FeaturedMoneyRate>
                        {Math.floor(
                            ((income[1]?.total / monthOrdersCount[1]?.total -
                                income[0]?.total / monthOrdersCount[0]?.total) /
                                (income[0]?.total /
                                    monthOrdersCount[0]?.total)) *
                                100
                        )}
                        %
                        {arrowProps ? <FeaturedIconDown /> : <FeaturedIconUp />}
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
        </FeaturedContainer>
    );
};

const FeaturedContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const FeaturedItem = styled.div`
    flex: 1;
    margin: 0 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const FeaturedTitle = styled.span`
    font-size: 20px;
`;

const FeaturedProductName = styled.li``;

const Image = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 40px;
`;

const FeaturedMoneyContainer = styled.div`
    margin: 10px 0;
    display: flex;
    align-items: center;
`;

const FeaturedProductsContainer = styled.div`
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const FeaturedProductsList = styled.ol`
    padding-left: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const FeaturedMoney = styled.span`
    font-size: 30px;
    font-weight: 600;
`;

const FeaturedMoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const FeaturedSub = styled.span`
    font-size: 15px;
    color: gray;
`;

const FeaturedIconDown = styled(ArrowDownward)`
    font-size: 14px;
    margin-left: 5px;
    color: red;
`;

const FeaturedIconUp = styled(ArrowUpward)`
    font-size: 14px;
    margin-left: 5px;
    color: green;
`;

export default FeaturedInfo;
