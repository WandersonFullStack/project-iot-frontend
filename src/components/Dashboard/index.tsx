import React from "react";
import { useAuth } from "../../contexts/index";
import { Header } from "../index";
import { PageWrapper, Content } from "./styles";

export const Dashboard: React.FC = () => {

    const { user, logout } = useAuth();

    return (
        <PageWrapper>
            <Header user={user} onLogout={logout} />
            <Content>
            </Content>
        </PageWrapper>
    )
}