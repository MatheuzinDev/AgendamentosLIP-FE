import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import "../Historico/Historico.css";
import ImgPerfil from "../../assets/do-utilizador.png";
import Button from "../../Components/Button/Button";
import CardAgendamento from '../../Components/CardAgendamento/CardAgendamento';
import api from '../../api/api';
import Spinner from '../../Components/Spinner/Spinner';
import Notification from '../../Components/Notification/Notification';
import EmptyState from '../../assets/empty.png'

const Historico = () => {
    const isMobile = useIsMobile();
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [filtroAtivo, setFiltroAtivo] = useState('all');

    useEffect(() => {
        const carregarAgendamentos = async () => {
            try {
                setLoading(true);
                let status;
                switch (filtroAtivo) {
                    case 'pending': status = 'PENDENTE'; break;
                    case 'accepted': status = 'ACEITO'; break;
                    case 'rejected': status = 'REJEITADO'; break;
                    default: status = undefined;
                }

                const { data } = await api.get(`/agendamentos/meusAgendamentos${status ? `?status=${status}` : ''}`);
                setAgendamentos(data);
            } catch (error) {
                showNotification('Erro ao carregar agendamentos', 'error');
            } finally {
                setLoading(false);
            }
        };

        carregarAgendamentos();
    }, [filtroAtivo]);

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    };

    return (
        <div className="page-container-historico">
            {isMobile ? (
                <div className="topbar-historico">
                    <div className="left-topbar">
                        <HamburgerMenu />
                        <h1 id='titulo' className="titulo-pagina mobile-title">Meus Agendamentos</h1>
                    </div>
                    <img src={ImgPerfil} alt="Perfil" className='icone-perfil' />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="navbar-spacer"></div>
                </>
            )}

            <div className="historico-container">
                <div className="filtros">
                    <Button
                        text="Todos"
                        onClick={() => setFiltroAtivo('all')}
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor={filtroAtivo === 'all' ? "#3b82f6" : "#e2e8f0"}
                        color={filtroAtivo === 'all' ? "white" : "#64748b"}
                        className={`filtro-btn ${filtroAtivo === 'all' ? 'filtro-ativo' : ''}`}
                    />
                    <Button
                        text="Pendentes"
                        onClick={() => setFiltroAtivo('pending')}
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor={filtroAtivo === 'pending' ? "#3b82f6" : "#e2e8f0"}
                        color={filtroAtivo === 'pending' ? "white" : "#64748b"}
                        className={`filtro-btn ${filtroAtivo === 'pending' ? 'filtro-ativo' : ''}`}
                    />
                    <Button
                        text="Aceitos"
                        onClick={() => setFiltroAtivo('accepted')}
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor={filtroAtivo === 'accepted' ? "#3b82f6" : "#e2e8f0"}
                        color={filtroAtivo === 'accepted' ? "white" : "#64748b"}
                        className={`filtro-btn ${filtroAtivo === 'accepted' ? 'filtro-ativo' : ''}`}
                    />
                    <Button
                        text="Rejeitados"
                        onClick={() => setFiltroAtivo('rejected')}
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor={filtroAtivo === 'rejected' ? "#3b82f6" : "#e2e8f0"}
                        color={filtroAtivo === 'rejected' ? "white" : "#64748b"}
                        className={`filtro-btn ${filtroAtivo === 'rejected' ? 'filtro-ativo' : ''}`}
                    />
                </div>

                <div className="lista-agendamentos">
                    {agendamentos.length === 0 ? (
                        <div className="empty-state-historico">
                            <img src={EmptyState} alt="Estado vazio" className="empty-image-historico" />
                            <p className="empty-text-historico">Você não tem agendamentos no momento</p>
                        </div>
                    ) : (
                        agendamentos.map((agendamento) => (
                            <CardAgendamento
                                key={agendamento.id}
                                agendamento={agendamento}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Historico;