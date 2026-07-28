import styled from "styled-components";

type StatusProps = {
    $isStatus?: boolean;
};

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

`

export const HeaderDevice = styled.div`
    width: calc(100% - 5rem);
    height: 2.5rem;
    padding: 1rem 2.5rem;
`

export const HinnerHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.3rem;
    border-radius: 0.5rem;

    h3 {
        width: 5rem;
        text-align: center;
        color: #a6adc8;
        font-size: 24px;
    }

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 19.5rem;    
    }
`

export const Status = styled.span<StatusProps>`
    color: ${({$isStatus}) => ($isStatus ? 'red' : 'green')};
    font-size: 16px;
    text-align: center;
    width: 7.5rem;
    margin-left: 1rem;
`

export const ContentMetric = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 17.5rem;
    height: 13.5rem;
    margin-top: 1rem;
`

export const Button = styled.button`
    color: #6c7086;
    height: 35px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    border: none;
    background: none;
    transition: color .3s;

    &:hover {
        color: #a6adc8;
        text-decoration-line: underline;
        text-decoration-style: dashed;
        text-decoration-color: #08692d;
        text-decoration-thickness: 2px;
        text-underline-offset: 5px;
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
    max-height: 50vh;
    margin-bottom: 1rem;
    border: solid #6c7086 1px;
    overflow: auto;
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
        background-color: rgb(57 61 77);
    }
`

export const TableItem = styled.th`
    border: 1px solid rgb(160 160 160);
    padding: 5px 8px;
    width: 14.285rem;
`

export const TableBody = styled.tbody`
    height: 100%;
`

export const TableValue = styled.td`
    border: 1px solid rgb(160 160 160);
    padding: 5px 8px;
    width: 14.285rem;
    text-align: center;
`