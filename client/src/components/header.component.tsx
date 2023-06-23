import React from "react";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@mui/material";
import { FavoriteBorder, ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../utils/responsive";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginOut } from "../redux/user.slice";

const Header: React.FC = () => {
    const quantity = useAppSelector((state: any) => state.cart.quantity);
    const user = useAppSelector((state: any) => state.user.currentUser);
    const wishlist = useAppSelector((state: any) => state.wishlist.products);
    const dispatch = useAppDispatch();


    const handleLogout = () => {
        dispatch(loginOut());
    };

    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>EN</Language>
                        <SearchContainer>
                            <Input placeholder="Search" />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ color: "gray" }}
                            />
                        </SearchContainer>
                    </Left>
                    <Center>
                        <Logo>
                            <StyledLink to="/">MERN.</StyledLink>
                        </Logo>
                    </Center>
                    <Right>
                        {user?.isAdmin ? (
                            <MenuItem>
                                <StyledLink to="https://mern-shop-admin.vercel.app/login">
                                    Admin dashboard
                                </StyledLink>
                            </MenuItem>
                        ) : null}
                        {user ? (
                            <>
                                <MenuItem>
                                    <Badge
                                        badgeContent={wishlist.length}
                                        color="primary"
                                    >
                                        <StyledLink to="/cabinet/wishlist">
                                            <FavoriteBorder />
                                        </StyledLink>
                                    </Badge>
                                </MenuItem>
                                <MenuItem>
                                    <Badge
                                        badgeContent={quantity}
                                        color="primary"
                                    >
                                        <StyledLink to="/cart">
                                            <ShoppingCartOutlined />
                                        </StyledLink>
                                    </Badge>
                                </MenuItem>
                                <MenuItem>

                                    <LogoutButton onClick={handleLogout}>
                                        Logout
                                    </LogoutButton>
                                </MenuItem>

                            </>
                        ) : (
                            <>
                                <MenuItem>
                                    <StyledLink to="/register">
                                        Register
                                    </StyledLink>
                                </MenuItem>
                                <MenuItem>
                                    <StyledLink to="/login">Sign In</StyledLink>
                                </MenuItem>
                            </>
                        )}
                    </Right>
                </Wrapper>
            </Container>
        </div>
    );
};

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  margin: 0 10px;
`;

const Container = styled.header`
  height: 65px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
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

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginLeft: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export default Header;
