import React, { useState } from "react";
import { useAuth } from "../../contexts/index";

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
        <div>
            <div>
                <div>
                    <h2>Criar Conta</h2>
                    <p>Cadastrar-se</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <div>
                            <input 
                                type="text" 
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength={3}
                                maxLength={40}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input 
                                type="email" 
                                value={formData.email} 
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                             />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name">Name</label>
                        <div>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={handleChange}
                                required
                                minLength={2}
                                maxLength={80}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="paper">Paper</label>
                        <div>
                            <input 
                                type="text" 
                                value={formData.paper}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8} 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Confirm Password</label>
                        <div>
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </button>
                </form>

                <div>
                    <p>
                        Já tem uma conta?{' '}

                        <button onClick={onToggleMode}>
                            Fazer login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}