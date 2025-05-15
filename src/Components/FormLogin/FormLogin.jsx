import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Spinner from '../Spinner/Spinner';
import Notification from '../Notification/Notification';
import "../FormLogin/FormLogin.css";

function FormLogin() {
    const [dados, setDados] = useState({ matricula: '', senha: '' });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ 
        show: false, 
        message: '', 
        type: '' 
    });
    const navigate = useNavigate();

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', dados);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.usuario));
            
            showNotification('Login realizado com sucesso!', 'success');
            setTimeout(() => navigate('/home'), 1500);

        } catch (error) {
            const mensagem = error.response?.data?.error || 'Erro ao realizar login';
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

            <form onSubmit={handleLogin} className="form-login-container">
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
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        className='input'
                        type="password"
                        placeholder="Digite sua senha"
                        value={dados.senha}
                        onChange={(e) => setDados({ ...dados, senha: e.target.value })}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <div className="login-button-container">
                    <Button
                        type="submit"
                        text='Login'
                        height='6vh'
                        fontSize='18px'
                        disabled={loading}
                    />
                </div>
            </form>
        </>
    );
}

export default FormLogin;