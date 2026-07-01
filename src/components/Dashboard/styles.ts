import styled from "styled-components";


type ContentProps = {
    $menuOpen: boolean;
};

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #1e1e2e;
    display: flex;
    flex-direction: column;
    padding-top: 4rem;
`

export const Main = styled.main`
    width: 100%;
    height: calc(100vh - 4rem);
`

export const InsertMenu = styled.aside`
    position: fixed;
    top: 4rem;
    left: 0;
    z-index: 900;
    width: 3.125rem;
    height: calc(100vh - 4rem);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 8px 0 24px rgba(0,0,0, 0.25);
    background: #1e1e2e;

    .insert-menu-button {
        background: none;
        color: #6c7086;
        transition: color 0.2s;
        cursor: pointer;
        border: none;
        width: 100%;
        height: 100%;

        &:hover {
            color: #a6adc8;
        }
    }
`

export const Menu = styled.aside`
    position: fixed;
    top: 4rem;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 17.5rem;
    height: calc(100vh - 4rem);
    background: #1e1e2e;
    box-shadow: 8px 0 24px rgba(0,0,0, 0.25);

    .nav-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
        padding: 1rem 1rem 0 1.6rem;

        .menu-link {
            border: none;
            text-decoration: none;
            color: #AAACAD;
            font-size: 14px;
            width: 95%;
            height: 1.5rem;
            cursor: pointer;

            display: flex;
            justify-content: start;
            align-items: center;
            gap: 2rem;
            padding: 0.2rem;
            transition: color 0.3s, background 0.3s;

            &:hover{
                color: #eee;
                background: rgba(31,49,107, 0.3);
            }
        }
    }
`

export const MenuTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 93%;
    max-width: 18.75rem;
    margin: 1.6rem;

    h3 {
        color: #eee;
        width: 100%;
        height: 100%;
        margin-left: 1rem;
    }

    .close-menu-button {
        background: none;
        color: #6c7086;
        cursor: pointer;
        border: none;
        transition: color 0.2s;

        &:hover {
            color: #a6adc8;
        }
    }
`

export const Content = styled.section<ContentProps>`
    max-width: ${({ $menuOpen }) => ($menuOpen ? 'calc(100% - 17.5rem)' : 'calc(100% - 3.125rem)')};
    min-height: calc(100vh - 4rem);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-left: ${({ $menuOpen }) => ($menuOpen ? '17.5rem' : '3.125rem')};
    transition: margin-left 0.3s ease, width 0.3s ease;
    padding: 1rem;
`

export const PlcList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 95%;
    max-width: 18.75rem;
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    border-top: solid #313844 1px;
    border-bottom: solid #313844 1px;

    .nav-link {
        width: 95%;
        height: 1.3rem;
        display: flex;
        align-items: center;
        padding-left: 0.5rem;
        border: none;
        background: none;
        color: #6c7086;
        cursor: pointer;
        text-decoration: none;
        transition: color 0.2s, background 0.2s;

        &:hover {
            color: #a6adc8;
            background: rgba(31,49,107, 0.3);
        }
    }

    .close-button {
        background: none;
        border: none;
        width: 97%;
        color: #6c7086;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
            color: #a6adc8;
        }
    }
`