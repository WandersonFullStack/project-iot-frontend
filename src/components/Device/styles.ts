import styled from "styled-components";

type StatusProps = {
    $isStatus?: boolean;
}

export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 100%;
    max-width: 1600px;
    margin: 10px;
    height: 230px;
    
    border: 2px solid transparent;
    border-radius: 15px;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    background-image: 
        linear-gradient(rgb(59, 59, 61), rgb(41, 40, 40)), 
        linear-gradient(to right, #08692d, #861eee);
    box-shadow: 5px 15px 30px rgba(0,0,0, 0.6);
`

export const CardDevice = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    height: 100%;
    background: rgba(0,0,0, 0.4);
    border-radius: 15px;

    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 5px;
        border-bottom: 1px solid #AAACAD;

        .info {
            cursor: pointer;
            background: transparent;
            position: relative;
            padding: 6px 8px 0 0;
                
            &:hover::after {
                content: attr(data-tooltip);
                position: absolute;
                top: -32px;
                left: 50%;
                transform: translateX(-50%);
                background: #555;
                color: #eee;
                padding: 4px 8px;
                border-radius: 6px;
                white-space: nowrap;
                font-size: 14px;
            }
        }

    }
`

export const TitleDevice = styled.h3`
    width: 100%;
    padding: 5px 0 0 25px;
`

export const Status = styled.span<StatusProps>`
    color: ${({$isStatus}) => ($isStatus ? 'red' : 'green')};
    
    text-align: center;
    width: 250px;
    padding: 10px;

`
