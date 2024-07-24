import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from './AuthContext';
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/login/', {
                username,
                password
            });
            login(response.data.csrf_token); // Guarda el token en localStorage
            console.log('Inicio de sesión exitoso');
        
            // Redirecciona o realiza otras acciones después del inicio de sesión
            navigate('/');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };



    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">Iniciar Sesión</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
