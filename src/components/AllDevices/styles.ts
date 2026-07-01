import styled from "styled-components";


export const Container = styled.main`
    width: calc(100% - 2rem);
    min-height: 100vh;
    color: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        width: 90%;
        height: 45px;
        text-align: center;
        margin-top: 25px;
    }
`

export const SectionDevices = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    height: 100%;
    gap: 25px 30px;
    padding: 0;
`
