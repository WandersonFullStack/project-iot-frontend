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
    min-height: 750px;
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
        border: 1px solid #313244;
        border-radius: 10px;
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
        border-radius: 10px;
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
    color: #eee;
    width: 120px;
    height: 35px;
    background-color: #08692d;
    border: none;
    border-radius: 15px;
    margin-top: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;

    &:hover {
        opacity: 0.7;
    }
`

export const PopupOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justfy-content: center;
    background: rgba(0,0,0, 0.8);
    padding: 0 0 0 450px;
`

export const PopupCard = styled.div`
    width: 100%;
    max-width: 430px;
    align-items: center;
    background: #020814;
    color: #eee;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 60px rgba(0,0,0, 0.35);

    h3 {
        margin-bottom: 12px;
    }

    textarea {
        width: 95%;
        padding: 10px;
        text-align: center;
        border-radius: 10px;
        margin-top: 15px;
        border: none;
        resize: none;
        font-size: 14px;
    }

    .popup-actions {
        display: flex;
        justify-content: end;
        padding: 10px;
        gap: 15px;


        button {
            color: #000;
            background-color: #08692d;
            width: 80px;
            height: 35px;
            border: none;
            border-radius: 15px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;

            &:hover {
                opacity: 0.7;
            }
        }
    }
`