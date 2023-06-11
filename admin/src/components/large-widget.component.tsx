import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { userRequest } from "../utils/requestMethods";
import { Users } from "./small-widget.component";

type ButtonProps = {
    type: string;
};

interface OrderProduct {
    productId: string;
    quantity: number;
}

interface OrderAddress {}

interface Order {
    _id: any;
    userId: string;
    products: OrderProduct[];
    amount: number;
    address: OrderAddress;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const LargeWidget: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await userRequest.get("orders");
                setOrders(orderResponse.data);
                const userResponse = await userRequest.get("users/?new=true");
                setUsers(userResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        const parts = formattedDate.split(" ");
        const DateFormat = `${parts[1]} ${parts[0]} ${parts[2]}`;

        return DateFormat.replace(",", "");
    };

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
                    {orders.map((order) => {
                        const user = users.find(
                            (user) => user._id === order.userId
                        );
                        return (
                            <tr key={order._id}>
                                <TableCell>
                                    <ImgContainer>
                                        <Image
                                            src={
                                                user?.image ||
                                                "https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png"
                                            }
                                            alt=""
                                        />
                                        <Name>{user?.username}</Name>
                                    </ImgContainer>
                                </TableCell>
                                <TableCell>
                                    {formatDate(order.createdAt?.toString())}
                                </TableCell>
                                <TableCell>${order.amount}</TableCell>
                                <TableCell>
                                    <Status>
                                        <Button type={order.status} />
                                    </Status>
                                </TableCell>
                            </tr>
                        );
                    })}
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
        props.type === "approved" &&
        css`
            background-color: #e5faf2;
            color: #3bb077;
        `}

    ${(props) =>
        props.type === "declined" &&
        css`
            background-color: #fff0f1;
            color: #d95087;
        `}

  ${(props) =>
        props.type === "pending" &&
        css`
            background-color: #ebf1fe;
            color: #2a7ade;
        `}
`;

export default LargeWidget;
