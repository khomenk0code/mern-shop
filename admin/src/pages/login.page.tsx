import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { login } from "../redux/api.calls";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const { isFetching, error, currentUser } = useAppSelector(
        (state) => state.user
    );
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await login(dispatch, { username, password });
    };

    useEffect(() => {
        if (currentUser && Object.keys(currentUser).length > 0) {
            navigate("/");
            window.location.reload();
        }
    }, [currentUser, navigate]);

    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <InputWrapper>
                    <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: <AccountCircle />,
                        }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <Lock />,
                        }}
                    />
                </InputWrapper>
                <StyledButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isFetching}
                >
                    Login
                </StyledButton>
                {error && <Error>Something went wrong...</Error>}
            </LoginForm>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex: 4;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputWrapper = styled.div`
    margin: 10px;
`;

const Input = styled(TextField)``;

const StyledButton = styled(Button)`
    margin-top: 10px;
    width: 247px;
`;

const Error = styled.span`
    color: red;
    margin-top: 10px;
`;

export default Login;
