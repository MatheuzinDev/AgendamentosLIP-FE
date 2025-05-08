import React from 'react';
import '../CardPedidoSupervisor/CardPedidoSupervisor.css';

const CardPedidoSupervisor = ({ pedido, onAction }) => {
  return (
    <div className="pedidoCard">
      <div className="cardHeader">
        <h3>Mesa {pedido.mesa}</h3>
        <span className={`statusBadge ${pedido.status}`}>
          {pedido.status}
        </span>
      </div>
      <div className="cardDetalhes">
        <p>Data: {pedido.data}</p>
        <p>Horário: {pedido.horario}</p>
        <p>Aluno: {pedido.aluno}</p>
      </div>
      <div className="cardActions">
        <button
          className="actionButton acceptButton"
          onClick={() => onAction(pedido.id, 'aceito')}
        >
          Aceitar
        </button>
        <button
          className="actionButton rejectButton"
          onClick={() => onAction(pedido.id, 'rejeitado')}
        >
          Rejeitar
        </button>
      </div>
    </div>
  );
};

export default CardPedidoSupervisor;
