import { useState } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import "../Historico/Historico.css";
import ImgPerfil from "../../assets/do-utilizador.png";
import Button from "../../Components/Button/Button"

const Historico = () => {
    const isMobile = useIsMobile();

    const [agendamentos] = useState([
        {
            id: 1,
            mesa: 5,
            data: '15/03/2024',
            horario: '14:00 - 15:00',
            status: 'aceito',
            supervisor: 'Prof. Silva'
        },
        {
            id: 2,
            mesa: 2,
            data: '16/03/2024',
            horario: '10:00 - 11:00',
            status: 'pendente',
            supervisor: 'Prof. Costa'
        },
        {
            id: 3,
            mesa: 7,
            data: '14/03/2024',
            horario: '16:00 - 17:00',
            status: 'rejeitado',
            supervisor: 'Prof. Almeida',
            motivo: 'Mesa em manutenção'
        }
    ]);

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
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor="#3b82f6"
                        color="white"
                        className="filtro-btn"
                    />
                    <Button
                        text="Pendentes"
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor="#e2e8f0"
                        color="#64748b"
                        className="filtro-btn"
                    />
                    <Button
                        text="Aceitos"
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor="#e2e8f0"
                        color="#64748b"
                        className="filtro-btn"
                    />
                    <Button
                        text="Rejeitados"
                        padding="0.5rem 1rem"
                        borderRadius="8px"
                        backgroundColor="#e2e8f0"
                        color="#64748b"
                        className="filtro-btn"
                    />
                </div>

                <div className="lista-agendamentos">
                    {agendamentos.map((agendamento) => (
                        <div key={agendamento.id} className={`agendamento-card ${agendamento.status}`}>
                            <div className="card-header">
                                <h3>Mesa {agendamento.mesa}</h3>
                                <span className={`status-badge ${agendamento.status}`}>
                                    {agendamento.status}
                                </span>
                            </div>
                            <div className="card-detalhes">
                                <p>Data: {agendamento.data}</p>
                                <p>Horário: {agendamento.horario}</p>
                                <p>Supervisor: {agendamento.supervisor}</p>
                                {agendamento.motivo && (
                                    <p className="motivo-rejeicao">Motivo: {agendamento.motivo}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Historico;