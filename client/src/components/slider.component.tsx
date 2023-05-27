import React, {useState} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import {ISlide, sliderItems} from "../data";
import {mobile} from "../utils/responsive";

type ArrowProps = {
    direction: "left" | "right";
};

type SlideProps = {
    bg: string;
};

type WrapperProps = {
    slideIndex: number
};

const Slider: React.FC = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction: string): void => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" color="#000"/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item: ISlide) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img}/>
                        </ImgContainer>
                        <InfoContainer>
                            <InfoTitle>
                                {item.title}
                            </InfoTitle>
                            <Desc>
                                {item.desc}
                            </Desc>
                            <Button>
                                Show now
                            </Button>
                        </InfoContainer>
                    </Slide>
                ))}

            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <FontAwesomeIcon icon={faCircleArrowRight} size="2xl" color="#000"/>
            </Arrow>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  display: flex;
  transform: translateX(${props => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
`

const Arrow = styled.div<ArrowProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  border-radius: 50%;
  height: 1rem;
  z-index: 2;
`;

const Slide = styled.div<SlideProps>`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.bg};
`
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`

const Image = styled.img`
  height: 80%;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`

const InfoTitle = styled.h1`
  font-size: 70px;
  text-transform: uppercase;
`
const Desc = styled.p`
  text-transform: uppercase;
  margin: 50px 0;
  font-weight: 600;
  letter-spacing: 3px;

`
const Button = styled.button`
  text-transform: uppercase;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;

`

export default Slider;
