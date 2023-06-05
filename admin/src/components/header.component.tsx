import React from "react";
import styled from "styled-components";
import { Language, NotificationsNone, Settings } from "@mui/icons-material";

const HeaderComponent: React.FC = () => (
    <HeaderContainer>
        <HeaderWrapper>
            <TopLeft>
                <Logo>MERN. admin</Logo>
            </TopLeft>
            <TopRight>
                <TopbarIconContainer>
                    <NotificationsNone />
                    <TopIconBadge>2</TopIconBadge>
                </TopbarIconContainer>
                <TopbarIconContainer>
                    <Language />
                    <TopIconBadge>2</TopIconBadge>
                </TopbarIconContainer>
                <TopbarIconContainer>
                    <Settings />
                </TopbarIconContainer>
                <TopAvatar
                    src="https://img.freepik.com/free-photo/gorgeous-white-girl-with-long-wavy-hair-chilling-autumn-day-outdoor-portrait-interested-ginger-female-model-with-cup-coffee_197531-11735.jpg?w=900&t=st=1685967970~exp=1685968570~hmac=0f1a374985bcf6ccf1d9fd1203d1d9e4b0e7ee1efb88d279edf67779151d8439"
                    alt="Admin avatar"
                />
            </TopRight>
        </HeaderWrapper>
    </HeaderContainer>
);

const HeaderContainer = styled.header`
    width: 100%;
    height: 50px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 999;
`;

const HeaderWrapper = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TopLeft = styled.div``;

const Logo = styled.div`
    font-weight: bold;
    font-size: 30px;
    color: darkblue;
    cursor: pointer;
`;

const TopRight = styled.div`
    display: flex;
    align-items: center;
`;

const TopbarIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
/
`;

const TopIconBadge = styled.div`
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: 0;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const TopAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

export default HeaderComponent;
