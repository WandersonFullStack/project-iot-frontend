import styled from "styled-components";


type ContentProps = {
    $menuOpen: boolean;
};

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #1e1e2e;
    display: flex;
    flex-direction: column;
`

export const Main = styled.main`
    width: 100%;
    height: 100%;
`

export const InsertMenu = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    width: 3.125rem;
    height: 100vh;
    display: flex;
    justify-content: center;
    box-shadow: 8px 0 24px rgba(0,0,0, 0.25);
    background: #1e1e2e;

    .insert-menu-button {
        background: none;
        color: #6c7086;
        transition: color 0.2s;
        cursor: pointer;
        border: none;
        width: 2.5rem;
        height: 2.5rem;
        margin-top: 1rem;

        &:hover {
            color: #a6adc8;
        }
    }
`

export const Menu = styled.aside`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 0 1.6rem;

`

export const MenuTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 93%;
    max-width: 18.75rem;

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

export const NavLink = styled.a`
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
`

export const Content = styled.section<ContentProps>`
    max-width: ${({ $menuOpen }) => ($menuOpen ? 'calc(100% - 17.5rem)' : 'calc(100% - 3.125rem)')};
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-left: ${({ $menuOpen }) => ($menuOpen ? '17.5rem' : '3.125rem')};
    transition: margin-left 0.3s ease, width 0.3s ease;
`

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 95%;
    max-width: 18.75rem;
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    border-bottom: solid #313844 1px;

    .itrem-link {
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

    .actions-list {
        display: flex;
        align-atems: center;
        justify-content: space-evenly;
        margin-top: .5rem;
        margin-bottom: .3rem;
        gap: .2rem;
    }

    .close-button {
        background: none;
        border: none;
        width: 90%;
        color: #6c7086;
        cursor: pointer;
        transition: color 0.2s;
        

        &:hover {
            color: #a6adc8;
        }
    }
`