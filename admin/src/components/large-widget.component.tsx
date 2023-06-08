import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
    type: string;
};

const LargeWidget: React.FC = () => {
    const Button = ({ type }: ButtonProps) => {
        return <ButtonContainer type={type}>{type}</ButtonContainer>;
    };

    return (
        <Container>
            <Title>Latest transactions</Title>
            <Table>
                <tbody>
                    <tr>
                        <TableHeader>Customer</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader>Amount</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </tr>
                    <tr>
                        <TableCell>
                            <ImgContainer>
                                <Image
                                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    alt=""
                                />
                                <Name>Susan Carol</Name>
                            </ImgContainer>
                        </TableCell>
                        <TableCell>2 Jun 2021</TableCell>
                        <TableCell>$122.00</TableCell>
                        <TableCell>
                            <Status>
                                <Button type="Approved" />
                            </Status>
                        </TableCell>
                    </tr>
                </tbody>
            </Table>
            <Table>
                <tbody>
                    <tr>
                        <TableHeader>Customer</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader>Amount</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </tr>
                    <tr>
                        <TableCell>
                            <ImgContainer>
                                <Image
                                    src="https://mediaslide-europe.storage.googleapis.com/louisamodels/pictures/3725/13933/profile-1640014292-4a26a41437da03f345e9f0ed8fa0d60e.jpg"
                                    alt=""
                                />
                                <Name>S Carol</Name>
                            </ImgContainer>
                        </TableCell>
                        <TableCell>5 Jun 2023</TableCell>
                        <TableCell>$822.00</TableCell>
                        <TableCell>
                            <Status>
                                <Button type="Declined" />
                            </Status>
                        </TableCell>
                    </tr>
                </tbody>
            </Table>
            <Table>
                <tbody>
                    <tr>
                        <TableHeader>Customer</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader>Amount</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </tr>
                    <tr>
                        <TableCell>
                            <ImgContainer>
                                <Image
                                    src="https://mediaslide-europe.storage.googleapis.com/louisamodels/pictures/700/403/profile-1612010058-a467fb70a025956018368d3d77a5015f.jpg"
                                    alt=""
                                />
                                <Name>Susan C</Name>
                            </ImgContainer>
                        </TableCell>
                        <TableCell>3 Jun 2023</TableCell>
                        <TableCell>$102.00</TableCell>
                        <TableCell>
                            <Status>
                                <Button type="Pending" />
                            </Status>
                        </TableCell>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

const Container = styled.div`
    flex: 2;
    -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
`;

const Title = styled.h3`
    font-size: 22px;
    font-weight: 600;
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 20px;
`;

const TableHeader = styled.th`
    text-align: left;
`;

const TableCell = styled.td`
    font-weight: 300;
`;

const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;

const Name = styled.span``;

const Status = styled.div``;

const ButtonContainer = styled.button<any>`
    padding: 5px 7px;
    border: none;
    border-radius: 10px;

    ${(props) =>
        props.type === "Approved" &&
        css`
            background-color: #e5faf2;
            color: #3bb077;
        `}

    ${(props) =>
        props.type === "Declined" &&
        css`
            background-color: #fff0f1;
            color: #d95087;
        `}

  ${(props) =>
        props.type === "Pending" &&
        css`
            background-color: #ebf1fe;
            color: #2a7ade;
        `}
`;

export default LargeWidget;
