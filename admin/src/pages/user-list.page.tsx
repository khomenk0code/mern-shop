import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { deleteUser, getUsers } from "../redux/api.calls";
import {
    ConfirmationButton,
    ConfirmationButtons,
    ConfirmationPopup,
    ConfirmationText,
    ProductListContainer,
    ProductListDelete,
    ProductListEdit,
    ProductListImg,
    ProductListItem,
} from "./product-list.page";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";

const UserList = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [UserIdToDelete, setUserIdToDelete] = useState("");

    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user.users);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleDelete = (id: string) => {
        setUserIdToDelete(id);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        deleteUser(UserIdToDelete, dispatch)
            .then(() => {
                console.log(`User with id:${UserIdToDelete} was deleted`);
                getUsers(dispatch);
                setShowConfirmation(false);
            })
            .catch((error) => {
                console.log(
                    `Error deleting user with id:${UserIdToDelete}`,
                    error
                );
                setShowConfirmation(false);
            });
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            align: "center",
            headerAlign: "center",
            flex: 300,
        },
        {
            field: "username",
            headerName: "User",
            headerAlign: "center",
            flex: 200,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <User>
                        <UserImage src={params.row.image} alt="" />
                        {params.row.username}
                    </User>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            flex: 200,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "isAdmin",
            headerName: "Is admin",
            flex: 100,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "createdAt",
            headerName: "Created",
            flex: 150,
            align: "center",
            headerAlign: "center",
            renderCell: (params: GridRenderCellParams) => {
                const createdAt = new Date(
                    params.row.createdAt
                ).toLocaleDateString();
                return <>{createdAt}</>;
            },
        },
        {
            field: "action",
            headerName: "Action",
            flex: 100,
            headerAlign: "center",
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => {
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
                            <DeleteOutlineIcon
                                onClick={() => handleDelete(params.row._id)}
                            />
                        </>
                    );
                }
            },
        },
    ];

    return (
        <Container>
            {users ? (
                <DataGrid
                    rows={users}
                    disableRowSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowCount={users.length}
                    checkboxSelection
                    localeText={{
                        toolbarDensity: "Size",
                        toolbarDensityLabel: "Size",
                        toolbarDensityCompact: "Small",
                        toolbarDensityStandard: "Medium",
                        toolbarDensityComfortable: "Large",
                    }}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
            {showConfirmation && (
                <UserConfirmationPopup>
                    <UserConfirmationText>
                        Are you sure you want to delete this product?
                    </UserConfirmationText>
                    <UserConfirmationButtons>
                        <UserConfirmationButton onClick={confirmDelete}>
                            Yes
                        </UserConfirmationButton>
                        <ConfirmationButton onClick={cancelDelete}>
                            No
                        </ConfirmationButton>
                    </UserConfirmationButtons>
                </UserConfirmationPopup>
            )}
        </Container>
    );
};

export const UserConfirmationPopup = styled(ConfirmationPopup)``;

export const UserConfirmationText = styled(ConfirmationText)``;

export const UserConfirmationButtons = styled(ConfirmationButtons)``;

export const UserConfirmationButton = styled(ConfirmationButton)``;

const Container = styled(ProductListContainer)``;

const User = styled(ProductListItem)``;

const UserImage = styled(ProductListImg)``;

const EditButton = styled(ProductListEdit)``;

const DeleteOutlineIcon = styled(ProductListDelete)``;

export default UserList;
