import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    AttachMoney,
    BarChart,
    ChatBubbleOutline,
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
    return (
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarTitle>Dashboard</SidebarTitle>
                    <SidebarList>
                        <Link to="/">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <LineStyle />
                                </SidebarIcon>
                                Home
                            </SidebarListItem>
                        </Link>
                        <SidebarListItem>
                            <SidebarIcon>
                                <Timeline />
                            </SidebarIcon>
                            Analytics
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <TrendingUp />
                            </SidebarIcon>
                            Sales
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarTitle>Quick Menu</SidebarTitle>
                    <SidebarList>
                        <Link to="/users">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <PermIdentity />
                                </SidebarIcon>
                                Users
                            </SidebarListItem>
                        </Link>
                        <Link to="/products">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <Storefront />
                                </SidebarIcon>
                                Products
                            </SidebarListItem>
                        </Link>
                        <Link to="/transactions">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <AttachMoney />
                                </SidebarIcon>
                                Transactions
                            </SidebarListItem>
                        </Link>
                        <Link to="/reports">
                            <SidebarListItem>
                                <SidebarIcon>
                                    <BarChart />
                                </SidebarIcon>
                                Reports
                            </SidebarListItem>
                        </Link>
                    </SidebarList>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarTitle>Notifications</SidebarTitle>
                    <SidebarList>
                        <SidebarListItem>
                            <SidebarIcon>
                                <MailOutline />
                            </SidebarIcon>
                            Mail
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <DynamicFeed />
                            </SidebarIcon>
                            Feedback
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <ChatBubbleOutline />
                            </SidebarIcon>
                            Messages
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarTitle>Staff</SidebarTitle>
                    <SidebarList>
                        <SidebarListItem>
                            <SidebarIcon>
                                <WorkOutline />
                            </SidebarIcon>
                            Manage
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <Timeline />
                            </SidebarIcon>
                            Analytics
                        </SidebarListItem>
                        <SidebarListItem>
                            <SidebarIcon>
                                <Report />
                            </SidebarIcon>
                            Reports
                        </SidebarListItem>
                    </SidebarList>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.aside`
    flex: 1;
    height: calc(100vh - 50px);
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

const SidebarTitle = styled.h3`
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

  &:active:hover {
    rgb(240, 240, 255);
  }
`;

const SidebarIcon = styled.span`
    margin-right: 5px;
    font-size: 20px !important;
`;

export default Sidebar;
