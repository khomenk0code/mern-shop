import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { DeleteOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {  deleteUser, getUsers } from "../redux/api.calls";

const UserList = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);


    const handleDelete = (id: number) => {
        deleteUser(id, dispatch)
            .then(() => {
                console.log(`User with id:${id} was deleted`);
                getUsers(dispatch);
            })
            .catch((error) => {
                console.log(`Error deleting user with id:${id}`, error);
            });
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 230 },
        {
            field: "username",
            headerName: "User",
            width: 200,
            renderCell: (params: any) => {
                return (
                    <User>
                        <UserImage src={params.row.image} alt="" />
                        {params.row.username}
                    </User>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "isAdmin",
            headerName: "Is admin",
            width: 120,
        },
        {
            field: "createdAt",
            headerName: "Created",
            width: 160,
            renderCell: (params: any) => {
                const createdAt = new Date(params.row.createdAt).toLocaleDateString();
                return <>{createdAt}</>;
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params: any) => {
                if (params.row.isAdmin) {
                    return (
                        <Link to={`/user/${params.row._id}`}>
                            <EditButton>Edit</EditButton>
                        </Link>
                    );
                } else {
                    return (
                        <>
                            <Link to={`/user/${params.row._id}`}>
                                <EditButton>Edit</EditButton>
                            </Link>
                            <DeleteOutlineIcon onClick={() => handleDelete(params.row._id)} />
                        </>
                    );
                }
            },
        },
    ];





    return (
        <Container>
            <StyledDataGrid
                rows={users.users}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row:any) => row._id}
                rowCount={8}
                checkboxSelection
            />
        </Container>
    );
};

const Container = styled.div`
    flex: 4;
`;

const User = styled.div`
    display: flex;
    align-items: center;
`;

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;

const EditButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`;

const DeleteOutlineIcon = styled(DeleteOutline)`
    color: red;
    cursor: pointer;
`;

const StyledDataGrid = styled(DataGrid)<any>`
    && {
        /* Add any additional styles for the DataGrid here */
    }
`;

export default UserList;
