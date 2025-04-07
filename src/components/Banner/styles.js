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

export const Text = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: bold;
    color: var(--primary-color);
`