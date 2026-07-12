import styled from "styled-components";

export const StyleHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    width: 17.5rem;
    height: 100vh;
    background: #1e1e2e;
    box-shadow: 8px 0 24px rgba(0,0,0, 0.25);
`

export const HeaderInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    margin: 0 auto;
`

export const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 4rem;
    width: 100%;
    margin-left: 1rem;
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


export const UserArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #cdd6f4;
    font-size: 0.875rem;
    margin-left: .5rem;
`

export const LogoutButton = styled.button`
    background: none;
    border: 1px solid #313244;
    border-radius: 6px;
    padding: 0.4rem;
    margin-right: .4rem;
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
