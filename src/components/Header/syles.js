import styled from "styled-components";


export const Container = styled.div`
    padding: 25px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background-color: var(--white);
    color: var(--text-color);
`
export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 80px;
        height: 80px;
    }

`
export const Menu = styled.div`
    ul {
        padding-right: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        li{
            border:1px solid var(--secondary-color);
            border-radius: 10px;
            padding: 10px;

            span{
                color: var(--text-color);
                font-weight: bold;
                font-size: 18px;
            }
            &:hover{
                font-size: 18px;
                width: 150px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: gray;
                transition: 0.3s;
                color: white;
                cursor: pointer;
            }
        }
    

`