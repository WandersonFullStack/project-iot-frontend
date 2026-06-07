import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Code, Zap, Shield, ArrowRight, BookOpen } from "lucide-react";

import { RegisterForm, LoginForm, Header } from "../index";
import { useAuth } from "../../contexts/index";

export const Home: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { user } = useAuth();

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    if (user) {
        return (
            <div>
                <div>
                    <div>
                        <Shield />
                    </div>

                    <h2>Welcome, {user.name}</h2>
                    <p>You are successfully logged in.</p>

                    <button onClick={() => window.location.href = '/dashboard'}>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header>
                <div>
                    <div>
                        <div>
                            <Sparkles />
                            <h1>Magaut Broker</h1>
                        </div>

                        <nav>
                            <a href="#features">Features</a>
                            <Link to="/doc" >
                                <BookOpen />
                                Documentation
                            </Link>
                            <a href="#about">About</a>
                            <a href="#contact">Contacts</a>
                        </nav>
                    </div>
                </div>
            </Header>

            {/* Hero Section */}
            <section>
                <div>
                    <div>
                        <div>
                            <h1>
                                Monitor your devices with{' '}
                                <span>Protocol IoT</span>
                            </h1>
                            <div>
                                <button onClick={() => setIsLogin(false)}>
                                    Start Now
                                    <ArrowRight />
                                </button>
                            </div>
                        </div>
                        <div>
                            {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <RegisterForm onToggleMode={toggleMode} />}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features">
                <div>
                    <div>
                        <h2>Powerful Features</h2>
                        <p>Everything you need for your automations.</p>
                    </div>

                    <div>
                        <div>
                            <div>
                                <Code />
                                <h3>Protocol MQTT</h3>
                                <p>
                                    Connect with your IoT devices.
                                </p>
                            </div>

                            <div>
                                <div>
                                    <Zap />
                                </div>
                                <h3>Fast and Efficient</h3>
                                <p>
                                    Monitor your devices quickly and easily, all in one place.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <Shield />
                                <h3>Protocol Modbus/TCP</h3>
                                <p>
                                    Connect your PLC and monitor your industrial processes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section>
                <div>
                    <h2>
                        Ready to begin?
                    </h2>
                    <p>
                        Create your free account and start monitoring your devices today!
                    </p>
                    <button onClick={() => setIsLogin(false)}>
                        Create account
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div>
                    <div>
                        <div>
                            <Sparkles />
                            <h3>Magaut Broker</h3>
                        </div>
                        <p>
                            © 2026 Magaut Broker IoT. | Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}