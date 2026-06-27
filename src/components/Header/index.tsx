import { CircuitBoard, LogOut, User } from "lucide-react";
import type { User as UserType } from "../../types";
import { StyleHeader, HeaderInner, Brand, IconWrapper, BrandText, UserArea, UserInfo, Button } from "./styles"

interface HeaderProps {
    user?: UserType | null;
    onLogout?: () => void;
    children?: React.ReactNode;
}

export const Header = ({ user, onLogout, children }: HeaderProps) => {

    return (
        <StyleHeader>
            <HeaderInner>
                <Brand>
                    <IconWrapper>
                        <CircuitBoard size={32}/>
                    </IconWrapper>
                    <BrandText>
                        <h1>MagAut Broker</h1>
                        <p>Powered by MagAutomations</p>
                    </BrandText>
                </Brand>

                {children}

                {user && (
                    <UserArea>
                        <UserInfo>
                            <User/>
                            <span>{user.name}</span>
                        </UserInfo>
                        {onLogout && (
                            <Button onClick={onLogout} title="Logout">
                                <LogOut/>
                            </Button>
                        )}
                    </UserArea>
                )}
            </HeaderInner>
        </StyleHeader>
    );
};