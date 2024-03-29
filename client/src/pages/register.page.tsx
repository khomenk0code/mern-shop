import styled from "styled-components";
import { mobile } from "../utils/responsive";
import React, { useState } from "react";
import { publicRequest } from "../utils/requestMethods";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const navigate = useNavigate()

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegisterClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newErrorMessages: string[] = [];

        if (password !== confirmPassword) {
            newErrorMessages.push("Passwords don't match.");
            setPasswordsMatch(false);
            setShowPopup(true);
        } else {
            setPasswordsMatch(true);
            setShowPopup(false);

            try {
                const userData = { username, email, password };
                await publicRequest.post("/auth/register", userData);
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setErrorMessages([]);
                setShowSuccessPopup(true); // Показать попап успеха
            } catch (e) {
                newErrorMessages.push("Registration unsuccessful. Please try again.");
                setShowPopup(true);
                console.error(e);
            }

            setErrorMessages(newErrorMessages);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setShowSuccessPopup(false); // Закрыть попап успеха
    };



    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" type="text" onChange={handleUsernameChange} value={username} />
                    <Input placeholder="email" type="email" onChange={handleEmailChange} value={email} />
                    <Input placeholder="password" type="password" onChange={handlePasswordChange} value={password} />
                    <Input placeholder="confirm password" type="password" onChange={handleConfirmPasswordChange} value={confirmPassword} />
                    <Agreement>
                        By creating an account, I consent to the processing of
                        my personal data in accordance with the{" "}
                        <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleRegisterClick}>CREATE</Button>
                </Form>
                {showPopup && (
                    <ErrorPopup>
                        {passwordsMatch ? "Registration unsuccessful. Please try again." : "Passwords don't match."}
                        <PopupButton onClick={handlePopupClose}>OK</PopupButton>
                    </ErrorPopup>
                )}
                {showSuccessPopup && (
                    <SuccessPopup>
                        Registration successful!
                        <PopupButton onClick={() => {
                            handlePopupClose();
                            navigate('/'); // Переход на главную страницу
                        }}>
                            Go to Home
                        </PopupButton>
                    </SuccessPopup>
                )}

            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("data:image/jpeg;base64,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")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SuccessPopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        font-size: 18px;
        margin-bottom: 10px;
    }

    button {
        margin-top: 10px;
        padding: 8px 20px;
        border: none;
        border-radius: 4px;
        background-color: teal;
        color: white;
        cursor: pointer;
    }
`;

const ErrorPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;

    ${mobile({ width: "75%" })}

`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
  align-items: center;
  
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    justify-self: center;
 
`;

export default Register;
