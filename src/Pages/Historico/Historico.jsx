import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import EmptyState from '../../assets/empty.png'

const Historico = () => {
    const isMobile = useIsMobile();
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [filtroAtivo, setFiltroAtivo] = useState('all');
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

    const gerarRelatorioPDF = () => {
        const doc = new jsPDF();

        // Cabeçalho
        doc.setFontSize(18);
        doc.text("Relatório de Agendamentos - LIP", 15, 15);
        doc.setFontSize(12);
        doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 15, 23);

        // Dados da tabela
        const columns = user.tipo === 'SUPERVISOR'
            ? ['Mesa', 'Aluno', 'Matrícula', 'Data', 'Horário', 'Status']
            : ['Mesa', 'Data', 'Horário', 'Status'];

        const sorted = [...agendamentos].sort((a, b) => {
            const dateA = new Date(a.data);
            const dateB = new Date(b.data);
            if (dateA.getTime() !== dateB.getTime()) {
                return dateB - dateA;
            }
            // Se quiser refinar por horário de início no mesmo dia:
            return new Date(a.horario_inicio) - new Date(b.horario_inicio);
        });


        const rows = sorted.map(agendamento => {
            const baseRow = [
                agendamento.mesa.numero,
                new Date(agendamento.data).toLocaleDateString('pt-BR'),
                `${new Date(agendamento.horario_inicio).toLocaleTimeString('pt-BR', { timeStyle: 'short' })} – ` +
                `${new Date(agendamento.horario_fim).toLocaleTimeString('pt-BR', { timeStyle: 'short' })}`,
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
                        <Button
                            text="Gerar Relatório"
                            onClick={gerarRelatorioPDF}
                            padding="0.5rem 1.5rem"
                            borderRadius="8px"
                            backgroundColor="#10b981"
                            color="white"
                            className="btn-relatorio"
                        />
                    )}
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