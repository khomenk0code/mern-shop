import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { deleteProduct, getProducts } from "../redux/api.calls";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";

interface Product {
    _id: string;
    product: string;
    inStock: number;
    price: number;
}

const ProductList = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState("");


    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id: string) => {
        setProductIdToDelete(id);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        deleteProduct(productIdToDelete, dispatch)
            .then(() => {
                console.log(`Product with id:${productIdToDelete} was deleted`);
                getProducts(dispatch);
                setShowConfirmation(false);
            })
            .catch((error) => {
                console.log(`Error deleting product with id:${productIdToDelete}`, error);
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
            field: "product",
            headerName: "Product",
            headerAlign: "center",
            flex: 300,
            renderCell: (params) => {
                return (
                    <ProductListItem>
                        <ProductListImg src={params.row.img} alt="productImg" />
                        {params.row.title}
                    </ProductListItem>
                );
            },
        },
        {
            field: "inStock",
            headerName: "Stock",
            headerAlign: "center",
            align: "center",
            flex: 100,
        },
        {
            field: "price",
            headerName: "Price",
            align: "center",
            headerAlign: "center",
            flex: 100,
        },
        {
            field: "action",
            headerName: "Action",
            align: "center",
            sortable: false,
            filterable: false,
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.row._id}`}>
                            <ProductListEdit>Edit</ProductListEdit>
                        </Link>
                        <ProductListDelete onClick={() => handleDelete(params.row._id)} />
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
                autoHeight
                localeText={{
                    toolbarDensity: 'Size',
                    toolbarDensityLabel: 'Size',
                    toolbarDensityCompact: 'Small',
                    toolbarDensityStandard: 'Medium',
                    toolbarDensityComfortable: 'Large',
                }}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
            {showConfirmation && (
                <ConfirmationPopup>
                    <ConfirmationText>Are you sure you want to delete this product?</ConfirmationText>
                    <ConfirmationButtons>
                        <ConfirmationButton onClick={confirmDelete}>Yes</ConfirmationButton>
                        <ConfirmationButton onClick={cancelDelete}>No</ConfirmationButton>
                    </ConfirmationButtons>
                </ConfirmationPopup>
            )}
        </ProductListContainer>
    );
};



export const ConfirmationPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

export const ConfirmationText = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const ConfirmationButton = styled.button`
  margin: 20px 15px;
  padding: 15px 40px;
  background-color: #3bb077;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2d8a5f;
  }
`;

export const ProductListContainer = styled.div`
  width: 100%;
`;
export const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

export const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const ProductListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #2d8a5f;
  }
`;

export const ProductListDelete = styled(DeleteOutline)`
  color: red;
  cursor: pointer;

  &:hover {
    color: darkred;
  }
`;

export default ProductList;
