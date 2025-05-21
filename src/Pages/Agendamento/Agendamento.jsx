import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScheduleHeader from '../../Components/ScheduleHeader/ScheduleHeader';
import TimeSlot from '../../Components/TimeSlot/TimeSlot';
import Navbar from '../../Components/Navbar/Navbar';
import ModalAgendamento from '../../Components/ModalAgendamento/ModalAgendamento';
import useIsMobile from '../../hooks/useIsMobile';
import '../Agendamento/Agendamento.css';
import IconArrowBack from "../../assets/arrowBack.png";
import api from '../../api/api';
import Notification from '../../Components/Notification/Notification';
import Spinner from '../../Components/Spinner/Spinner';

function Agendamento() {
    const { mesaId } = useParams();
    const isMobile = useIsMobile();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [numeroMesa, setNumeroMesa] = useState('')
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeBlocks = [
        { start: '07:30', end: '09:10' },
        { start: '09:30', end: '11:10' },
        { start: '11:20', end: '13:00' },
        { start: '13:30', end: '15:10' },
        { start: '15:30', end: '17:10' },
        { start: '17:20', end: '19:00' },
    ];

    useEffect(() => {
        const buscarNumeroMesa = async () => {
            try {
                const { data } = await api.get(`/mesas/listarMesa/${mesaId}`);
                setNumeroMesa(data.numero);
            } catch (error) {
                showNotification('Erro ao carregar dados da mesa', 'error');
            }
        };

        buscarNumeroMesa();
    }, [mesaId]);


    useEffect(() => {
        const carregarHorarios = async () => {
            try {
                setLoading(true);
                const hoje = new Date().toISOString().split('T')[0];
                const user = JSON.parse(localStorage.getItem('user'));

                // Busca paralela de horários aceitos e pendentes do usuário
                const [aceitos, pendentes] = await Promise.all([
                    api.get(`/agendamentos/listarAgendamentos?mesaId=${mesaId}&data=${hoje}&status=ACEITO`),
                    api.get(`/agendamentos/meusAgendamentos?status=PENDENTE&mesaId=${mesaId}&data=${hoje}`)
                ]);

                const slotsComStatus = timeBlocks.map(block => {
                    // Verifica se está ocupado (ACEITO)
                    const ocupado = aceitos.data.some(ag =>
                        compareHorarios(ag.horario_inicio, block.start) &&
                        compareHorarios(ag.horario_fim, block.end)
                    );

                    // Verifica se está pendente (PENDENTE do usuário)
                    const pendente = pendentes.data.some(ag =>
                        compareHorarios(ag.horario_inicio, block.start) &&
                        compareHorarios(ag.horario_fim, block.end)
                    );

                    return {
                        ...block,
                        status: ocupado ? 'occupied' : pendente ? 'pending' : 'available',
                        time: `${block.start} - ${block.end}`
                    };
                });

                setTimeSlots(slotsComStatus);
            } catch (error) {
                showNotification('Erro ao carregar horários', 'error');
            } finally {
                setLoading(false);
            }
        };

        carregarHorarios();
    }, [mesaId]);

    // Função auxiliar para comparar horários
    const compareHorarios = (dataISO, hora) => {
        const data = new Date(dataISO);
        const horasISO = data.toISOString().split('T')[1].substring(0, 5);
        return horasISO === hora;
    };

    const handleSchedule = async (slot) => {
        try {
            setLoading(true);

            // Atualização otimista para estado pendente
            setTimeSlots(prev => prev.map(s =>
                s.start === slot.start ? { ...s, status: 'pending' } : s
            ));

            const user = JSON.parse(localStorage.getItem('user'));
            const dataAgendamento = new Date().toISOString().split('T')[0];

            await api.post('/agendamentos/criarAgendamento', {
                aluno_id: user.id,
                mesa_id: mesaId,
                data: dataAgendamento,
                horario_inicio: new Date(`${dataAgendamento}T${slot.start}:00Z`).toISOString(),
                horario_fim: new Date(`${dataAgendamento}T${slot.end}:00Z`).toISOString()
            });

            setShowConfirmationModal(true);
            showNotification('Agendamento solicitado com sucesso!', 'success');

        } catch (error) {
            // Reverter estado em caso de erro
            setTimeSlots(prev => prev.map(s =>
                s.start === slot.start ? { ...s, status: 'available' } : s
            ));

            const mensagem = error.response?.data?.message || 'Erro ao agendar horário';
            showNotification(mensagem, 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    };

    return (
        <div className="agendamento-page">
            {loading && <Spinner />}
            <ModalAgendamento
                show={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                title="Solicitação Enviada!"
                message="Seu pedido de agendamento foi recebido e está aguardando aprovação do supervisor."
                buttonText="Entendido"
            />

            {isMobile ? (
                <div className="mobile-header">
                    <Link to="/home" className="back-button">
                        <img src={IconArrowBack} alt="Voltar" />
                        Voltar
                    </Link>
                </div>
            ) : (
                <Navbar />
            )}

            <div className="agendamento-container">
                <ScheduleHeader mesa={numeroMesa} />

                <div className="time-slots-container">
                    {timeSlots.map((slot, index) => (
                        <TimeSlot
                            key={index}
                            time={slot.time}
                            status={slot.status}
                            periodo={slot.periodo}
                            onSchedule={() => handleSchedule(slot)}
                        />
                    ))}
                </div>
            </div>
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}
        </div>
    );
}

export default Agendamento;