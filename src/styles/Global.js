import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
    *{
    margin:0;
    padding:0;
    box-sizing:border-box;    
}

    :root {
        --primary-color:rgb(2, 78, 177);
        --secondary-color:rgb(2, 24, 55);
        --text-color: rgb(0, 0, 0);
        --text-color-light: rgb(255, 255, 255);
        --background-color: #fff;
        --font-family: 'Arial', sans-serif;
        --font-size: 16px;
    }
    body {
        font-family: var(--font-family);
        font-size: var(--font-size);
        color: var(--text-color);
        background-color: var(--background-color);
    }

    ul {list-style: none;}
    a { text-decoration:none; }
`