import { useEffect } from 'react';
import '../ModalAgendamento/ModalAgendamento.css';

const ModalAgendamento = ({ show, onClose, title, message, buttonText }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">✓</div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

ModalAgendamento.defaultProps = {
  buttonText: 'Fechar',
  title: 'Confirmação',
  message: 'Operação realizada com sucesso'
};

export default ModalAgendamento;