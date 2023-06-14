import React, { useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { addProduct } from "../redux/api.calls";
import { useAppDispatch } from "../hooks/hooks";
import { Checkbox, FormControlLabel, FormGroup, LinearProgress } from "@mui/material";



const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategoies] = useState([]);
    const [colors, setColors] = useState([]);
    const [progress, setProgress] = useState(0);
    const dispatch = useAppDispatch();
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, value]);
        } else {
            setSelectedSizes((prevSelectedSizes) => prevSelectedSizes.filter((size) => size !== value));
        }
    };

    const handleChange = (e: any) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleCategories = (e: any) => {
        setCategoies(e.target.value.split(",").map((category: string) => category.trim()))
    }
    const handleColors = (e: any) => {
        setColors(e.target.value.split(",").map((category: string) => category.trim()))
    }


    const handleClick = (e: any) => {
        e.preventDefault();
        if (image) {
            const fileName = new Date().getTime() + image.name;


            const storage = getStorage(app);
            const storageRef = ref(storage, fileName)

            const uploadTask = uploadBytesResumable(storageRef, image);


            uploadTask.on('state_changed',
                (snapshot: any) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress)
                },
                (error: any) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
                        const product = { ...inputs, img: downloadURL, categories, colors };
                        addProduct(product, dispatch)
                    });
                }
            );
        }
    };


    return (
        <NewProductWrapper>
            <h1 className="addProductTitle">New Product</h1>
            <AddProductForm>
                <AddProductItem>
                    <Label>Image</Label>
                    <Input type="file" id="file" onChange={e => setImage(e.target.files?.[0] as File)} />
                    <LinearProgress variant="determinate" value={progress} />
                </AddProductItem>
                <AddProductItem>
                    <Label>Title</Label>
                    <Input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </AddProductItem>
                <AddProductItem>
                    <Label>Description</Label>
                    <Input name="desc" type="text" placeholder="Description" onChange={handleChange} />
                </AddProductItem>
                <AddProductItem>
                    <Label>Categories</Label>
                    <Input name="categories" type="text" placeholder="Jeans, skirts" onChange={handleCategories} />
                </AddProductItem>
                <AddProductItem>
                    <Label>Colors</Label>
                    <Input name="color" type="text" placeholder="Blue, white" onChange={handleColors} />
                </AddProductItem>
                <AddProductItem>
                    <Label>Price</Label>
                    <Input name="price" type="number" placeholder="Price" onChange={handleChange} />
                </AddProductItem>
                <AddProductItem>
                    <Label>Size</Label>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedSizes.includes('XS')} onChange={handleSizeChange} value="XS" />}
                            label="XS"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedSizes.includes('S')} onChange={handleSizeChange} value="S" />}
                            label="S"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedSizes.includes('M')} onChange={handleSizeChange} value="M" />}
                            label="M"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedSizes.includes('L')} onChange={handleSizeChange} value="L" />}
                            label="L"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedSizes.includes('XL')} onChange={handleSizeChange} value="XL" />}
                            label="XL"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedSizes.includes('XXL')} onChange={handleSizeChange} value="XXL" />}
                            label="XXL"
                        />
                    </FormGroup>
                </AddProductItem>
                <AddProductItem>
                    <Label>Stock</Label>
                    <select name="inStock" id="stock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </AddProductItem>
                <AddProductButton onClick={handleClick}>Create</AddProductButton>
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
