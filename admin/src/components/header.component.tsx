import React, { useEffect } from "react";
import styled from "styled-components";
import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";

const HeaderComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.currentUser)

    useEffect(() => {

    },)

    return (
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
                    Loged as {user.username}
                    <TopAvatar
                        src={user.image}
                        alt="Admin avatar"
                    />
                </TopRight>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

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
