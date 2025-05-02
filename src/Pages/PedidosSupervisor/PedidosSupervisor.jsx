import { useState } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import "../PedidosSupervisor/PedidosSupervisor.css";
import ImgPerfil from "../../assets/do-utilizador.png";
import Button from "../../Components/Button/Button"

const PedidosSupervisor = () => {
    const isMobile = useIsMobile();

    const [pedidos] = useState([
        {
            id: 1,
            mesa: 5,
            data: '15/03/2024',
            horario: '14:00 - 15:00',
            aluno: 'João Silva',
            status: 'pendente'
        },
        {
            id: 2,
            mesa: 2,
            data: '16/03/2024',
            horario: '10:00 - 11:00',
            aluno: 'Maria Oliveira',
            status: 'pendente'
        },
        {
            id: 3,
            mesa: 7,
            data: '14/03/2024',
            horario: '16:00 - 17:00',
            aluno: 'Carlos Pereira',
            status: 'pendente'
        }
    ]);

    const handleAcao = (pedidoId, acao) => {
        console.log(`Pedido ${pedidoId} ${acao}`);
    };

    return (
        <div className="page-container-pedidos">
            {isMobile ? (
                <div className="topbar-pedidos">
                    <div className="left-topbar">
                        <HamburgerMenu />
                        <h1 id='titulo' className="titulo-pagina mobile-title">Pedidos</h1>
                    </div>
                    <img src={ImgPerfil} alt="Perfil" className='icone-perfil' />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="navbar-spacer"></div>
                </>
            )}

            <div className="pedidos-container">
                <div className="lista-pedidos">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="pedido-card">
                            <div className="card-header">
                                <h3>Mesa {pedido.mesa}</h3>
                                <span className="status-badge pendente">
                                    {pedido.status}
                                </span>
                            </div>
                            <div className="card-detalhes">
                                <p>Data: {pedido.data}</p>
                                <p>Horário: {pedido.horario}</p>
                                <p>Aluno: {pedido.aluno}</p>
                            </div>
                            <div className="card-actions">
                                <Button
                                    text="Aceitar"
                                    padding="0.5rem 1rem"
                                    borderRadius="8px"
                                    backgroundColor="#16a34a"
                                    color="white"
                                    onClick={() => handleAcao(pedido.id, 'aceito')}
                                />
                                <Button
                                    text="Rejeitar"
                                    padding="0.5rem 1rem"
                                    borderRadius="8px"
                                    backgroundColor="#dc2626"
                                    color="white"
                                    onClick={() => handleAcao(pedido.id, 'rejeitado')}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PedidosSupervisor;