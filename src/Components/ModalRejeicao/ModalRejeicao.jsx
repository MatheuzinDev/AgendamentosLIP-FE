import React from 'react';
import '../ModalRejeicao/ModalRejeicao.css';

const ModalRejeicao = ({ onClose, onConfirm }) => {
  const [motivo, setMotivo] = React.useState('');

  return (
    <div className="modal-rejeicao-overlay">
      <div className="modal-rejeicao-container">
        <div className="modal-rejeicao-header">
          <h3>Motivo da Rejeição</h3>
          <button onClick={onClose} className="modal-rejeicao-close-btn">&times;</button>
        </div>
        
        <div className="modal-rejeicao-body">
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Digite o motivo da rejeição..."
            className="modal-rejeicao-input"
            rows="4"
          />
        </div>

        <div className="modal-rejeicao-footer">
          <button 
            onClick={onClose}
            className="modal-rejeicao-btn modal-rejeicao-btn-cancel"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(motivo)}
            className="modal-rejeicao-btn modal-rejeicao-btn-confirm"
            disabled={!motivo.trim()}
          >
            Confirmar Rejeição
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRejeicao;