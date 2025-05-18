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
                    {pedidos.map((pedido) => {
                        const data = new Date(pedido.data);
                        const inicio = new Date(pedido.horario_inicio);
                        const fim = new Date(pedido.horario_fim);

                        const dataFormatada = data.toLocaleDateString('pt-BR');
                        const horarioInicio = `${inicio.getUTCHours().toString().padStart(2, '0')}:${inicio.getUTCMinutes().toString().padStart(2, '0')}`;
                        const horarioFim = `${fim.getUTCHours().toString().padStart(2, '0')}:${fim.getUTCMinutes().toString().padStart(2, '0')}`;

                        return (
                            <CardPedidoSupervisor
                                key={pedido.id}
                                pedido={{
                                    ...pedido,
                                    data: dataFormatada,
                                    horario: `${horarioInicio} - ${horarioFim}`,
                                    aluno: pedido.aluno.nome
                                }}
                                onAction={handleAcao}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PedidosSupervisor;