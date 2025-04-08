import React, {Fragment} from "react";
import { Container, Logo, Menu } from "./syles";



const Header = () => {
    return (
        <Container>
            <Logo>
                <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" alt="" />
                <h1>Imovekx</h1>
            </Logo>
            <Menu>
                <ul>
                    <li><span>Cadastro/login</span></li>
                </ul>
            </Menu>
        </Container>
    )
}


export default Header 