import React from "react";
import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";


type FeaturedIconProps = {
    IsPositive: boolean
}

const FeaturedInfo:React.FC = () => (
    <FeaturedContainer>
        <FeaturedItem>
            <FeaturedTitle>Revenue</FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>$2,415</FeaturedMoney>
                <FeaturedMoneyRate>
                    -11.4 <FeaturedIcon IsPositive={false}><ArrowDownward /></FeaturedIcon>
                </FeaturedMoneyRate>
            </FeaturedMoneyContainer>
            <FeaturedSub>Compared to last month</FeaturedSub>
        </FeaturedItem>
        <FeaturedItem>
            <FeaturedTitle>Sales</FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>$4,415</FeaturedMoney>
                <FeaturedMoneyRate>
                    -1.4 <FeaturedIcon IsPositive={false}><ArrowDownward /></FeaturedIcon>
                </FeaturedMoneyRate>
            </FeaturedMoneyContainer>
            <FeaturedSub>Compared to last month</FeaturedSub>
        </FeaturedItem>
        <FeaturedItem>
            <FeaturedTitle>Cost</FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>$2,225</FeaturedMoney>
                <FeaturedMoneyRate>
                    +2.4 <FeaturedIcon IsPositive={true}><ArrowUpward /></FeaturedIcon>
                </FeaturedMoneyRate>
            </FeaturedMoneyContainer>
            <FeaturedSub>Compared to last month</FeaturedSub>
        </FeaturedItem>
    </FeaturedContainer>
);

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

const FeaturedMoneyContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
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

const FeaturedIcon = styled.span<FeaturedIconProps>`
  font-size: 14px;
  margin-left: 5px;
  color: ${(props) => props.IsPositive === true ? "green" : "red"};
`;




export default FeaturedInfo;