import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    CalendarMonth,
    LocationOn,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@mui/icons-material";

const User: React.FC = () => {
    return (
        <UserContainer>
            <UserTitleContainer>
                <h1>Edit User</h1>
                <Link to="/user/add">
                    <UserAddButton>Create</UserAddButton>
                </Link>
            </UserTitleContainer>
            <Wrapper>
                <UserShow>
                    <UserShowTop>
                        <UserShowImg
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <UserShowTopTitle>
                            <UserShowUsername>Anna Becker</UserShowUsername>
                            <UserShowUserTitle>
                                Software Engineer
                            </UserShowUserTitle>
                        </UserShowTopTitle>
                    </UserShowTop>
                    <UserShowBottom>
                        <UserShowTitle>Account Details</UserShowTitle>
                        <UserShowInfo>
                            <UserShowIcon>
                                <PermIdentity />
                            </UserShowIcon>
                            <UserShowInfoTitle>annabeck99</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <UserShowIcon>
                                <CalendarMonth />
                            </UserShowIcon>
                            <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowTitle>Contact Details</UserShowTitle>
                        <UserShowInfo>
                            <UserShowIcon>
                                <PhoneAndroid />
                            </UserShowIcon>
                            <UserShowInfoTitle>+1 123 456 67</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <UserShowIcon>
                                {" "}
                                <MailOutline />
                            </UserShowIcon>
                            <UserShowInfoTitle>
                                annabeck99@gmail.com
                            </UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <UserShowIcon>
                                <LocationOn />
                            </UserShowIcon>
                            <UserShowInfoTitle>
                                New York | USA
                            </UserShowInfoTitle>
                        </UserShowInfo>
                    </UserShowBottom>
                </UserShow>
                <UserUpdate>
                    <UserUpdateTitle>Edit</UserUpdateTitle>
                    <UserUpdateForm>
                        <UserUpdateLeft>
                            <UserUpdateItem>
                                <label>Username</label>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="annabeck99"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <label>Full Name</label>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="Anna Becker"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <label>Email</label>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="annabeck99@gmail.com"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <label>Phone</label>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="+1 123 456 67"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <label>Address</label>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="New York | USA"
                                />
                            </UserUpdateItem>
                        </UserUpdateLeft>
                        <UserUpdateRight>
                            <UserUpdateUpload>
                                <UserUpdateImg
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress

    &cs=tinysrgb&dpr=2&w=500"
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <UserUpdateIcon />
                                </label>
                                <File type="file" id="file" />
                            </UserUpdateUpload>
                            <UserUpdateButton>Update</UserUpdateButton>
                        </UserUpdateRight>
                    </UserUpdateForm>
                </UserUpdate>
            </Wrapper>
        </UserContainer>
    );
};

const UserContainer = styled.div`
    flex: 4;
    padding: 20px;
`;
const Wrapper = styled.div`
    display: flex;
`;

const UserTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UserAddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
`;

const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    margin-top: 15px;
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
    margin-top: 15px;
`;

const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`;

const UserShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const UserShowUsername = styled.span`
    font-weight: 600;
`;

const UserShowUserTitle = styled.span`
    font-weight: 300;
`;

const UserShowBottom = styled.div`
    margin-top: 20px;
`;

const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #444;
`;

const UserShowIcon = styled.span`
    font-size: 16px !important;
`;

const UserShowInfoTitle = styled.span`
    margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`;

const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const UserUpdateLeft = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`;

const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`;

const UserUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;

const UserUpdateIcon = styled(Publish)`
    cursor: pointer;
`;
const File = styled.input`
    display: none;
`;

const UserUpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`;

export default User;
