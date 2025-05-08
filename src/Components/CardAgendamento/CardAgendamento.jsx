import React from 'react';
import '../CardAgendamento/CardAgendamento.css';

const CardAgendamento = ({ agendamento }) => {
  return (
    <div className={`agendamentoCard ${agendamento.status}`}>
      <div className="cardHeader">
        <h3>Mesa {agendamento.mesa}</h3>
        <span className={`statusBadge ${agendamento.status}`}>
          {agendamento.status}
        </span>
      </div>

      <div className="cardDetalhes">
        <p>Data: {agendamento.data}</p>
        <p>Horário: {agendamento.horario}</p>
        <p>Supervisor: {agendamento.supervisor}</p>
        {agendamento.motivo && (
          <p className="motivoRejeicao">Motivo: {agendamento.motivo}</p>
        )}
      </div>
    </div>
  );
};

export default CardAgendamento;
