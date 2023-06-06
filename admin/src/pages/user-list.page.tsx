import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userRows } from "../data.mock";
import { DeleteOutline } from "@mui/icons-material";

const UserList = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id: any) => {
        setData(data.filter((item: any) => item.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params: any) => {
                return (
                    <User>
                        <UserImage src={params.row.avatar} alt="" />
                        {params.row.username}
                    </User>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "transaction",
            headerName: "Transaction Volume",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/user/${params.row.id}`}>
                            <EditButton>Edit</EditButton>
                        </Link>
                        <DeleteOutlineIcon
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Container>
            <StyledDataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
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
