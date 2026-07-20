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

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;    
    }
`

export const MetricsCard = styled.div`
    width: 100%;
    height: 70%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: #6c7086;
        font-size: 0.85rem;
    }
`

export const ContentMetric = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 1.5rem;
`

export const ContentCard = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
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

export const PopupOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
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

export const MessagesTable = styled.div`
    width: calc(100% - 5rem);
    max-width: 1600px;
    height: 45vh;
    padding: 0 1rem;
`

export const Table = styled.table`
    border-collapse: collapse;
    border: 2px solid #6c7086;
    font-family: sans-serif;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #a6adc8;
    width: 100%;
    max-height: 40vh;
    box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.35);
`

export const TableHead = styled.thead`
    background-color: rgba(57, 61, 77, 0.8);
    height: 0.5rem;
`

export const TableContent = styled.tr`
    &:nth-of-type(even) {
        background-color: rgb(160 160 160);
    }
`

export const TableItem = styled.th`
    border: 1px solid rgb(160 160 160);
    padding: 5px 8px;
    width: 14.285rem;
`

export const TableBody = styled.tbody`
    height: 100%;
    overflow: auto;
`

export const TableValue = styled.td`
    border: 1px solid rgb(160 160 160);
    padding: 5px 8px;
    width: 14.285rem;
    text-align: center;
`