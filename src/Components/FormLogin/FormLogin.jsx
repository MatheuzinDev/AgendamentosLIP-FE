import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // Importe o Axios configurado
import "../FormLogin/FormLogin.css";

function FormLogin() {
    const [dados, setDados] = useState(
        { matricula: '', senha: '' }
    );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', dados);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.usuario));
            navigate('/home');

        } catch (error) {
            let mensagem = 'Erro ao realizar login';

            if (error.response) {
                mensagem = error.response.data.error || mensagem;
            }

            alert(mensagem);
        } finally {
            setLoading(false);
        }
    };

    return (
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

            <div className="login-button-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    text={loading ? 'Carregando...' : 'Login'}
                    height='6vh'
                    fontSize='18px'
                    disabled={loading}
                />
            </div>
        </form>
    );
}

export default FormLogin;