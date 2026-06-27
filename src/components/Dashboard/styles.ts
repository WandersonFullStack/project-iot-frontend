import styled from "styled-components";

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #1e1e2e;
    display: flex;
    flex-direction: column;
    padding-top: 64px;
`

export const Main = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
`

export const Menu = styled.section`
    position: fixed;
    z-index: 1000;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    width: calc(100vw - 1700px);
    height: calc(100vh - 64px);
    border-right: solid #AAACAD 1px;

    h3 {
        color: #eee;
        width: 100%;
        height: 35px;
        text-align: center;
        margin-top: 25px;
        padding-bottom: 5px;
    }

    .nav-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 15px 15px 0 25px;

        a {
            border: none;
            text-decoration: none;
            color: #AAACAD;
            font-size: 14px;
            width: 97%;
            height: 30px;
            cursor: pointer;

            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border-bottom: solid #313244 1px;
            padding-top: 10px;

            &:hover{
                color: #eee;
                background: rgba(31,49,107, 0.3);
                border: none;
                transition: 0.5s;
            }
        }
    }
`

export const Content = styled.section`
    max-width: 1700px;
    width: 100%;
    min-height: 90vh;
    height: auto;
    margin-left: 220px;

`

export const AddDevicePopup = styled.div`
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0, 0.8);
`

export const AddDeviceForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    background: rgba(0,0,0, 0.8);
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