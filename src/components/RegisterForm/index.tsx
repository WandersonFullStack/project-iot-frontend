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

interface RegisterFormProps {
    onToggleMode: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        paper: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, loading } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem');

            return;
        }

        try {
            await register({
                username: formData.username,
                email: formData.email,
                name: formData.name,
                paper: formData.paper,
                password: formData.password
            });
        } catch (error) {
            return error
        }
    };

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <h2>Criar Conta</h2>
                    <p>Cadastrar-se</p>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="username">Username</label>
                        <InputWrapper>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength={3}
                                maxLength={40}
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="email">Email</label>
                        <InputWrapper>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="name">Name</label>
                        <InputWrapper>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                minLength={2}
                                maxLength={80}
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="paper">Paper</label>
                        <InputWrapper>
                            <Input
                                id="paper"
                                name="paper"
                                type="text"
                                value={formData.paper}
                                onChange={handleChange}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <InputWrapper>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                            <PasswordToggle
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </PasswordToggle>
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <InputWrapper>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <PasswordToggle
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </PasswordToggle>
                        </InputWrapper>
                    </FormGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </SubmitButton>
                </form>

                <CardFooter>
                    <p>
                        Já tem uma conta?{' '}
                        <button onClick={onToggleMode}>
                            Fazer login
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </Wrapper>
    )
}