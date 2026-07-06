import styled from "styled-components";


export const CardUpdate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 90vh;
    border: none;
    position: fixed;

    h2 {
        color: #08692d;
        margin: 20px 0;
        border-bottom: solid 1px #6c7086;
    }
    
    form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        gap: 45px 25px;
        width: 80%;
        margin-top: 2rem;
        color: #cdd6f4;
    }

`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 5px;
    width: 100%;

    input {
        border: 1px solid #313244;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        height: 35px;
        font-size: 16px;
        font-weight: 450;
        padding: 0 5px;
        outline: none;
        background: rgba(50,50,50, 0.5);
        color: #cdd6f4;
        box-sizing: border-box;
        transition: border-color 0.2s;
        
        &:focus {
            border-color: #08692d;
        }

        &::placehouder {
            color: #6c7086;
        }
    }

    select {
        border: 1px solid #313244;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        height: 35px;
        font-size: 16px;
        background: rgba(50,50,50, 0.5);
        color: #cdd6f4;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
            border-color: #08692d;
        }

        &::placehouder {
            color: #6c7086;
        }
    }
    
`

export const CreateButton = styled.button`
    color: #6c7086;
    width: 180px;
    height: 35px;
    border: solid #08692d 1px;
    border-radius: 5px;
    margin-top: 5rem;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    background: none;
    transition: color .3s, background 0.3s;

    &:hover {
        color: #a6adc8;
        background: #08692d;
    }
`
