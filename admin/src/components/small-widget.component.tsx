import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../utils/requestMethods";
import { Link } from "react-router-dom";

export interface Users {
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id: string;
}

const SmallWidget: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users/?new=true");
                setUsers(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getUsers();
    }, []);

    return (
        <Container>
            <Title>New Join Members</Title>
            <List>
                {users.map((user) => (
                    <ListItem key={user._id}>
                        <Image
                            src={
                                user.image ||
                                "https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png"
                            }
                            alt="https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png"
                        />
                        <Users>
                            <Username>{user.username}</Username>
                        </Users>

                        <StyledLink to={`/user/${user._id}`}>
                            <Icon>
                                <Visibility />
                            </Icon>
                            Edit
                        </StyledLink>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
`;

const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    opacity: 0.8;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;

const Users = styled.div`
    display: flex;
    flex-direction: column;
`;

const Username = styled.span`
    font-weight: 600;
`;

const Icon = styled.span`
    font-size: 16px !important;
    margin-right: 5px;
`;

export default SmallWidget;
