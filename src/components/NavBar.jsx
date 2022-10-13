import React from 'react'
import styled from 'styled-components'
import { Search } from '@material-ui/icons/';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { mobile } from '../../src/responsive'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Logout } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
    height: 60px;
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 100;
    ${mobile({
    height: '50px',
})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
    padding: '10px 0px',
})}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
    justifyContent: 'center',
    flex: '2',
})}
`

const Lenguaje = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
    display: 'none',
})}
    `

const Input = styled.input`
    border: none;
    ${mobile({
    width: '50%',
})}
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({
    fontSize: '24px',
})}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    `

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({
    fontSize: '12px',
    marginLeft: '10px',
})}
`
const NavBar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()

    const signOut = () => {
        Logout(dispatch);
        console.log('signout')
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Lenguaje>
                        EN
                    </Lenguaje>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <Search style={{ color: "gray", fontsize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to='/' style={{ textDecoration: 'none', color: "black" }}>
                        <Logo>GENIUS.</Logo>
                    </Link>
                </Center>
                <Right>
                    {!user && <Link to='/register' style={{ textDecoration: 'none', color: "black" }}>
                        <MenuItem>REGISTER</MenuItem>
                    </Link>}
                    {!user ? <Link to='/login' style={{ textDecoration: 'none', color: "black" }}>
                    <MenuItem>SIGN IN</MenuItem>
                    </Link>: <MenuItem onClick={signOut}>SIGN OUT </MenuItem>}
                    <Link to="/cart" style={{ textDecoration: 'none', color: "black" }}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>

                </Right>
            </Wrapper>
        </Container>
    )
}

export default NavBar
