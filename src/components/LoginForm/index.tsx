import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/index";
import {
    Wrapper,
    Card,
    CardHeader,
    FormGroup,
    InputWrapper,
    Input,
    PasswordToggle,
    SubmitButton,
    CardFooter,
} from "./styles";

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
        <Wrapper>
            <Card>
                <CardHeader>
                    <h2>Enter</h2>
                    <p>Access your account</p>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="username">Username</label>
                        <InputWrapper>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <InputWrapper>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <PasswordToggle
                                type="button"
                                onClick={() => setShowPessword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </PasswordToggle>
                        </InputWrapper>
                    </FormGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Entering...' : 'Enter'}
                    </SubmitButton>
                </form>

                <CardFooter>
                    <p>Don't have an account?{' '}
                        <button onClick={onToggleMode}>
                            Create account
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </Wrapper>
    );
};