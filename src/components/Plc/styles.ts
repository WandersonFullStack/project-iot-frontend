import styled from "styled-components";


export const Container = styled.main`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
`

export const PlcHeader = styled.section`
    position: fixed;
    z-index: 900;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 98%;
    height: 2.5rem;
    border: none;
    background: #1e1e2e;
    box-shadow: 8px 0 24px rgba(0,0,0, 0.25);
`

export const Title = styled.h2`
    margin-top: 0.2rem;
    width: 15rem;
    color: #ddd;
`

export const SearchArea = styled.div`
    display: flex;
    align-items: center;
    width: 320px;
    border: mome;
    position: relative;

    input {
        width: 300px;
        height: 30px;
        border: 1px solid #313844;
        border-radius: 15px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.3s;
        background-color: #1e1e2e;
        text-align: center;
        color: #cdd6f4;
        padding: 10px;
        font-size: 14px;
        font-weight: 400;

        &:focus {
            border-color: #08692d;
        }

        &::placeholder {
            color: #6c7086;
        }
    }

    .button-search {
        margin: 0.3rem 0.5rem 0 0;
        color: #08692d;
        cursor: pointer;
        transition: color 0.3s;
        border: none;
        background: none;
        position: absolute;
        left: 0.5rem;

        &:hover {
            color: #a6adc8;
            border-color: #08692d;
        }
    }
`

export const PlcConfig = styled.nav`
    width: 18.5rem;
    height: 2rem;
    border: none;
    background: none;
`

export const ConfigContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 0.2rem;
    gap: 0.3rem;

    a {
        font-size: 14px;
        font-weight: 500;
        color: #6c7086;
        cursor: pointer;
        
        &:hover {
            color: #a6adc8;
            text-decoration: underline #08692d 0.1rem;
            transition: 0.3s;
        }
    }
`

export const DashSection = styled.section``
