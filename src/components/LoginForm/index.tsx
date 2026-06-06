import React, { useState } from "react";
import { useAuth } from "../../contexts/index";

interface LoginFormProps {
    onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPessword] = useState(false);
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (error) {
            return error
        }
    };

    return (
        <div>
            <div>
                <div>
                    <h2>Enter</h2>
                    <p>Access your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <div>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                             />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                             />
                            <button
                                type="button"
                                onClick={() => setShowPessword(!showPassword)}
                            >
                                {showPassword}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Entering...' : 'Enter'}
                    </button>
                </form>

                <div>
                    <p>Don't have an account?{' '}
                        <button onClick={onToggleMode} >
                            Create account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};