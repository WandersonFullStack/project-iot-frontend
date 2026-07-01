import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 90vh;
`

export const PlcHeader = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-itrems: center;
    width: 95%;
    max-width: 1700px;
    height: 45px;
    margin-top: 15px;
    color: #ddd;
`

export const Title = styled.h2`
    margin-top: 15px;
    width: 100%;
    text-align: center;
`

export const SearchArea = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

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
        left: 0.5rem;
        top: 0.7rem;
        color: #08692d;
        cursor: pointer;
        transition: color 0.3s;
        border: none;
        background: none;

        &:hover {
            color: #a6adc8;
        }
    }
`

export const ConfigButton = styled.button`
    background: none;
    color: #6c7086;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    transition: color 0.3s;
    width: 40px;
    height: 30px;
    text-align: center;

    &:hover {
        color: #a6adc8;
    }
`

export const PlcConfig = styled.nav`
    
`

export const ConfigContent = styled.div``

export const DashSection = styled.section``