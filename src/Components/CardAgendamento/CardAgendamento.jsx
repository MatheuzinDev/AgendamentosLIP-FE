import React from 'react';
import '../CardAgendamento/CardAgendamento.css';

const CardAgendamento = ({ agendamento }) => {
    // Pega informações do usuário diretamente do localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    const formatarData = (dataISO) => {
        // Converter UTC para horário local
        const dataUTC = new Date(dataISO);
        const dataLocal = new Date(dataUTC.getTime() + dataUTC.getTimezoneOffset() * 60000);
        return dataLocal.toLocaleDateString('pt-BR');
    };
    
    const formatarHorario = (horarioISO) => {
        return new Date(horarioISO).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC' // Mantém o horário original
        });
    };

    return (
        <div className={`agendamentoCard ${agendamento.status.toLowerCase()}`}>
            <div className="cardHeader">
                <h3>Mesa {agendamento.mesa.numero}</h3>
                <span className={`statusBadge ${agendamento.status.toLowerCase()}`}>
                    {agendamento.status.toLowerCase()}
                </span>
            </div>

            <div className="cardDetalhes">
                {/* Mostra informação do aluno apenas para supervisores */}
                {user.tipo === 'SUPERVISOR' && (
                    <p>Aluno: {agendamento.aluno.nome} ({agendamento.aluno.matricula})</p>
                )}

                <p>Data: {formatarData(agendamento.data)}</p>
                <p>Horário: {formatarHorario(agendamento.horario_inicio)} - {formatarHorario(agendamento.horario_fim)}</p>

                {agendamento.supervisor?.nome && (
                    <p>Supervisor: {agendamento.supervisor.nome}</p>
                )}

                {agendamento.motivo_rejeicao && (
                    <p className="motivoRejeicao">Motivo: {agendamento.motivo_rejeicao}</p>
                )}
            </div>
        </div>
    );
};


export default CardAgendamento;
