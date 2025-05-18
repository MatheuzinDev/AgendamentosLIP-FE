import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import "../PedidosSupervisor/PedidosSupervisor.css";
import ImgPerfil from "../../assets/do-utilizador.png";
import CardPedidoSupervisor from '../../Components/CardPedidoSupervisor/CardPedidoSupervisor';


const PedidosSupervisor = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const verifyAccess = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            
            // Se não estiver logado ou não for supervisor
            if (!user || user.tipo !== 'SUPERVISOR') {
                navigate('/home');
                return;
            }
            setLoading(false);
        };

        verifyAccess();
    }, [navigate]);

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
                        <CardPedidoSupervisor 
                            key={pedido.id}
                            pedido={pedido}
                            onAction={handleAcao}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PedidosSupervisor;