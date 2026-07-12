import React, { useState } from "react";
import { Shield, ArrowRight, BookOpen, CircuitBoard } from "lucide-react";

import { RegisterForm, LoginForm } from "../index";
import { useAuth } from "../../contexts/index";

import {
    PageWrapper,
    WelcomeWrapper,
    WelcomeCard,
    WelcomeIcon,
    WelcomeTitle,
    WelcomeText,
    DashboardButton,
    HeaderInner,
    Brand,
    IconWrapper,
    BrandText,
    HomeNav,
    NavLink,
    HeroSection,
    HeroInner,
    HeroContent,
    HeroTitle,
    HeroAccent,
    HeroActions,
    PrimaryButton,
    HeroFormWrapper,
    FeaturesSection,
    FeaturesInner,
    SectionHeader,
    FeaturesGrid,
    FeatureCard,
    CTASection,
    CTAInner,
    FooterEl,
    FooterInner,
    FooterBrand,
    FooterCopy,
} from "./styles";

export const Home: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { user } = useAuth();

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    if (user) {
        return (
            <WelcomeWrapper>
                <WelcomeCard>
                    <WelcomeIcon>
                        <Shield size={32} />
                    </WelcomeIcon>
                    <WelcomeTitle>Welcome, {user.name}</WelcomeTitle>
                    <WelcomeText>You are successfully logged in.</WelcomeText>
                    <DashboardButton onClick={() => window.location.href = '/dashboard'}>
                        Go to Dashboard
                    </DashboardButton>
                </WelcomeCard>
            </WelcomeWrapper>
        );
    }

    return (
        <PageWrapper>
            <HeaderInner>
                <Brand>
                    <IconWrapper>
                        <CircuitBoard size={32}/>
                    </IconWrapper>
                    <BrandText>
                        <h1>MAB View</h1>
                        <p>Powered by MagAutomations</p>
                    </BrandText>
                </Brand>
                <HomeNav>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contacts</a>
                </HomeNav>
                
                <NavLink to="/doc" title="Documentation">
                    <BookOpen />
                    <span>Documentation</span>
                </NavLink>
            </HeaderInner>

            {/* Hero Section */}
            <HeroSection>
                <HeroInner>
                    <HeroContent>
                        <HeroTitle>
                            Monitor your devices with{' '}
                            <HeroAccent>Protocol IoT</HeroAccent>
                        </HeroTitle>
                        <HeroActions>
                            <PrimaryButton onClick={() => setIsLogin(false)}>
                                Start Now
                                <ArrowRight size={16} />
                            </PrimaryButton>
                        </HeroActions>
                    </HeroContent>
                    <HeroFormWrapper>
                        {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <RegisterForm onToggleMode={toggleMode} />}
                    </HeroFormWrapper>
                </HeroInner>
            </HeroSection>

            {/* Features Section */}
            <FeaturesSection id="features">
                <FeaturesInner>
                    <SectionHeader>
                        <h2>Powerful Features</h2>
                        <p>Everything you need for your automations.</p>
                    </SectionHeader>

                    <FeaturesGrid>
                        <FeatureCard>
                            <h3>Protocol MQTT</h3>
                            <p>
                                Connect with your IoT devices.
                            </p>
                        </FeatureCard>

                        <FeatureCard>
                            <h3>Fast and Efficient</h3>
                            <p>
                                Monitor your devices quickly and easily, all in one place.
                            </p>
                        </FeatureCard>

                        <FeatureCard>
                            <h3>Protocol Modbus/TCP</h3>
                            <p>
                                Connect your PLC and monitor your industrial processes.
                            </p>
                        </FeatureCard>
                    </FeaturesGrid>
                </FeaturesInner>
            </FeaturesSection>

            {/* CTA Section */}
            <CTASection>
                <CTAInner>
                    <h2>Ready to begin?</h2>
                    <p>
                        Create your free account and start monitoring your devices today!
                    </p>
                    <PrimaryButton onClick={() => setIsLogin(false)}>
                        Create account
                    </PrimaryButton>
                </CTAInner>
            </CTASection>

            {/* Footer */}
            <FooterEl>
                <FooterInner>
                    <FooterBrand>
                        <CircuitBoard size={18} />
                        <span>MAB View</span>
                    </FooterBrand>
                    <FooterCopy>
                        © 2026 MAB View IoT. | Todos os direitos reservados.
                    </FooterCopy>
                </FooterInner>
            </FooterEl>
        </PageWrapper>
    )
}