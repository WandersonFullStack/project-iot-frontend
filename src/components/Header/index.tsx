import { Link } from "react-router-dom";
import { Wand2, LogOut, User, BookOpen } from "lucide-react";
import type { User as UserType } from "../../types";

interface HeaderProps {
    user?: UserType | null;
    onLogout?: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {

    return (
        <header>
            <div>
                <div>
                    <div>
                        <Wand2 />
                    </div>
                    <div>
                        <h1>MagAut Broker</h1>
                        <p>Powered by MagAutomations</p>
                    </div>
                </div>

                <Link to="/doc" title="Documentation">
                    <BookOpen />
                    <span>Documentation</span>
                </Link>

                {user && (
                    <div>
                        <div>
                            <User/>
                            <span>{user.name}</span>
                        </div>
                        {onLogout && (
                            <button onClick={onLogout} title="Logout">
                                <LogOut/>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};