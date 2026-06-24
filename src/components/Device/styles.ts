import styled from "styled-components";


export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 100%;
    
    border: 2px solid transparent;
    border-radius: 15px;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    background-image: 
        linear-gradient(rgba(0,0,0, 1), rgba(0,0,0, 0.8)), 
        linear-gradient(to right, #08692d, #861eee);
`

export const CardDevice = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(0,0,0, 0.6);
`