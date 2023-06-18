import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
    Cake,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { LinearProgress } from "@mui/material";


import handleImageChange from "../utils/uploadImg.helper";
import {  updateUser } from "../redux/api.calls";
import { useFirebaseConfig } from "../hooks/useFirebase.hooks";


    const User: React.FC = () => {
        const [image, setImage] = useState<File | null>(null);
        const [imgUrl, setImgUrl] = useState<string>("");
        const [progress, setProgress] = useState(0);
        const [inputs, setInputs] = useState({});
        const [isUserSaved, setIsUserSaved] = useState(false);
        const [isError, setIsError] = useState(false);

        const location = useLocation();
        const dispatch = useAppDispatch();
        const firebaseConfig = useFirebaseConfig();

        const userId: string = location.pathname.split("/")[2];
        const user: any = useAppSelector((state) =>
            state.user.users.find((user) => user._id === userId)
        );

        const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleImageChange(e, setImage, setProgress, setImgUrl, firebaseConfig);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        };


        const handleClick = async (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
            e.preventDefault();

            try {
                let updatedUser: any = { ...user };
                if (imgUrl) {
                    updatedUser.image = imgUrl;
                }

                updatedUser = {
                    ...updatedUser,
                    ...inputs,
                };

                const savedUser: any = await updateUser(userId, updatedUser, dispatch);
                setIsError(false);
                setIsUserSaved(true);
            } catch (error) {
                console.log("Error with user saving:", error);
                setIsError(true);
                setIsUserSaved(false);
            }
        };

        const formattedBirthDate = user.birthDate
            ? new Date(user.birthDate).toLocaleDateString()
            : "Your birthdate";

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
                            <UserShowImg src={user.image} alt="" />
                            <UserShowTopTitle>
                                <UserShowUsername>{user.username}</UserShowUsername>
                            </UserShowTopTitle>
                        </UserShowTop>
                        <UserShowBottom>
                            <UserShowTitle>Account Details</UserShowTitle>
                            <UserShowInfo>
                                <UserShowIcon>
                                    <PermIdentity />
                                </UserShowIcon>
                                <UserShowInfoTitle>
                                    {user.username || "username"}
                                </UserShowInfoTitle>
                            </UserShowInfo>
                            <UserShowInfo>
                                <UserShowIcon>
                                    <Cake />
                                </UserShowIcon>
                                <UserShowInfoTitle>{formattedBirthDate}</UserShowInfoTitle>
                            </UserShowInfo>
                            <UserShowTitle>Contact Details</UserShowTitle>
                            <UserShowInfo>
                                <UserShowIcon>
                                    <PhoneAndroid />
                                </UserShowIcon>
                                <UserShowInfoTitle>
                                    {user.phone || "Your phone"}
                                </UserShowInfoTitle>
                            </UserShowInfo>
                            <UserShowInfo>
                                <UserShowIcon>
                                    {" "}
                                    <MailOutline />
                                </UserShowIcon>
                                <UserShowInfoTitle>
                                    {user.email || "Your email"}
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
                                        name="username"
                                        onChange={handleChange}
                                        placeholder={user.username}
                                    />
                                </UserUpdateItem>

                                <UserUpdateItem>
                                    <label>Full Name</label>
                                    <UserUpdateInput
                                        type="text"
                                        name="fullName"
                                        onChange={handleChange}
                                        placeholder={user.fullName || "Anna Backer"}
                                    />
                                </UserUpdateItem>
                                <UserUpdateItem>
                                    <label>Email</label>
                                    <UserUpdateInput
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        placeholder={user.email}
                                    />
                                </UserUpdateItem>
                                <UserUpdateItem>
                                    <label>Phone</label>
                                    <UserUpdateInput
                                        type="tel"
                                        name="phone"
                                        onChange={handleChange}
                                        placeholder={user.phone || "+1 233 256 589"}
                                    />
                                </UserUpdateItem>
                                <UserUpdateItem>
                                    <label>Birth Date</label>
                                    <UserUpdateInput
                                        type="date"
                                        name="birthDate"
                                        onChange={handleChange}
                                    />
                                </UserUpdateItem>
                            </UserUpdateLeft>
                            <UserUpdateRight>
                                <UserUpload>
                                    {imgUrl ? (
                                        <UserUploadImg
                                            src={imgUrl}
                                            alt="User"
                                            className="uploaded-image"
                                        />
                                    ) : (
                                        <UserUploadImg src={user?.image} alt="User image" />
                                    )}
                                    <label htmlFor="file">
                                        <Publish />
                                    </label>

                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                        accept="image/jpeg, image/png"
                                        name="image"
                                        onChange={onImageChange}
                                    />
                                </UserUpload>
                                <LinearProgress variant="determinate" value={progress} />
                                {isUserSaved && !isError ? (
                                    <SuccessMessage>User was updated!</SuccessMessage>
                                ) : (
                                    isError && (
                                        <ErrorMessage>Something went wrong</ErrorMessage>
                                    )
                                )}
                                <UserUpdateButton onClick={handleClick}>Update</UserUpdateButton>
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

const UserUpload = styled.div`
    display: flex;
    align-items: center;
`;

const UserUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
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
const SuccessMessage = styled.div`
    margin-top: 10px;
    text-align: center;
    color: green;
`;
const ErrorMessage = styled.div`
    margin-top: 10px;
    text-align: center;
    color: red;
`;

export default User;
