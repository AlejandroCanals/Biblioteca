import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/register/', {
                username,
                password1,
                password2,
            });
            console.log(response.data);
            console.log('Te has registrado con exito')
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Usuario:</label>
                                    <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password1" className="form-label">Contraseña:</label>
                                    <input type="password" id="password1" className="form-control" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password2" className="form-label">Confirmar Contraseña:</label>
                                    <input type="password" id="password2" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Registrarse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
