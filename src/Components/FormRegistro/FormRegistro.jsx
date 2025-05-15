import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import "../FormRegistro/FormRegistro.css";

function FormRegistro({ onSuccess }) {

    const [dados, setDados] = useState({
        nome: '',
        matricula: '',
        email: '',
        senha: ''
    });
    const [loading, setLoading] = useState(false);

    const handleRegistro = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/usuarios/criarUsuario', dados);
            
            if (response.status === 201) {
                onSuccess(); 
                setDados({ 
                    nome: '',
                    matricula: '',
                    email: '',
                    senha: ''
                });
            }
            
        } catch (error) {
            let mensagem = 'Erro ao realizar registro';
            
            if (error.response) {

                console.error('Erro completo:', error.response);
                
                if (error.response.status === 409) {
                    mensagem = `Já existe uma conta com este ${error.response.data.message}`;
                } else {
                    mensagem = error.response.data.error || mensagem;
                }
            }
            alert(mensagem);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
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
                        disabled={loading} />
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

                <div className="registro-button-container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        text={loading ? 'Carregando...' : 'Registrar'}
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
