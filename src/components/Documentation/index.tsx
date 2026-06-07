import React from "react";
import {
    PageWrapper,
    Content,
    PageTitle,
    PageSubtitle,
    Divider,
    Section,
    SectionTitle,
    SectionText,
} from "./styles";

// interface DocSection {
//     id: string;
//     title: string;
//     content: React.ReactNode;
// }

export const Documentation: React.FC = () => {

    return (
        <PageWrapper>
            <Content>
                <PageTitle>Documentação</PageTitle>
                <PageSubtitle>Referência técnica do MagAut Broker.</PageSubtitle>
                <Divider />
                <Section>
                    <SectionTitle>Visão Geral</SectionTitle>
                    <SectionText>
                        O MagAut Broker é uma plataforma de integração IoT que suporta os protocolos
                        MQTT e Modbus/TCP, permitindo monitorar e controlar dispositivos industriais
                        a partir de uma interface centralizada.
                    </SectionText>
                </Section>
            </Content>
        </PageWrapper>
    )
}