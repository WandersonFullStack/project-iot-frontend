import styled from "styled-components";
// import { Link } from "react-router-dom";

export const StyleHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%
    z-index: 9999;
    background: #181825;
    padding: 0 1.5rem;
    box-shadow: 0 20px 40px rgba(0,0,0, 0.7);
`

export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    max-width: 112.5rem;
    margin: 0 auto;
`

export const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #08692d;
    border-radius: 8px;
    padding: 0.2rem;
    margin-right: 0.3rem;
    color: #fff;
`

export const BrandText = styled.div`
    h1 {
        font-size: 1rem;
        font-weight: 700;
        color: #cdd6f4;
        margin: 0;
    }

    p {
        font-size: 0.75rem;
        color: #6c7086;
        margin: 0;
    }
`

// export const DocLink = styled(Link)`
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//     color: #a6adc8;
//     text-decoration: none;
//     font-size: 0.875rem;
//     transition: color 0.2s;

//     &:hover {
//         color: #cdd6f4;
//     }
// `

export const UserArea = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #cdd6f4;
    font-size: 0.875rem;
`

export const Button = styled.button`
    background: none;
    border: 1px solid #313244;
    border-radius: 6px;
    padding: 0.4rem;
    color: #a6adc8;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.2s, border-color 0.2s;

    &:hover {
        color: #f38ba8;
        border-color: #f38ba8;
    }
`
