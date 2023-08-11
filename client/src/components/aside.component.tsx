import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    CurrencyExchange,
    FavoriteBorder,
    LineStyle,
    ListAlt,
    MessageOutlined,
    Percent,
    SettingsAccessibilityOutlined,
    SettingsApplications,
    ThreePSharp,
} from "@mui/icons-material";
import { mobile } from "../utils/responsive";

const Aside: React.FC = () => {
    const [hideMenu, setHideMenu] = useState(false);

    const handleToggleMenu = () => {
        setHideMenu(!hideMenu);
    };

    return (
        <SidebarContainer>
            <SidebarWrapper hideMenu={hideMenu}>
                <SidebarMenu>
                    <SidebarTitleContainer
                        justify={hideMenu ? "center" : "flex-end"}
                    >
                        {!hideMenu && <SidebarTitle>Dashboard</SidebarTitle>}
                        <ToggleMenuButton
                            onClick={handleToggleMenu}
                            title={hideMenu ? "Expand" : "Collapse"}
                        >
                            {!hideMenu ? <ArrowLeft /> : <ArrowRight />}
                        </ToggleMenuButton>
                    </SidebarTitleContainer>
                    <SidebarList>
                        <Link to="/">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <LineStyle />
                                </SidebarIcon>
                                {!hideMenu && "Home"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/cabinet/orders">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <ListAlt />
                                </SidebarIcon>
                                {!hideMenu && "Orders"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/cabinet/wishlist">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <FavoriteBorder />
                                </SidebarIcon>
                                {!hideMenu && "Wishlist"}
                            </SidebarListItem>
                        </Link>
                    </SidebarList>
                    <SeparatorLine />
                    <SidebarList>
                        <Link to="/">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <CurrencyExchange />
                                </SidebarIcon>
                                {!hideMenu && "Purchase History"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/cabinet/orders">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <Percent />
                                </SidebarIcon>
                                {!hideMenu && "Discounts and Promotions"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/cabinet/wishlist">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <MessageOutlined />
                                </SidebarIcon>
                                {!hideMenu && "Reviews"}
                            </SidebarListItem>
                        </Link>
                    </SidebarList>
                    <SeparatorLine />
                    <SidebarList>
                        <Link to="/">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <SettingsApplications />
                                </SidebarIcon>
                                {!hideMenu && "Account Settings"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/cabinet/orders">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <ThreePSharp />
                                </SidebarIcon>
                                {!hideMenu && "Support and Live Chat"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/cabinet/wishlist">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <SettingsAccessibilityOutlined />
                                </SidebarIcon>
                                {!hideMenu && "Referral Program"}
                            </SidebarListItem>
                        </Link>
                    </SidebarList>
                    <SeparatorLine />
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.aside`
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
  ${mobile({ display: "none" })}
`;

const SidebarWrapper = styled.div<{ hideMenu: boolean }>`
    padding: 20px;
    color: #555;
`;

const SidebarMenu = styled.div`
    margin-bottom: 10px;
`;

const SidebarTitleContainer = styled.div<{ justify: string }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justify};
`;

const SidebarTitle = styled.h3`
    display: flex;
    justify-content: center;
    font-size: 13px;
    color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
`;

const SidebarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
`;

const ArrowLeft = styled(ChevronLeft)`
    &:hover {
        background-color: #eee;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const ArrowRight = styled(ChevronRight)`
    &:hover {
        background-color: #eee;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const SidebarIcon = styled.span`
    margin-right: 5px;
    font-size: 20px !important;
`;

const ToggleMenuButton = styled.button`
    padding: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const SeparatorLine = styled.div`
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
`;

export default Aside;
