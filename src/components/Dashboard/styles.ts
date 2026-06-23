import styled from "styled-components";

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #1e1e2e;
    display: flex;
    flex-direction: column;

`

export const Main = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: space-evnly;
    width: 100%;
    min-height: auto;
`

export const Menu = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    width: 100%;
    min-height: 90vh;
    height: auto;
    border-hight: solid #313244 1px;

    a {
        border: none;
        text-decoration: none;
        color: #ddd;
        font-size: 14px;
        width: 100%;
        height: 15px;
        cursor: pointer;

        &:hover{
            color: #fff;
        }
        
    }
`

export const Content = styled.section`
    max-width: auto;
    width: 100%;
    min-height: 90vh;
    height: auto;
    margin: 0 auto;

`

export const AddDevicePopup = styled.div`
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0, 0.6);
`

export const AddDeviceForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 350px;
`

export const ClosePopup = styled.button`
    width: 35px;
    color: #ddd;
    border: none;
    cursor: pointer;
    background: transparent;
    margin-top: 15px;
    font-size: 14px;

    &:hover {
        color: #fff;
    }
`