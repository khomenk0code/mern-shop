import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux.hooks";
import { addUser } from "../redux/api.calls";

interface NewUser {
    name: string;
    email: string;
    password: string;
}

const defaultUserForm = {
    name: "",
    email: "",
    password: "",
};

const NewUser: React.FC = () => {
    const [isUserSaved, setIsUserSaved] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [inputs, setInputs] = useState<NewUser>(defaultUserForm);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        {
            setInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user = { ...inputs };
        try {
            const savedUser = await addUser(user, dispatch);
            console.log("User saved", savedUser);
            setIsUserSaved(true);
            setIsError(false);
        } catch (error) {
            console.log("Error with user saving:", error);
            setIsUserSaved(false);
            setIsError(true);
        }
    };

    return (
        <NewUserContainer>
            <Title>New User</Title>
            <NewUserForm>
                <NewUserItem>
                    <NewUserLabel>Username</NewUserLabel>
                    <NewUserInput
                        onChange={handleChange}
                        name="username"
                        type="text"
                        placeholder="john"
                    />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Email</NewUserLabel>
                    <NewUserInput
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="john@gmail.com"
                    />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Password</NewUserLabel>
                    <NewUserInput
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                </NewUserItem>
                <ButtonWrapper>
                    <button onClick={handleClick} type="submit">
                        Create
                    </button>
                    {isUserSaved && !isError ? (
                        <SuccessMessage>User was created!</SuccessMessage>
                    ) : (
                        isError && (
                            <ErrorMessage>Something went wrong</ErrorMessage>
                        )
                    )}
                </ButtonWrapper>
            </NewUserForm>
        </NewUserContainer>
    );
};

const NewUserContainer = styled.div`
    flex: 4;
`;
const Title = styled.h1`
    text-align: center;
`;

const NewUserForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;
    justify-content: center;
    padding: 20px;
`;

const NewUserItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`;

const NewUserLabel = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
`;

const NewUserInput = styled.input`
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
`;

const ButtonWrapper = styled.div`
    button {
        width: 200px;
        border: none;
        background-color: darkblue;
        color: white;
        padding: 7px 10px;
        font-weight: 600;
        border-radius: 10px;
        margin-top: 30px;
        cursor: pointer;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
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

export default NewUser;
