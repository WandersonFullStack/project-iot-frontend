import styled from "styled-components";


export const Container = styled.main`
    width: calc(100% - 2rem);
    min-height: 100vh;
    color: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

export const SectionDevices = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    height: 100%;
    gap: 20px 30px;
    padding: 1rem 0;
`
