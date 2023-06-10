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
    const [averagePercentage, setAveragePercentage] = useState(0);
    const [topSales, setTopSales] = useState<any[]>([]);
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const [monthOrdersCount, setMonthOrdersCount] = useState<any[]>([]);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest("/orders/income");
                const sortedIncome = res.data.sort((a: IncomeData, b: IncomeData) => a._id - b._id);
                setIncome(sortedIncome);
                setIncomePercentage(((sortedIncome[1]?.total - sortedIncome[0]?.total) / sortedIncome[0]?.total) * 100);
            } catch (e) {
                console.error(e);
            }
        };
        getIncome();
    }, []);

    useEffect(() => {
        const getTopSales = async () => {
            try {
                const res = await userRequest("/orders/topsales");
                setTopSales(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getTopSales();
    }, []);


    useEffect(() => {
        const getProductDetails = async (productIds: string[]) => {
            try {
                const productDetails = [];


                for (const productId of productIds) {
                    const res = await userRequest(`/products/find/${productId}`);
                    productDetails.push(res.data);

                }

                setProductDetails(productDetails)
            } catch (e) {
                console.error(e);
            }
        };



        const productIds: string[] = topSales.map((sale: any) => sale._id);
        getProductDetails(productIds);

    }, [topSales]);


    useEffect(() => {
        const getOrdersCurrentMonth = async () => {
            try {
                const res = await userRequest("/orders/month");
                const sortedAverage = res.data.sort((a: IncomeData, b: IncomeData) => a._id - b._id);
                setMonthOrdersCount(sortedAverage);
            } catch (e) {
                console.error(e);
            }
        };
        getOrdersCurrentMonth();
    }, []);


    useEffect(() => {
        if (income.length > 0 && monthOrdersCount.length > 0) {
            setAveragePercentage(income[1]?.total / monthOrdersCount[1]?.total);
        }
    }, [income, monthOrdersCount]);




    const arrowProps = Boolean(averagePercentage);

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
                    {productDetails && productDetails.map((product) => (
                            <FeaturedProductName key={product?._id}>{product?.title}<Image src={product.img}/></FeaturedProductName>

                    ))}

                        </FeaturedProductsList>
                </FeaturedProductsContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Average Order Cost</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{averagePercentage}</FeaturedMoney>
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
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;

const FeaturedProductName = styled.li`
`;

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
