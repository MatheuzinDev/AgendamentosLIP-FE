import "../TimeSlot/TimeSlot.css";
import IconBlock from "../../assets/block.png";
import IconClock from "../../assets/clock.png";

const TimeSlot = ({ time, status = "available", onSchedule }) => {
    const handleClick = () => {
        if (status === "available" && typeof onSchedule === "function") {
            onSchedule();
        }
    };

    return (
        <div className={`time-slot ${status}`} onClick={handleClick}>
            <span className="time">{time}</span>
            <div className="slot-status">
                {status === "available" ? (
                    <button 
                        className="schedule-btn"
                        onClick={handleClick}
                    >
                        <img className="icon-clock" src={IconClock} alt="Ícone de relógio" />
                        Agendar
                    </button>
                ) : (
                    <div className="occupied-badge">
                        <img className="icon-block" src={IconBlock} alt="Ícone de bloqueado" />
                        Ocupado
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlot;