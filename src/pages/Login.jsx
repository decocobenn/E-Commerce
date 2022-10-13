import styled from "styled-components";
import { mobile } from '../../src/responsive'
import { useState } from 'react';
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wraper = styled.div`
    width: 25%;  
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    ${mobile({
        width: '75%'
    })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    font-color: white;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`
const Link = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const {isFetching, error} = useSelector((state) => state.user)

    const handleLogin = (e) => {
        e.preventDefault()
        login(dispatch, {username, password})
    }
    return (
        <Container>
            <Wraper>
                <Title>SIGN IN</Title>
                <Form>

                    <Input placeholder="username" 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleLogin}
                    disabled={isFetching}>
                    LOGIN</Button>
                    {error && <Error>Something Went Wrong</Error>}
                    <Link>DO NOT REMEMBER YOUR PASSWORD?</Link>
                    <Link>CREATE NEW ACCOUNT</Link>
                </Form>
            </Wraper>
        </Container>
    )
}

export default Login
