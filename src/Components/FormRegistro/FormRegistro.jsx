import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import api from '../../api/api';
import Spinner from '../Spinner/Spinner';
import Notification from '../Notification/Notification';
import "../FormRegistro/FormRegistro.css";

function FormRegistro({ onSuccess }) {
    const [dados, setDados] = useState({
        nome: '',
        matricula: '',
        email: '',
        senha: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/usuarios/criarUsuario', dados);
            
            showNotification('Conta criada com sucesso!', 'success');
            
            setTimeout(() => {
                onSuccess();
                setDados({
                    nome: '',
                    matricula: '',
                    email: '',
                    senha: ''
                });
            }, 1500);

        } catch (error) {
            const conflictField = error.response?.data?.message || 'dados';
            const mensagem = error.response?.status === 409 
                ? `Já existe uma conta com esta ${conflictField}`
                : 'Erro ao realizar registro';
            
            showNotification(mensagem, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Spinner />}
            
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}

            <form onSubmit={handleRegistro} className="form-registro-container">
                <Form.Group className="mb-3">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                        className='input'
                        type="text"
                        placeholder="Digite seu nome"
                        value={dados.nome}
                        onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control
                        className='input'
                        type="text"
                        placeholder="Digite sua matrícula"
                        value={dados.matricula}
                        onChange={(e) => setDados({ ...dados, matricula: e.target.value })}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className='input'
                        type="email"
                        placeholder="Digite seu email"
                        value={dados.email}
                        onChange={(e) => setDados({ ...dados, email: e.target.value })}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        className='input'
                        type="password"
                        placeholder="Crie uma senha"
                        value={dados.senha}
                        onChange={(e) => setDados({ ...dados, senha: e.target.value })}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <div className="registro-button-container">
                    <Button
                        type="submit"
                        text='Registrar'
                        height='6vh'
                        fontSize='18px'
                        disabled={loading}
                    />
                </div>
            </form>
        </>
    );
}

export default FormRegistro;