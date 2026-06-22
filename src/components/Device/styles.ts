import styled from "styled-components";


export const Card = styled.div`
    max-width: 100%;
    height: auto;

    
`

export const CardCreate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid #6c7086 1px;
    width: 280px;
    min-height: 320px;
    border-radius: 10px;
    color: #ddd;

    h2 {
        color: #08692d;
        margin: 20px 0;
        border-bottom: solid 1px #6c7086;
    }
    
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 90%;
    }
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 5px;
    width: 100%;

    input {
        border: none;
        border-radius: 10px;
        text-align: center;
        width: 100%;
        height: 35px;
        font-size: 16px;
    }
    
`

export const CreateButton = styled.button`
    color: #eee;
    width: 120px;
    height: 30px;
    background-color: #08692d;
    border: none;
    border-radius: 15px;
    margin-top: 5px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`