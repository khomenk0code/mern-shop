import React, { useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { addProduct } from "../redux/api.calls";
import { useAppDispatch } from "../hooks/hooks";



const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategoies] = useState([]);
    const dispatch = useAppDispatch();
    console.log(image);

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
        if (image) {
            const fileName = new Date().getTime() + image.name;


        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, image);


        uploadTask.on('state_changed',
            (snapshot: any) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error: any) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
                    const product =  {...inputs, img: downloadURL, categories};
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
                    <Input type="file" id="file" onChange={e => setImage(e.target.files?.[0] as File)}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Title</Label>
                    <Input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
                </AddProductItem>
                <AddProductItem>
                    <Label>Description</Label>
                    <Input name="desc" type="text" placeholder="description" onChange={handleChange}/>
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
