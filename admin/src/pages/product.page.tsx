import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import Chart, { ChartData } from "../components/chart.component";
import { Publish } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getProducts, updateProduct } from "../redux/api.calls";
import { userRequest } from "../utils/requestMethods";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    LinearProgress,
} from "@mui/material";
import handleImageChange from "../utils/uploadImg.helper";

export interface ProductData extends ChartData {
    Sales: number;
}

interface ProductStatsData {
    _id: number;
    total: number;
    name: string;
}

const Product = () => {
    const [productStats, setProductStats] = useState<ProductStatsData[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState<string>("");
    const [isProductUpdated, setIsProductSaved] = useState(false);
    const [isError, setIsError] = useState(false);

    const location = useLocation();
    const dispatch = useAppDispatch();

    const productId: string = location.pathname.split("/")[2];
    const product = useAppSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get(
                    `orders/income?pid=${productId}`
                );

                const sortedRes = await res.data.sort(
                    (a: ProductStatsData, b: ProductStatsData) => {
                        return a._id - b._id;
                    }
                );
                sortedRes.map((item: ProductStatsData) => {
                    setProductStats((prev: any) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ]);
                });
            } catch (e) {
                console.error(e);
            }
        };
        getStats();
    }, [MONTHS]);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

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
                name === "categories" || name === "color"
                    ? value.split(",").map((item: string) => item.trim())
                    : value,
        }));
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageChange(e, setImage, setProgress, setImgUrl);
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            let updatedProduct = { ...product };
            if (imgUrl) {
                updatedProduct.img = imgUrl;
            }

            updatedProduct = {
                ...updatedProduct,
                ...inputs,
                size: selectedSizes,
            };

            const savedProduct = await updateProduct(
                productId,
                updatedProduct,
                dispatch
            );
            setIsError(false);
            setIsProductSaved(true);
        } catch (error) {
            console.log("Error with product saving:", error);
            setIsError(true);
            setIsProductSaved(false);
        }
    };

    return (
        <ProductContainer>
            <ProductTitleContainer>
                <h1>{product?.title}</h1>
                <Link to="/product/add">
                    <ProductAddButton>Create</ProductAddButton>
                </Link>
            </ProductTitleContainer>
            <ProductTop>
                <ProductTopLeft>
                    <Chart
                        data={productStats}
                        dataKey="Sales"
                        grid
                        title="Sales Performance"
                    />
                </ProductTopLeft>
                <ProductTopRight>
                    <ProductInfoTop>
                        <ProductInfoImg src={product?.img} alt="" />
                        <ProductName>{product?.title}</ProductName>
                    </ProductInfoTop>
                    <ProductInfoBottom>
                        <ProductInfoItem>
                            <ProductInfoKey>id:</ProductInfoKey>
                            <ProductInfoValue>{product?._id}</ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>price:</ProductInfoKey>
                            <ProductInfoValue>
                                {product?.price}
                            </ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>in stock:</ProductInfoKey>
                            <ProductInfoValue>
                                {product?.inStock ? "Yes" : "No"}
                            </ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>sizes:</ProductInfoKey>
                            <ProductInfoValue>
                                {product?.size?.join(", ")}
                            </ProductInfoValue>
                        </ProductInfoItem>
                    </ProductInfoBottom>
                </ProductTopRight>
            </ProductTop>
            <ProductBottom>
                <ProductForm>
                    <ProductFormLeft>
                        <FormLeftTitle>Product Title</FormLeftTitle>
                        <FormLeftInput
                            type="text"
                            name="title"
                            placeholder={product?.title}
                            onChange={handleChange}
                        />
                        <FormLeftTitle>Product Description</FormLeftTitle>
                        <FormLeftInput
                            type="text"
                            placeholder={product?.desc}
                            name="desc"
                            onChange={handleChange}
                        />
                        <FormLeftTitle>In Stock</FormLeftTitle>
                        <FormLeftSelect
                            name="inStock"
                            id="inStock"
                            onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </FormLeftSelect>
                    </ProductFormLeft>
                    <ProductFormLeft>
                        <FormLeftTitle>Product Price</FormLeftTitle>
                        <FormLeftInput
                            type="number"
                            name="price"
                            placeholder={`${product?.price}`}
                            onChange={handleChange}
                        />
                        <FormLeftTitle>Product Colors</FormLeftTitle>
                        <FormLeftInput
                            type="text"
                            name="color"
                            placeholder={product?.color?.join(",")}
                            onChange={handleChange}
                        />
                        <FormLeftTitle>Product Categories</FormLeftTitle>
                        <FormLeftInput
                            type="text"
                            name="categories"
                            placeholder={product?.categories?.join(",")}
                            onChange={handleChange}
                        />
                        <FormLeftTitle>Size</FormLeftTitle>
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
                    </ProductFormLeft>
                    <ProductFormRight>
                        <ProductUpload>
                            {imgUrl ? (
                                <ProductUploadImg
                                    src={imgUrl}
                                    alt="Product"
                                    className="uploaded-image"
                                />
                            ) : (
                                <ProductUploadImg src={product?.img} alt="" />
                            )}
                            <label htmlFor="file">
                                <Publish />
                            </label>

                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                accept="image/jpeg, image/png"
                                name="image"
                                onChange={onImageChange}
                            />
                        </ProductUpload>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                            />

                        <ProductButton type="submit" onClick={handleClick}>
                            Update
                        </ProductButton>
                        {isProductUpdated && !isError ? (
                            <SuccessMessage>
                                Product was updated!
                            </SuccessMessage>
                        ) : (
                            isError && (
                                <ErrorMessage>
                                    Something went wrong
                                </ErrorMessage>
                            )
                        )}
                    </ProductFormRight>
                </ProductForm>
            </ProductBottom>
        </ProductContainer>
    );
};

const ProductContainer = styled.div`
    flex: 4;
    padding: 20px;
`;

const ProductTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


const ProductAddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;

const ProductTop = styled.div`
    display: flex;
`;

const ProductTopLeft = styled.div`
    flex: 1;
`;

const ProductTopRight = styled.div`
    flex: 1;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductInfoTop = styled.div`
    display: flex;
    align-items: center;
`;

const ProductInfoImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
`;

const ProductName = styled.span`
    font-weight: 600;
`;

const ProductInfoBottom = styled.div`
    margin-top: 10px;
`;

const ProductInfoItem = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`;

const ProductInfoKey = styled.span`
    color: gray;
`;

const ProductInfoValue = styled.span`
    font-weight: 300;
`;

const ProductBottom = styled.div`
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductForm = styled.form`
    display: flex;
    justify-content: space-between;
`;

const ProductFormLeft = styled.div`
    display: flex;
    flex-direction: column;
`;
const FormLeftTitle = styled.label`
    margin-bottom: 10px;
    color: gray;
`;

const FormLeftInput = styled.input`
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
`;

const FormLeftSelect = styled.select`
    border-radius: 5px;
    margin-bottom: 10px;
`;

const ProductFormRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;

const ProductUpload = styled.div`
    display: flex;
    align-items: center;
`;

const ProductButton = styled.button`
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
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

export default Product;
