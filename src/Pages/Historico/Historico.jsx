import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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
import EmptyState from '../../assets/empty.png';

// Funções auxiliares de formatação
const formatarDataLocal = (dataUTC) => {
    const date = new Date(dataUTC);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('pt-BR');
};

const formatarHorarioUTC = (horarioISO) => {
    return new Date(horarioISO).toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'UTC'
    });
};

const Historico = () => {
    const isMobile = useIsMobile();
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [filtroAtivo, setFiltroAtivo] = useState('all');
    const [periodoRelatorio, setPeriodoRelatorio] = useState('todos');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const carregarAgendamentos = async () => {
            try {
                setLoading(true);
                let status;
                switch (filtroAtivo) {
                    case 'pending': status = 'PENDENTE'; break;
                    case 'accepted': status = 'ACEITO'; break;
                    case 'rejected': status = 'REJEITADO'; break;
                    case 'reserved': status = 'RESERVADO'; break;
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

    const filtrarPorPeriodo = (agendamentos) => {
        const hojeUTC = new Date(new Date().toISOString().split('T')[0]);
        
        switch(periodoRelatorio) {
            case 'hoje':
                return agendamentos.filter(a => {
                    const dataAgendamento = new Date(a.data);
                    return dataAgendamento.toISOString().split('T')[0] === hojeUTC.toISOString().split('T')[0];
                });
                
            case 'semana':
                const primeiroDiaSemana = new Date(hojeUTC);
                primeiroDiaSemana.setDate(hojeUTC.getDate() - hojeUTC.getDay());
                const ultimoDiaSemana = new Date(primeiroDiaSemana);
                ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);
                
                return agendamentos.filter(a => {
                    const data = new Date(a.data);
                    return data >= primeiroDiaSemana && data <= ultimoDiaSemana;
                });
                
            case 'mes':
                return agendamentos.filter(a => {
                    const data = new Date(a.data);
                    return data.getMonth() === hojeUTC.getMonth() && 
                           data.getFullYear() === hojeUTC.getFullYear();
                });
                
            default:
                return agendamentos;
        }
    };

    const getTituloPeriodo = () => {
        switch(periodoRelatorio) {
            case 'hoje': return 'Hoje';
            case 'semana': return 'Esta Semana';
            case 'mes': return 'Este Mês';
            default: return 'Todos os Períodos';
        }
    };

    const gerarRelatorioPDF = () => {
        const agendamentosFiltrados = filtrarPorPeriodo([...agendamentos]);
        const doc = new jsPDF();

        // Cabeçalho
        doc.setFontSize(18);
        doc.text(`Relatório de Agendamentos - ${getTituloPeriodo()}`, 15, 15);
        doc.setFontSize(12);
        doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 15, 23);

        // Dados da tabela
        const columns = user.tipo === 'SUPERVISOR'
            ? ['Mesa', 'Aluno', 'Matrícula', 'Data', 'Horário', 'Status']
            : ['Mesa', 'Data', 'Horário', 'Status'];

        const rows = agendamentosFiltrados.map(agendamento => {
            const baseRow = [
                agendamento.mesa.numero,
                formatarDataLocal(agendamento.data),
                `${formatarHorarioUTC(agendamento.horario_inicio)} - ${formatarHorarioUTC(agendamento.horario_fim)}`,
                agendamento.status.toLowerCase()
            ];

            if (user.tipo === 'SUPERVISOR') {
                return [
                    agendamento.mesa.numero,
                    agendamento.aluno.nome,
                    agendamento.aluno.matricula,
                    ...baseRow.slice(1)
                ];
            }
            return baseRow;
        });

        // Configuração da tabela
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 30,
            styles: {
                fontSize: 10,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            }
        });

        doc.save(`relatorio-agendamentos-${new Date().toISOString()}.pdf`);
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
                    <div className="filtros-left">
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
                        <Button
                            text="Reservados"
                            onClick={() => setFiltroAtivo('reserved')}
                            padding="0.5rem 1rem"
                            backgroundColor={filtroAtivo === 'reserved' ? "#3b82f6" : "#e2e8f0"}
                            color={filtroAtivo === 'reserved' ? "white" : "#64748b"}
                        />
                    </div>

                    {user?.tipo === 'SUPERVISOR' && (
                        <div className="filtro-relatorio">
                            <select 
                                value={periodoRelatorio}
                                onChange={(e) => setPeriodoRelatorio(e.target.value)}
                                className="seletor-periodo"
                            >
                                <option value="todos">Todos</option>
                                <option value="hoje">Hoje</option>
                                <option value="semana">Esta Semana</option>
                                <option value="mes">Este Mês</option>
                            </select>
                            
                            <Button
                                text="Gerar Relatório"
                                onClick={gerarRelatorioPDF}
                                padding="0.5rem 1.5rem"
                                borderRadius="8px"
                                backgroundColor="#10b981"
                                color="white"
                                className="btn-relatorio"
                            />
                        </div>
                    )}
                </div>

                <div className="lista-agendamentos">
                    {loading ? (
                        <Spinner />
                    ) : agendamentos.length === 0 ? (
                        <div className="empty-state-historico">
                            <img src={EmptyState} alt="Estado vazio" className="empty-image-historico" />
                            <p className="empty-text-historico">Você não tem agendamentos no momento</p>
                        </div>
                    ) : (
                        [...agendamentos]
                            .sort((a, b) => {
                                const dateA = new Date(a.data + 'T' + a.horario_inicio);
                                const dateB = new Date(b.data + 'T' + b.horario_inicio);
                                return dateB - dateA;
                            })
                            .map((agendamento) => (
                                <CardAgendamento
                                    key={agendamento.id}
                                    agendamento={agendamento}
                                />
                            ))
                    )}
                </div>
            </div>

            <Notification
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ ...notification, show: false })}
            />
        </div>
    );
};

export default Historico;