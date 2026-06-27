import styled from "styled-components";


export const Container = styled.main`
    width: 100%;
    height: 100%;
    color: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        border-bottom: solid #313244 1px;
        box-shadow-bottom: 5px 2px rgba(0,0,0, 0.7)
    }
`

export const SectionDevices = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 1600px;
    height: 100%;
    gap: 25px 30px;
    margin-top: 15px;
    padding: 0;
`
