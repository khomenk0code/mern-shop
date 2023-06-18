import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { deleteProduct, getProducts } from "../redux/api.calls";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id: number) => {
        deleteProduct(id, dispatch)
            .then(() => {
                console.log(`Product with id:${id} was deleted`);
                getProducts(dispatch);
            })
            .catch((error) => {
                console.log(`Error deleting product with id:${id}`, error);
            });
    };


    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params: any) => {
                return (
                    <ProductListItem>
                        <ProductListImg src={params.row.img} alt="productImg" />
                        {params.row.title}
                    </ProductListItem>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/product/${params.row._id}`}>
                            <ProductListEdit>Edit</ProductListEdit>
                        </Link>
                        <ProductListDelete
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <ProductListContainer>
            <DataGrid
                rows={products}
                disableRowSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                rowCount={products.length}
                checkboxSelection
            />
        </ProductListContainer>
    );
};

const ProductListContainer = styled.div`
    flex: 4;
`;

const ProductListItem = styled.div`
    display: flex;
    align-items: center;
`;

const ProductListImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;

const ProductListEdit = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`;

const ProductListDelete = styled(DeleteOutline)`
    color: red;
    cursor: pointer;
`;

export default ProductList;
