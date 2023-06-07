import React from "react";
import styled from "styled-components";

const NewProduct = () => (
    <NewProductWrapper>
        <h1 className="addProductTitle">New Product</h1>
        <AddProductForm>
            <AddProductItem>
                <Label>Image</Label>
                <Input type="file" id="file" />
            </AddProductItem>
            <AddProductItem>
                <Label>Name</Label>
                <Input type="text" placeholder="Apple Airpods" />
            </AddProductItem>
            <AddProductItem>
                <Label>Stock</Label>
                <Input type="text" placeholder="123" />
            </AddProductItem>
            <AddProductItem>
                <Label>Active</Label>
                <Select name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </Select>
            </AddProductItem>
            <AddProductButton>Create</AddProductButton>
        </AddProductForm>
    </NewProductWrapper>
);

const NewProductWrapper = styled.div`
    flex: 4;
`;

const AddProductForm = styled.form`
    margin-top: 10px;
`;

const AddProductItem = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const Label = styled.label`
    color: gray;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
`;

const Select = styled.select`
    padding: 10px;
`;

const AddProductButton = styled.button`
    margin-top: 10px;
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

export default NewProduct;
