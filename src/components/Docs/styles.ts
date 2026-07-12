import styled from "styled-components";

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #1e1e2e;
    display: flex;
    flex-direction: column;
`

export const Content = styled.main`
    flex: 1;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
`

export const PageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #cdd6f4;
    margin: 0 0 0.5rem;
`

export const PageSubtitle = styled.p`
    font-size: 0.9rem;
    color: #6c7086;
    margin: 0 0 2.5rem;
`

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #313244;
    margin: 2rem 0;
`

export const Section = styled.section`
    margin-bottom: 2.5rem;
`

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: #cdd6f4;
    margin: 0 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #313244;
`

export const SectionText = styled.p`
    font-size: 0.9rem;
    color: #a6adc8;
    line-height: 1.7;
    margin: 0;
`
