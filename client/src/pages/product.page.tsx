import React, {useEffect, useState} from "react";
import Navbar from "../components/header.component";
import Announcement from "../components/anonouncement.component";
import Footer from "../components/footer";
import Newsletter from "../components/newsletter.component";
import {Add, Remove} from "@mui/icons-material";
import styled from "styled-components";
import {mobile} from "../utils/responsive";
import {useLocation} from "react-router-dom";
import {IProduct} from "../components/products.component";
import {publicRequest} from "../utils/requestMethods";


const Product = () => {
    const location = useLocation();
    const id: string = location.pathname.split("/")[2];
    const [product, setProduct] = useState<IProduct | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")

    const handleQuantity = (type: "inc" | "dec") => {
        setQuantity(prevState => {
            if (type === "dec") {
                if (prevState > 1) {
                    return prevState - 1;
                } else {
                    return prevState;
                }
            } else {
                return prevState + 1;
            }
        });
    };


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data)
            } catch (e) {
                console.error(e);
            }
        }
        getProducts()
    }, [id])


    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product?.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>{product?.price} $</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>
                                {product && product.color && product.color.length <= 1 ? "Color" : "Colors"}
                            </FilterTitle>
                            {product?.color.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
                            ))}
                        </Filter>

                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product?.size.sort((a, b) => {
                                    const sizesOrder = ["XS", "S", "M", "L", "XL", "XXL"];
                                    return sizesOrder.indexOf(a) - sizesOrder.indexOf(b);
                                }).map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>

                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <QuantityWrapper><Remove onClick={() => handleQuantity("dec")}/></QuantityWrapper>
                            <Amount>{quantity}</Amount>
                            <QuantityWrapper><Add onClick={() => handleQuantity("inc")}/></QuantityWrapper>
                        </AmountContainer>
                        <Button>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    );
};


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({padding: "10px", flexDirection: "column"})}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height: "40vh"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;


const FilterColor = styled.div`
  width: ${(props) => (props.color === "White" ? "19px" : "20px")};
  height: ${(props) => (props.color === "White" ? "19px" : "20px")};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: ${(props) => (props.color === "White" ? "1px solid black" : "none")};
`;


const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const QuantityWrapper = styled.div`
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-left: 1rem;

  &:hover {
    background-color: #f8f4f4;
  }
`;
export default Product;
