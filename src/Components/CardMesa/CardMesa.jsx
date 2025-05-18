import { Link } from "react-router-dom"
import "../CardMesa/CardMesa.css"

const CardMesa = ({ numero, status, id }) => {
  const getStatusClass = () => {
    switch (status) {
      case "disponivel":
        return "verde";
      case "ocupada":
        return "vermelha";
      case "reservada":
        return "laranja";
      default:
        return "verde";
    }
  };

  return (
    <Link to={`/agendamento/${id}`} className="mesa-link">
      <div className={`mesa mesa-${getStatusClass()}`} data-status={status}>
        <span className="numero-mesa">{numero}</span>
      </div>
    </Link>
  );
};

export default CardMesa;