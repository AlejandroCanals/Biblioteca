import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () =>{

    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await login(username,password);
        
            console.log('Has iniciado sesion correctamente')

            navigate('/')

        }catch (error) {
            setMessage(error.message);
        }
    }




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

                        {message && (
                            <div>
                                <span>{message}</span>
                            </div>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
