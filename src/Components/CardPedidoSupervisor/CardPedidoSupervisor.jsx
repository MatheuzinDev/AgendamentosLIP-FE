import React from 'react';
import { useState } from 'react';
import '../CardPedidoSupervisor/CardPedidoSupervisor.css';
import Button from '../Button/Button';
import ModalRejeicao from '../ModalRejeicao/ModalRejeicao';

const CardPedidoSupervisor = ({ pedido, onAction }) => {
  const [showModal, setShowModal] = useState(false);

  const formatStatus = (status) => {
    const statusMap = {
      'PENDENTE': 'Pendente',
      'ACEITO': 'Aceito',
      'REJEITADO': 'Rejeitado'
    };
    return statusMap[status] || status;
  };

  const handleRejeitarClick = () => {
    setShowModal(true);
  };

  const handleConfirmarRejeicao = (motivo) => {
    if (motivo.trim()) {
      setShowModal(false);
      onAction(pedido.id, 'rejeitar', motivo);
    }
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
        <p>Horário: {pedido.horario}</p>
        <p>Aluno: {pedido.aluno}</p>
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
            onClick={handleRejeitarClick}
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

      {showModal && (
        <ModalRejeicao
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmarRejeicao}
        />
      )}
    </div>
  );
};

export default CardPedidoSupervisor;