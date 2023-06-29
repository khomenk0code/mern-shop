import React, { useState } from "react";
import styled from "styled-components";
import { addProduct } from "../redux/api.calls";
import { useAppDispatch } from "../hooks/redux.hooks";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    LinearProgress,
} from "@mui/material";
import handleImageChange from "../utils/uploadImg.helper";
import { useFirebaseConfig } from "../hooks/useFirebase.hooks";

const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [fullSizeImgUrl, setFullSizeImgUrl] = useState<string>("");
    const [lightweightImgUrl, setLightweightImgUrl] = useState<string>("");
    const [isProductSaved, setIsProductSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useAppDispatch();
    const firebaseConfig = useFirebaseConfig();

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSizes((prevSelectedSizes) => [
                ...prevSelectedSizes,
                value,
            ]);
        } else {
            setSelectedSizes((prevSelectedSizes) =>
                prevSelectedSizes.filter((size) => size !== value)
            );
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]:
                name === "categories" || name === "colors"
                    ? value.split(",").map((item: string) => item.trim())
                    : value,
        }));
    };


    // ...

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            await handleImageChange(
                e,
                setImage,
                setProgress,
                setFullSizeImgUrl,
                setLightweightImgUrl,
                firebaseConfig
            );
        } catch (error) {
            console.log(error);
        }
    };



    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const product = {
            ...inputs,
            img: fullSizeImgUrl,
            size: selectedSizes,
            altImg: lightweightImgUrl,
        };
        console.log("Product:", product); // Check the console output
        try {
            const savedProduct = await addProduct(product, dispatch);
            console.log("Product saved", savedProduct);

            setIsProductSaved(true);
            setIsError(false);
        } catch (error) {
            console.log("Error with product saving:", error);
            setIsProductSaved(false);
            setIsError(true);
        }
    };


// ...

    return (
        <Wrapper>
            <h1 className="addProductTitle">New Product</h1>
            <FormGroup>
                <FieldWrapper>
                    <Label>Title</Label>
                    <Input
                        name="title"
                        type="text"
                        placeholder="Apple Airpods"
                        onChange={handleChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Description</Label>
                    <Input
                        name="desc"
                        type="text"
                        placeholder="Description"
                        onChange={handleChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Categories</Label>
                    <Input
                        name="categories"
                        type="text"
                        placeholder="Jeans, skirts"
                        onChange={handleChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Colors</Label>
                    <Input
                        name="color"
                        type="text"
                        placeholder="Blue, white"
                        onChange={handleChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Price</Label>
                    <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        onChange={handleChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Size</Label>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSizes.includes("XS")}
                                    onChange={handleSizeChange}
                                    value="XS"
                                />
                            }
                            label="XS"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSizes.includes("S")}
                                    onChange={handleSizeChange}
                                    value="S"
                                />
                            }
                            label="S"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSizes.includes("M")}
                                    onChange={handleSizeChange}
                                    value="M"
                                />
                            }
                            label="M"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSizes.includes("L")}
                                    onChange={handleSizeChange}
                                    value="L"
                                />
                            }
                            label="L"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSizes.includes("XL")}
                                    onChange={handleSizeChange}
                                    value="XL"
                                />
                            }
                            label="XL"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSizes.includes("XXL")}
                                    onChange={handleSizeChange}
                                    value="XXL"
                                />
                            }
                            label="XXL"
                        />
                    </FormGroup>
                </FieldWrapper>
                <AddProductItem>
                    <Label>Stock</Label>
                    <select name="inStock" id="stock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </AddProductItem>
                <ImageWrapper>
                    <Label htmlFor="image">Image</Label>
                    <Input
                        accept="image/jpeg, image/png"
                        name="image"
                        type="file"
                        id="file"
                        onChange={onImageChange}
                    />
                    {progress > 0 && (
                        <LinearProgressWrapper>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                            />
                        </LinearProgressWrapper>
                    )}
                    {fullSizeImgUrl && (
                        <img
                            src={fullSizeImgUrl}
                            alt="Product"
                            className="uploaded-image"
                        />
                    )}  {lightweightImgUrl && (
                        <LightWeightImg
                            src={lightweightImgUrl}
                            alt="Product"
                            className="uploaded-image"
                        />
                    )}
                </ImageWrapper>
                <ButtonWrapper>
                    <button type="submit" onClick={handleClick}>
                        Save
                    </button>
                    {isProductSaved && !isError ? (
                        <SuccessMessage>Product was saved!</SuccessMessage>
                    ) : (
                        isError && (
                            <ErrorMessage>Something went wrong</ErrorMessage>
                        )
                    )}
                </ButtonWrapper>
            </FormGroup>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    flex: 4;
    padding: 50px;

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .error {
        border: 1px solid red;
    }

    .error-message {
        color: red;
        font-size: 14px;
    }

    .checkbox-group {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    .uploaded-image {
        width: 100px;
        margin-top: 10px;
    }
`;

const FieldWrapper = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 5px;
    }

    input,
    textarea {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;

    button {
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
        background-color: darkblue;
        font-weight: 600;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
`;

const ImageWrapper = styled.div`
    width: 250px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SuccessMessage = styled.div`
    margin-top: 10px;
    text-align: center;
    color: green;
`;
const ErrorMessage = styled.div`
    margin-top: 10px;
    text-align: center;
    color: red;
`;

const LinearProgressWrapper = styled.div`
    align-items: center;
    margin-top: 10px;
`;
const LightWeightImg = styled.img`
    display: none;
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

export default NewProduct;
