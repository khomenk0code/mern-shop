import React from "react";
import styled from "styled-components";

const NewUser: React.FC = () => (
    <NewUserContainer>
        <h1>New User</h1>
        <NewUserForm>
            <NewUserItem>
                <NewUserLabel>Username</NewUserLabel>
                <NewUserInput type="text" placeholder="john" />
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Full Name</NewUserLabel>
                <NewUserInput type="text" placeholder="John Smith" />
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Email</NewUserLabel>
                <NewUserInput type="email" placeholder="john@gmail.com" />
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Password</NewUserLabel>
                <NewUserInput type="password" placeholder="password" />
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Phone</NewUserLabel>
                <NewUserInput type="text" placeholder="+1 123 456 78" />
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Address</NewUserLabel>
                <NewUserInput type="text" placeholder="New York | USA" />
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Gender</NewUserLabel>
                <NewUserGender>
                    <input type="radio" name="gender" id="male" value="male" />
                    <NewUserGenderLabel htmlFor="male">Male</NewUserGenderLabel>
                    <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                    />
                    <NewUserGenderLabel htmlFor="female">
                        Female
                    </NewUserGenderLabel>
                    <input
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                    />
                    <NewUserGenderLabel htmlFor="other">
                        Other
                    </NewUserGenderLabel>
                </NewUserGender>
            </NewUserItem>
            <NewUserItem>
                <NewUserLabel>Active</NewUserLabel>
                <NewUserSelect name="аctive" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </NewUserSelect>
            </NewUserItem>
            <NewUserButton>Create</NewUserButton>
        </NewUserForm>
    </NewUserContainer>
);

const NewUserContainer = styled.div`
    flex: 4;
`;

const NewUserForm = styled.form`
    display: flex;
    flex-wrap: wrap;
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

const NewUserGender = styled.div`
    display: flex;
    margin-top: 15px;
`;

const NewUserGenderLabel = styled.label`
    margin: 10px;
    font-size: 18px;
    color: #555;
`;

const NewUserSelect = styled.select`
    height: 40px;
    border-radius: 5px;
`;

const NewUserButton = styled.button`
    width: 200px;
    border: none;
    background-color: darkblue;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`;

export default NewUser;
