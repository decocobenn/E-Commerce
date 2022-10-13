import { Facebook, Instagram, Mail, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"
import { mobile } from "../../src/responsive";

const Container = styled.div`
    display: flex;
    ${mobile({
        flexDirection: "column",
    })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
`
const Description = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`


const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        display: "none"
    })}
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        backgroundColor: "#fff8f8",
    })}
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>GENIUS.</Logo>
                <Description>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi nam velit similique voluptatum qui officiis veritatis consequuntur, deserunt ullam! Praesentium?
                </Description>
                <SocialContainer>
                    <SocialIcon color="3B5999" ><Facebook /></SocialIcon>
                    <SocialIcon color="3B5999" ><Instagram /></SocialIcon>
                    <SocialIcon color="3B5999" ><Twitter /></SocialIcon>
                    <SocialIcon color="3B5999" ><Pinterest /></SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>About Us</ListItem>
                    <ListItem>Contact Us</ListItem>
                    <ListItem>Privacy Policy</ListItem>
                    <ListItem>Terms of Use</ListItem>
                    <ListItem>FAQ</ListItem>
                    <ListItem>Sitemap</ListItem>
                    <ListItem>Careers</ListItem>
                    <ListItem>Blog</ListItem>
                    <ListItem>Press</ListItem>
                    <ListItem>Sell on Genius</ListItem>
                </List>
            </Center>
            <Right>
                Contact
                <ContactItem><Room style={{ marginRight:"10px" }}/>
                    Here Goes Adress, 2244, New York, NY
                </ContactItem>
                <ContactItem><Phone style={{ marginRight:"10px" }}/>
                    +1 (234) 567-8901
                </ContactItem>
                <ContactItem><Mail style={{ marginRight:"10px" }}/>
                    123@email.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer
