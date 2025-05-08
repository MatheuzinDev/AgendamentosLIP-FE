import React from 'react';
import '../CardPedidoSupervisor/CardPedidoSupervisor.css';
import Button from '../Button/Button';

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
        <Button
          text="Aceitar"
          padding="0.5rem 1rem"
          borderRadius="8px"
          backgroundColor="#16a34a"
          color="white"
          onClick={() => onAction(pedido.id, 'aceito')}
          className="actionButton"
        />
        <Button
          text="Rejeitar"
          padding="0.5rem 1rem"
          borderRadius="8px"
          backgroundColor="#dc2626"
          color="white"
          onClick={() => onAction(pedido.id, 'rejeitado')}
          className="actionButton"
        />
      </div>
    </div>
  );
};

export default CardPedidoSupervisor;
