import "../CardMesa/CardMesa.css";

const CardMesa = ({ numero, status }) => {
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
    <div className={`mesa mesa-${getStatusClass()}`} data-status={status}>
      <span className="numero-mesa">{numero}</span>
    </div>
  );
};

export default CardMesa;