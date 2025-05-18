import React from 'react';
import '../CardPedidoSupervisor/CardPedidoSupervisor.css';
import Button from '../Button/Button';

const CardPedidoSupervisor = ({ pedido, onAction }) => {
  // Função para formatar o status
  const formatStatus = (status) => {
    const statusMap = {
      'PENDENTE': 'Pendente',
      'ACEITO': 'Aceito',
      'REJEITADO': 'Rejeitado'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="pedidoCard">
      <div className="cardHeader">
        <h3>Mesa {pedido.mesa.numero}</h3>
        <span className={`statusBadge ${pedido.status.toLowerCase()}`}>
          {formatStatus(pedido.status)}
        </span>
      </div>

      <div className="cardDetalhes">
        <p>Data: {pedido.data}</p>
        <p>Horário: {
          new Date(pedido.horario_inicio).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
          })} - {
            new Date(pedido.horario_fim).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC'
            })
          }</p>
        <p>Aluno: {pedido.aluno.nome}</p>
      </div>

      {pedido.status === 'PENDENTE' && (
        <div className="cardActions">
          <Button
            text="Aceitar"
            padding="0.5rem 1rem"
            borderRadius="8px"
            backgroundColor="#16a34a"
            color="white"
            onClick={() => onAction(pedido.id, 'aceitar')}
            className="actionButton"
          />
          <Button
            text="Rejeitar"
            padding="0.5rem 1rem"
            borderRadius="8px"
            backgroundColor="#dc2626"
            color="white"
            onClick={() => onAction(pedido.id, 'rejeitar')}
            className="actionButton"
          />
        </div>
      )}

      {pedido.status === 'REJEITADO' && pedido.motivo_rejeicao && (
        <div className="motivoRejeicao">
          <p><strong>Motivo da rejeição:</strong></p>
          <p>{pedido.motivo_rejeicao}</p>
        </div>
      )}
    </div>
  );
};

export default CardPedidoSupervisor;