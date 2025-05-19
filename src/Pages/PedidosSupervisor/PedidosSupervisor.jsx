import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import "../PedidosSupervisor/PedidosSupervisor.css";
import ImgPerfil from "../../assets/do-utilizador.png";
import CardPedidoSupervisor from '../../Components/CardPedidoSupervisor/CardPedidoSupervisor';
import Spinner from '../../Components/Spinner/Spinner';
import api from '../../api/api';
import EmptyState from '../../assets/empty.png'


const PedidosSupervisor = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);

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

    useEffect(() => {
        const carregarPedidos = async () => {
            try {
                const { data } = await api.get('/agendamentos/pedidosPendentes');
                console.log('Dados recebidos:', data);
                setPedidos(data);
            } catch (error) {
                console.error('Erro ao carregar pedidos:', error);
            }
        };

        if (!loading) {
            carregarPedidos();
        }
    }, [loading]);

    const handleAcao = async (pedidoId, acao) => {
        try {
            let motivo;
            if (acao === 'rejeitar') {
                motivo = prompt('Digite o motivo da rejeição:');
                if (!motivo) return;
            }

            await api.put(`/agendamentos/atualizarAgendamento/${pedidoId}`, {
                status: acao === 'aceitar' ? 'ACEITO' : 'REJEITADO',
                motivo_rejeicao: motivo || null,
                supervisor_id: JSON.parse(localStorage.getItem('user')).id
            });

            setPedidos(pedidos.filter(p => p.id !== pedidoId));

        } catch (error) {
            console.error('Erro ao processar ação:', error);
            alert('Ocorreu um erro ao processar a ação');
        }
    };

    if (loading) {
        return <Spinner />;
    }

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
                    {pedidos.length === 0 ? (
                        <div className="empty-state">
                            <img src={EmptyState} alt="Nenhum pedido" className="empty-image" />
                            <p className="empty-text">Nenhum pedido pendente no momento</p>
                        </div>
                    ) : (

                        pedidos.map((pedido) => {
                            // Corrigindo a data
                            const dataUTC = new Date(pedido.data);
                            const dataLocal = new Date(dataUTC.getTime() + dataUTC.getTimezoneOffset() * 60000);

                            // Corrigindo horários
                            const inicioUTC = new Date(pedido.horario_inicio);
                            const inicioLocal = new Date(inicioUTC.getTime() + inicioUTC.getTimezoneOffset() * 60000);

                            const fimUTC = new Date(pedido.horario_fim);
                            const fimLocal = new Date(fimUTC.getTime() + fimUTC.getTimezoneOffset() * 60000);

                            return (
                                <CardPedidoSupervisor
                                    key={pedido.id}
                                    pedido={{
                                        ...pedido,
                                        data: dataLocal.toLocaleDateString('pt-BR'),
                                        horario: `${inicioLocal.getHours().toString().padStart(2, '0')}:${inicioLocal.getMinutes().toString().padStart(2, '0')} - ${fimLocal.getHours().toString().padStart(2, '0')}:${fimLocal.getMinutes().toString().padStart(2, '0')}`,
                                        aluno: pedido.aluno.nome
                                    }}
                                    onAction={handleAcao}
                                />
                            );
                        }))
                    }
                </div>
            </div>
        </div>
    );
};

export default PedidosSupervisor;