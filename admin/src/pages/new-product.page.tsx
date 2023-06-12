import React, { useState } from "react";
import styled from "styled-components";

const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState<File | undefined>(undefined);
    const [categoies, setCategoies] = useState([]);



    const handleChange = (e:any) => {
        setInputs(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    const handleCategories = (e:any) => {
        setCategoies(e.target.value.split(",").map((category:string) => category.trim()))
    }

    const handleClick = (e:any) => {
        e.preventDefault();

    };


    return (
        <NewProductWrapper>
            <h1 className="addProductTitle">New Product</h1>
            <AddProductForm>
                <AddProductItem>
                    <Label>Image</Label>
                    <Input type="file" id="file" onChange={e => setImage(e.target.files?.[0])}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Title</Label>
                    <Input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Description</Label>
                    <Input name="description" type="text" placeholder="description" onChange={handleChange}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Categories</Label>
                    <Input type="text" placeholder="jeans, skirts" onChange={handleCategories}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Price</Label>
                    <Input name="price" type="number" placeholder="price" onChange={handleChange}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Stock</Label>
                    <select name="inStock" id="stock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </AddProductItem>
                <AddProductButton onClick={handleClick} >Create</AddProductButton>
            </AddProductForm>
        </NewProductWrapper>
    );
};

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
