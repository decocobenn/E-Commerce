import { useState, useEffect } from 'react'
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import { mobile } from '../../src/responsive'
import { useLocation } from "react-router";
import { publicRequest } from '../requestMethods';
import { addProduct } from "../redux/cartRedux"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Zoom } from 'react-toastify';

const Container = styled.div`
`
const Wraper = styled.div`
    padding: 20px;
    display: flex;
    margin-top: 20px;
    ${mobile({
    padding: '10px',
    flexDirection: 'column',
})}
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 40vh;
    object-fit: cover;
    ${mobile({
    height: '40vh',
})}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({
    padding: '10px',
})}
`
const Title = styled.h1`
    font-weight: 200;
`
const Description = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({
    width: '100%',
})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`
    
`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
    width: '100%',
})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
    }
`

const Error = styled.span`
    color: red;
`
const PopUp = styled.div`
    display: flex;
    justify-content: space-around;
`
const DescriptionPopup = styled.div`
    display: column;
`



const Product = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [maxLimit, setMaxLimit] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await publicRequest.get(`/products/find/${id}`)
                setProduct(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        window.scrollTo(0, 0)
        getProduct()
    }, [id])

    //Handle qty of products
    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            quantity < product.amount && setQuantity(quantity + 1)
        }
    }


    // Pop Up Checkout
    const Msg = ({ closeToast, toastProps }) => (
        <div className='popup__Item'>
            <PopUp>
                <img className='popup__Image' alt='' width={"20%"} src={product.img} />
                <DescriptionPopup>
                    <p>{product.title}</p>
                    <p>qty: {quantity}</p>
                </DescriptionPopup>
            </PopUp>
        </div>
    )

    const cart = useSelector(state => state.cart.products)
    const handleClick = () => {
        let qty = 0;
        cart.forEach((item) => {
            if (item._id === id) {
                qty += item.quantity;
            }
        })
        console.log(qty);
        if (qty < product.amount) {
            if (quantity <= product.amount - qty) {
                dispatch(addProduct({ ...product, quantity, color, size }));
                toast.configure();
                console.log(toast)
                toast(<Msg />, {
                    position: "top-right",
                    autoClose: 5000,
                    transition: Zoom,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                setMaxLimit("");
            } else {
                setMaxLimit("Allowed Quantity " + (product.amount - qty))
            }
            // dispatch(addProduct({ ...product, quantity, color, size }));
        } else {
            setMaxLimit("You pick all the stock")
        }
    }
    return (
        <Container>
            <NavBar />
            <Announcement />
            <Wraper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title} - Stock({product.amount})</Title>
                    <Description>{product.description}</Description>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Colors</FilterTitle>
                            {product.color?.map((color) => (
                                <FilterColor
                                    color={color}
                                    key={color}
                                    onClick={() => setColor(color)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((size) => (
                                    <FilterSizeOption key={size}>{size}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove cursor="pointer" onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add cursor="pointer" onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                    {maxLimit && <Error>{maxLimit}</Error>}
                </InfoContainer>
            </Wraper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
