import styled from "styled-components";

type StatusProps = {
    $isStatus?: boolean;
};


export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 95%;
    height: 250px;
    margin: 10px;
    
    border: 2px solid transparent;
    border-radius: 15px;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    background-image: 
        linear-gradient(rgb(59, 59, 61), rgb(41, 40, 40)), 
        linear-gradient(to right, #1d492e, #095a28);
    box-shadow: 5px 15px 30px rgba(0,0,0, 0.6);
`

export const CardDevice = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.4);
    border-radius: 15px;

    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 5px;
        border-bottom: 1px solid #313844;
    }

    .chart-container {
        width: calc(100% - 1rem);
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const TitleDevice = styled.h3`
    width: 14.375rem;
    padding: 5px 0 0 25px;
`

export const Status = styled.span<StatusProps>`
    color: ${({$isStatus}) => ($isStatus ? 'red' : 'green')};
    
    text-align: center;
    width: 7.5rem;
    margin-top: .3rem;
`

export const FooterDevice = styled.footer`
    width: 100%;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: row;
    gap: 1rem;
    border-top: 1px solid #313844;

    h3 {
        font-size: 1rem;
        color: #a6adc8;
    }

    p {
        color: #6c7086;
        text-align: center;
        font-size: 1rem;
        margin-left: 1rem;
    }

`

export const TrashButton = styled.button`
    width: 2rem;
    border: none;
    background: none;
    margin-top: .2rem;
    cursor: pointer;
    color: #6c7086;
    transition: color 0.2s;

    &:hover {
        color: #c92a3f;
    }
`