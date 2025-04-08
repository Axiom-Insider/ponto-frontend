import styled from "styled-components";

export const Container = styled.div`
    padding: 200px 150px;
    position: relative;
    background-position: center;
    background-size: cover;
    background-image: url(https://urbe.me/lab/wp-content/uploads/2016/04/file000162678218-copy-1024x682.jpg);
    
    &:before{
        background-color: rgba(0, 0, 0, 0.1); 
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        }
    `

export const Text = styled.div`
   width: 55%;
   position: relative;
   z-index: 1;

   h2{  
   color: var(--text-color);
   font-size: 62px;
   font-weight: 600;
   margin-bottom: 35px;
   } 

   p{ color: var(--text-color);
   margin-bottom: 30px;}

    span{
    background-color: var(--primary-color);
    border:0;
    color: white;
    font-weight: 600;
    padding: 15px 100px;
    font-size: 14px; 
    line-height: 24px;
    border-radius: 3px;
    cursor: pointer;
    }
`