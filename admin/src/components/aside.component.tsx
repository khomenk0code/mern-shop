import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    AttachMoney,
    BarChart,
    ChatBubbleOutline,
    ChevronLeft,
    ChevronRight,
    DynamicFeed,
    LineStyle,
    MailOutline,
    PermIdentity,
    Report,
    Storefront,
    Timeline,
    TrendingUp,
    WorkOutline,
} from "@mui/icons-material";

const Sidebar: React.FC = () => {
    const [hideTitles, setHideTitles] = useState(false);

    const handleToggleTitles = () => {
        setHideTitles(!hideTitles);
    };

    return (
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarTitleContainer
                        justify={hideTitles ? "center" : "flex-end"}
                    >
                        {!hideTitles && <SidebarTitle>Dashboard</SidebarTitle>}
                        <ToggleTitlesButton
                            onClick={handleToggleTitles}
                            title={hideTitles ? "Expand" : "Collapse"}
                        >
                            {!hideTitles ? <ArrowLeft /> : <ArrowRight />}
                        </ToggleTitlesButton>
                    </SidebarTitleContainer>
                    <SidebarList>
                        <Link to="/">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <LineStyle />
                                </SidebarIcon>
                                {!hideTitles && "Home"}
                            </SidebarListItem>
                        </Link>
                        <SidebarListItem>
                            <SidebarIcon>
                                <Timeline />
                            </SidebarIcon>
                            {!hideTitles && "Analytics"}
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <TrendingUp />
                            </SidebarIcon>
                            {!hideTitles && "Sales"}
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
                <SeparatorLine />
                <SidebarMenu>
                    <SidebarTitle>{!hideTitles && "Quick Menu"}</SidebarTitle>
                    <SidebarList>
                        <Link to="/users">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <PermIdentity />
                                </SidebarIcon>
                                {!hideTitles && "Users"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/products">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <Storefront />
                                </SidebarIcon>
                                {!hideTitles && "Products"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/transactions">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <AttachMoney />
                                </SidebarIcon>
                                {!hideTitles && "Transactions"}
                            </SidebarListItem>
                        </Link>
                        <Link to="/reports">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <BarChart />
                                </SidebarIcon>
                                {!hideTitles && "Reports"}
                            </SidebarListItem>
                        </Link>
                    </SidebarList>
                </SidebarMenu>
                <SeparatorLine />
                <SidebarMenu>
                    <SidebarTitle>
                        {!hideTitles && "Notifications"}
                    </SidebarTitle>
                    <SidebarList>
                        <SidebarListItem>
                            <SidebarIcon>
                                <MailOutline />
                            </SidebarIcon>
                            {!hideTitles && "Mail"}
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <DynamicFeed />
                            </SidebarIcon>
                            {!hideTitles && "Feedback"}
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <ChatBubbleOutline />
                            </SidebarIcon>
                            {!hideTitles && "Messages"}
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
                <SeparatorLine />
                <SidebarMenu>
                    <SidebarTitle>{!hideTitles && "Staff"}</SidebarTitle>
                    <SidebarList>
                        <SidebarListItem>
                            <SidebarIcon>
                                <WorkOutline />
                            </SidebarIcon>
                            {!hideTitles && "Manage"}
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <Timeline />
                            </SidebarIcon>
                            {!hideTitles && "Analytics"}
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <Report />
                            </SidebarIcon>
                            {!hideTitles && "Reports"}
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
                <SeparatorLine />
            </SidebarWrapper>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.aside`
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`;

const SidebarWrapper = styled.div`
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

const ToggleTitlesButton = styled.button`
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

export default Sidebar;
