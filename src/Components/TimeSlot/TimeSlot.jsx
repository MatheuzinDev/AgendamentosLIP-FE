import "../TimeSlot/TimeSlot.css";
import IconBlock from "../../assets/block.png"
import IconClock from "../../assets/clock.png"

const TimeSlot = ({ time, status = "available" }) => {
    return (
        <div className={`time-slot ${status}`}>
            <span className="time">{time}</span>
            <div className="slot-status">
                {status === "available" ? (
                    <button className="schedule-btn">
                        <img className="icon-clock" src={IconClock} alt="" />
                        Agendar
                    </button>
                ) : (
                    <div className="occupied-badge">
                        <img className="icon-block" src={IconBlock} alt="" />
                        Ocupado
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlot;