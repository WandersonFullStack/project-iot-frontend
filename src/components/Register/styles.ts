import styled from "styled-components";

export const Container = styled.div`
    min-width: 100%;
    height: 17.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Card = styled.div`
    min-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid #313348 1px;
    border-radius: 1rem;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.7);
    color: #ddd;

    &:hover {
        border: solid #86c62d 1px;
        transition: 0.3s;
    }
`
