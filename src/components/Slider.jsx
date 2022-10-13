import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import axios from 'axios';
import { mobile } from "../../src/responsive";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
        display: "none",
    })}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position : absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};
`;
const ImgContainer = styled.div`
    flex:1;
`;

const Image = styled.img`
    height: 80%;
    width: 100%;
    object-fit: relative;
`

const InfoContainer = styled.div`
    flex:1;
    padding: 50px;
`;

const Tittle = styled.h1`
    font-size: 70px;
`
const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`



const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [sliderItems, setSliderItems] = useState([]);

    // API call
    useEffect(() => {
        const getSlides = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL + "/api/slides");
                setSliderItems(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getSlides();
    }, [])

    console.log(process.env.REACT_APP_API_URL)
    // Slider Functionality
    const handleClick = (direction, nItems) => {
        
        if(direction === "left"){
            setSlideIndex(slideIndex > 0  ? slideIndex - 1 : nItems - 1);
        } else {
            setSlideIndex(slideIndex < nItems - 1  ? slideIndex + 1 : 0);
        }
    };
    // Length of the slider
    const nItems = sliderItems.length;
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left", nItems)}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => (
                    <Slide key={ item.id } bg={item.bg}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Tittle>{item.title}</Tittle>
                            <Description>{item.description}</Description>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>

                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right", nItems)}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}



export default Slider
//https://i.ibb.co/XsdmR2c/1.png
