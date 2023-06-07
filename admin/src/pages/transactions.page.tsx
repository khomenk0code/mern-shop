import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import {
    Description,
    MonetizationOn,
    DateRange,
    Visibility,
} from "@mui/icons-material";
import { transactionsData } from "../data.mock";

const Transactions = () => {
    return (
        <TransactionsContainer>
            <TransactionsTitleContainer>
                <h1>Transactions</h1>
                <Link to="/transactions/add">Create</Link>
            </TransactionsTitleContainer>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right">Product</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionsData.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell component="th" scope="row">
                                    {transaction.description}
                                </TableCell>
                                <TableCell align="right">
                                    {transaction.amount}
                                </TableCell>
                                <TableCell align="right">
                                    {transaction.date}
                                </TableCell>
                                <TableCell align="right">
                                    {transaction.user}
                                </TableCell>
                                <TableCell align="right">
                                    {transaction.product}
                                </TableCell>
                                <TableCell align="center">
                                    <ActionsContainer>
                                        <ActionIcon>
                                            <Description />
                                        </ActionIcon>
                                        <ActionIcon>
                                            <MonetizationOn />
                                        </ActionIcon>
                                        <ActionIcon>
                                            <DateRange />
                                        </ActionIcon>
                                        <ActionIcon>
                                            <Visibility />
                                        </ActionIcon>
                                    </ActionsContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TransactionsContainer>
    );
};

const TransactionsContainer = styled.div`
    flex: 4;
    padding: 20px;
`;

const TransactionsTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;
    margin: 0 auto;
`;

const ActionIcon = styled.div`
    cursor: pointer;
    margin: 0 5px;
`;

export default Transactions;
