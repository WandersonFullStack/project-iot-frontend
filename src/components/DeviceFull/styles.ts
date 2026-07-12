import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

`

export const ContentSection = styled.div`
    width: calc(100% - 5rem);
    height: 50vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1rem 2.5rem;
`

export const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.3rem;
    border-radius: 0.5rem;

    .content {
        width: 90%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;
        gap: 1rem;
    }

    h3 {
        margin-bottom: 0.5rem;
        color: #6c7086;
    }
`

export const MetricsCard = styled.div`
    width: 80%;
    height: 70%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid #313348 1px;
    border-radius: 0.5rem;
    box-shadow: 0 5px 35px rgba(0,0,0, 0.5);
`

export const ContentCard = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    border: solid #313348 1px;
    border-radius: 0.5rem;
    box-shadow: 0 5px 35px rgba(0,0,0, 0.5);

    ul {
        width: 100%;
        margin: 0;
        padding-left: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        color: #a6adc8;

        li {
            line-height: 1.4;
        }
    }

    p {
        color: #a6adc8;
    }
`

export const Button = styled.button`
    color: #6c7086;
    width: 180px;
    height: 35px;
    border: solid #08692d 1px;
    border-radius: 5px;
    margin-top: 1rem;
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