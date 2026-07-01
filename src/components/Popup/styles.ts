import styled from "styled-components";

export const ContainerPopup = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0, 0.8);
` 

export const PopupForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 320px;
    min-height: 380px;
    height: auto;
    border-radius: 15px;
`