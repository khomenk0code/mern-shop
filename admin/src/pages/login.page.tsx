import React, {  useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import login from "../redux/auth.api";


const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    // const { isFetching, error } = useAppSelector(state => state.user);


    const handleLogin = (event:React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        login(dispatch, { username, password });

    };

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
                >
                    Login
                </StyledButton>
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

export default Login;
