import "../TimeSlot/TimeSlot.css";
import IconBlock from "../../assets/block.png";
import IconClock from "../../assets/clock.png";

const TimeSlot = ({ time, status = "available", onSchedule }) => {
    const getStatusText = () => {
        switch (status) {
            case 'occupied': return 'Ocupado';
            case 'pending': return 'Pendente';
            default: return 'Agendar';
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (status === "available" && typeof onSchedule === "function") {
            onSchedule();
        }
    };

    return (
        <div className={`time-slot ${status}`}>
            <span className="time">{time}</span>
            <div className="slot-status">
                {status === 'available' ? (
                    <button className="schedule-btn" onClick={handleClick}>
                        <img className="icon-clock" src={IconClock} alt="Relógio" />
                        {getStatusText()}
                    </button>
                ) : (
                    <div className={`status-badge ${status}`}>
                        <img
                            className={status === 'occupied' ? 'icon-block' : 'icon-clock'}
                            src={status === 'occupied' ? IconBlock : IconClock}
                            alt="Status"
                        />
                        {getStatusText()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlot;