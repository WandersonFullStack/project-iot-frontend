import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1.5rem;
`

export const Card = styled.div`
    width: 100%;
    max-width: 480px;
    background-color: #24273a;
    border: 1px solid #313244;
    border-radius: 12px;
    padding: 2rem;
`

export const CardHeader = styled.div`
    margin-bottom: 1.5rem;
    text-align: center;

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #cdd6f4;
        margin: 0 0 0.25rem;
    }

    p {
        font-size: 0.875rem;
        color: #6c7086;
        margin: 0;
    }
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;

    label {
        font-size: 0.8rem;
        font-weight: 500;
        color: #a6adc8;
    }
`

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

export const Input = styled.input`
    width: 100%;
    background-color: #1e1e2e;
    border: 1px solid #313244;
    border-radius: 8px;
    padding: 0.6rem 2.5rem 0.6rem 0.75rem;
    font-size: 0.875rem;
    color: #cdd6f4;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;

    &:focus {
        border-color: #08692d;
    }

    &::placeholder {
        color: #6c7086;
    }
`

export const PasswordToggle = styled.button`
    position: absolute;
    right: 0.6rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #6c7086;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;

    &:hover {
        color: #a6adc8;
    }
`

export const SubmitButton = styled.button`
    width: 100%;
    background-color: #08692d;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.65rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background-color 0.2s, opacity 0.2s;

    &:hover:not(:disabled) {
        background-color: #065c27;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

export const CardFooter = styled.div`
    margin-top: 1.25rem;
    text-align: center;

    p {
        font-size: 0.8rem;
        color: #6c7086;
        margin: 0;
    }

    button {
        background: none;
        border: none;
        color: #08692d;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 500;
        padding: 0;
        transition: color 0.2s;

        &:hover {
            color: #0a7d36;
        }
    }
`
