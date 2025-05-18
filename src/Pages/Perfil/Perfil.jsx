import { useState, useEffect } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import Button from "../../Components/Button/Button";
import "./Perfil.css";
import ImgPerfil from "../../assets/do-utilizador.png";
import api from '../../api/api';
import Notification from '../../Components/Notification/Notification';
import Spinner from '../../Components/Spinner/Spinner';
import ModalSenha from '../../Components/ModalSenha/ModalSenha';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [showModalSenha, setShowModalSenha] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarPerfil = async () => {
            try {
                const response = await api.get('/usuarios/perfil', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setUsuario(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    showNotification('Erro ao carregar dados do perfil', 'error');
                }
            } finally {
                setLoading(false);
            }
        };

        carregarPerfil();
    }, [navigate]);

    const handleAlterarSenha = async (dados) => {
        try {
            const response = await api.put(
                '/usuarios/alterarSenha',
                dados,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            showNotification('Senha alterada com sucesso!', 'success');
            setShowModalSenha(false);

        } catch (error) {
            let mensagem = '';

            if (error.response) {
                mensagem = error.response.data.error || 'Erro ao alterar senha';
            } else if (error.request) {
                mensagem = 'Sem conexão com o servidor';
            } else {
                mensagem = 'Erro ao configurar a requisição';
            }

            showNotification(mensagem, 'error');
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
    };

    if (loading) return <Spinner />;

    return (
        <div className="page-container-perfil">
            {isMobile ? (
                <div className="topbar-perfil">
                    <div className="left-topbar">
                        <HamburgerMenu />
                        <h1 className="titulo-pagina mobile-title">Perfil</h1>
                    </div>
                    <img src={ImgPerfil} alt="Perfil" className='icone-perfil' />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="navbar-spacer"></div>
                </>
            )}

            <div className="perfil-container">
                {usuario && (
                    <div className="perfil-content">
                        <div className="perfil-header">
                            <div className="avatar-grande">
                                <img src={ImgPerfil} alt="Avatar" />
                            </div>
                            <h2 className="nome-usuario">{usuario.nome}</h2>
                            <p className="tipo-usuario">
                                {usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1).toLowerCase()}
                            </p>
                        </div>

                        <div className="info-container">
                            <div className="info-card">
                                <label>Matrícula</label>
                                <p>{usuario.matricula}</p>
                            </div>

                            <div className="info-card">
                                <label>E-mail</label>
                                <p>{usuario.email}</p>
                            </div>
                        </div>

                        <div className="seguranca-section">
                            <h3 className="section-title">Segurança</h3>
                            <Button
                                text="Alterar Senha"
                                padding="1rem 2rem"
                                borderRadius="8px"
                                backgroundColor="#3b82f6"
                                color="white"
                                onClick={() => setShowModalSenha(true)}
                            />
                        </div>
                    </div>
                )}

                <ModalSenha
                    show={showModalSenha}
                    onClose={() => setShowModalSenha(false)}
                    onSave={handleAlterarSenha}
                />

                {notification.show && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification({ ...notification, show: false })}
                    />
                )}
            </div>
        </div>
    );
};

export default Perfil;