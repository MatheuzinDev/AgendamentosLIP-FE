import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import "../FormRegistro/FormRegistro.css";

function FormRegistro() {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control className='input' type="text" placeholder="Digite seu nome" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control className='input' type="text" placeholder="Digite sua matrícula" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control className='input' type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control className='input' type="password" placeholder="Crie uma senha" />
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link style={{ textDecoration: 'none' }} to="/home">
                    <Button
                        text='Registrar'
                        height='6vh'
                        fontSize='18px'
                    />
                </Link>
            </div>
        </>
    );
}

export default FormRegistro;
