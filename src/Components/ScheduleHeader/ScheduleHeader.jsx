import "../ScheduleHeader/ScheduleHeader.css";
import ImgCalendarioCheck from "../../assets/calendario.png"
import ImgCalendario from "../../assets/calendario2.png"


const ScheduleHeader = ({ mesa }) => {
  return (
    <div className="schedule-header">
      <h1>Agendar Mesa {mesa}</h1>
      <div className="header-details">
        <div className="detail-item">
          <img className="icon-calendario" src={ImgCalendarioCheck} alt="" />
          <span>Horários disponíveis</span>
        </div>
        <div className="detail-item">
        <img className="icon-calendario" src={ImgCalendario} alt="" />
          <span>Dia: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;