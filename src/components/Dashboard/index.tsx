import React, {  } from "react";
import { useAuth } from "../../contexts/index";

import { Header } from "../index";

export const Dashboard: React.FC = () => {

    const { user, logout } = useAuth();

    return (
        <div>
            <Header user={user} onLogout={logout} />
        </div>
    )
}