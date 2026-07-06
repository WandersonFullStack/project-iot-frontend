import styled from "styled-components";

export const ButtonCancel = styled.button`
    width: 2rem;
    height: 2rem;
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: 600;
    color: #6c7086;
    cursor: pointer;
    transition: color .3s;
    position: fixed;
    right: 1rem;
    top: 7rem;

    &:hover {
        color: #c72a44;
    }
`