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
        { start: '19:00', end: '20:40' },
        { start: '21:00', end: '22:40' }
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

                const { data: agendamentos } = await api.get(`/agendamentos/listarAgendamentos?mesaId=${mesaId}&data=${hoje}`);

                const slotsComStatus = timeBlocks.map(block => {
                    const ocupado = agendamentos.some(ag =>
                        ag.horario_inicio.includes(block.start) &&
                        ag.horario_fim.includes(block.end)
                    );

                    return {
                        ...block,
                        status: ocupado ? 'occupied' : 'available',
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

    const handleSchedule = async (slot) => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            const hoje = new Date();

            const [startHours, startMinutes] = slot.start.split(':').map(Number);
            const [endHours, endMinutes] = slot.end.split(':').map(Number);

            const horarioInicio = new Date(hoje);
            horarioInicio.setHours(startHours, startMinutes, 0, 0);

            const horarioFim = new Date(hoje);
            horarioFim.setHours(endHours, endMinutes, 0, 0);

            await api.post('/agendamentos/criarAgendamento', {
                aluno_id: user.id,
                mesa_id: mesaId,
                data: hoje.toISOString(),
                horario_inicio: horarioInicio.toISOString(),
                horario_fim: horarioFim.toISOString()
            });

            setShowConfirmationModal(true);
            showNotification('Agendamento solicitado com sucesso!', 'success');
        } catch (error) {
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