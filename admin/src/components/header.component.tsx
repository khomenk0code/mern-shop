import React from "react";
import styled from "styled-components";
import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { loginOut } from "../redux/user.slice";
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.currentUser)
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(loginOut());
        navigate("/login");
    };

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <TopLeft>

                    <Link to="/"><Logo>MERN. admin</Logo></Link>
                    <Link to="https://mern-shop-client.vercel.app/">Back to main site</Link>
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
                    <TopbarIconContainer>
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    </TopbarIconContainer>
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
const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e54246;
  }
`;


const HeaderWrapper = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TopLeft = styled.div`
    display: flex;
  align-items: center;
  gap: 20px;
`;

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
