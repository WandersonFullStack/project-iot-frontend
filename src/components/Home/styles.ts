import styled from "styled-components";
import { Link } from "react-router-dom";

import HeroImg from "../../assets/hero-img.jpeg";
import FeaturesImg from "../../assets/features-img.jpg";
import CtaImg from "../../assets/cta-img.jpg";

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #1e1e2e;
    display: flex;
    flex-direction: column;
`

/* ── Logged-in welcome screen ── */

export const WelcomeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
`

export const WelcomeCard = styled.div`
    text-align: center;
    background-color: #24273a;
    border: 1px solid #313244;
    border-radius: 12px;
    padding: 3rem 2.5rem;
    max-width: 420px;
    width: 100%;
`

export const WelcomeIcon = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #08692d20;
    border-radius: 50%;
    padding: 1rem;
    color: #08692d;
    margin-bottom: 1.25rem;
`

export const WelcomeTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #cdd6f4;
    margin: 0 0 0.5rem;
`

export const WelcomeText = styled.p`
    font-size: 0.9rem;
    color: #6c7086;
    margin: 0 0 1.5rem;
`

export const DashboardButton = styled.button`
    background-color: #08692d;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.65rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #065c27;
    }
`

/* ── Header nav (inside Home's <Header> children) ── */

export const HeaderInner = styled.header`
    max-width: 100vw;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`

export const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 100%;
    width: 17.5rem;
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

export const HomeNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a {
        color: #a6adc8;
        text-decoration: none;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        transition: color 0.2s;

        &:hover {
            color: #cdd6f4;
        }
    }
`

export const NavLink = styled(Link)`
    color: #a6adc8;
    text-decoration: none;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.2s;

    &:hover {
        color: #cdd6f4;
    }
`

/* ── Hero Section ── */

export const HeroSection = styled.section`
    padding: 0 1.5rem;
    flex: 1;

    background-image: linear-gradient(rgba(30,30,46, 0.48), rgba(30,30,46, 0.48)), url(${HeroImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

export const HeroInner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

export const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-right: 1px solid #313244;
`

export const HeroTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    color: #cdd6f4;
    line-height: 1.2;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 1.75rem;
    }
`

export const HeroAccent = styled.span`
    color: #08692d;
`

export const HeroActions = styled.div`
    display: flex;
    gap: 1rem;
`

export const PrimaryButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background-color: #08692d;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #065c27;
    }
`

export const HeroFormWrapper = styled.div`
    display: flex;
    justify-content: center;
`

/* ── Features Section ── */

export const FeaturesSection = styled.section`
    min-height: 50vh;
    padding: 0 1.5rem;

    background-image: linear-gradient(rgba(30,30,46, 0.3), rgba(30,30,46, 0.3)), url(${FeaturesImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

export const FeaturesInner = styled.div`
    max-width: 1200px;
    margin: 0.5rem auto;
`

export const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 2.5rem;

    h2 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #cdd6f4;
        margin: 0 0 0.5rem;
    }

    p {
        font-size: 0.9rem;
        color: #cdd6f4;
        margin: 0;
    }
`

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

export const FeatureCard = styled.div`
    background-color: #24273a;
    border: 1px solid #313244;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: border-color 0.2s;

    &:hover {
        border-color: #08692d;
    }

    svg {
        color: #08692d;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #cdd6f4;
        margin: 0;
    }

    p {
        font-size: 0.875rem;
        color: #6c7086;
        margin: 0;
        line-height: 1.5;
    }
`

/* ── CTA Section ── */

export const CTASection = styled.section`
    padding: 4rem 1.5rem;
    text-align: center;

    background-image: linear-gradient(rgba(30,30,46, 0.5), rgba(30,30,46, 0.5)), url(${CtaImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

export const CTAInner = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    h2 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #cdd6f4;
        margin: 0;
    }

    p {
        font-size: 0.9rem;
        color: #cdd6f4;
        margin: 0;
    }
`

/* ── Footer ── */

export const FooterEl = styled.footer`
    background-color: #181825;
    border-top: 1px solid #313244;
    padding: 2rem 1.5rem;
`

export const FooterInner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`

export const FooterBrand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #cdd6f4;
    font-weight: 600;
    font-size: 0.95rem;

    svg {
        color: #08692d;
    }
`

export const FooterCopy = styled.p`
    font-size: 0.75rem;
    color: #6c7086;
    margin: 0;
`
