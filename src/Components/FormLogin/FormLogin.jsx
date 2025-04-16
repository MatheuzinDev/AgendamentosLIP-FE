import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import "../FormLogin/FormLogin.css"

function FormLogin() {
    return (
        <>
            <Form className='form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control className='input' type="text" placeholder="Digite sua matrícula" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className='input' type="email" placeholder="Digite seu email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control className='input' type="password" placeholder="Digite sua senha" />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link style={{textDecoration: 'none'}} to="/home"><Button
                        text='Login'
                        height='6vh'
                        fontSize='18px'
                    /></Link>
                </div>
            </Form>

        </>
    )
}

export default FormLogin
