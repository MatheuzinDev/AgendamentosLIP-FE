import { useParams, Link } from 'react-router-dom';
import ScheduleHeader from '../../Components/ScheduleHeader/ScheduleHeader';
import TimeSlot from '../../Components/TimeSlot/TimeSlot';
import Navbar from '../../Components/Navbar/Navbar';
import useIsMobile from '../../hooks/useIsMobile';
import '../Agendamento/Agendamento.css';
import IconArrowBack from "../../assets/arrowBack.png"

function Agendamento() {
    const { mesaId } = useParams();
    const isMobile = useIsMobile();

    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
        const start = `${hour.toString().padStart(2, '0')}:00`;
        const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
        timeSlots.push({
            time: `${start} - ${end}`,
            status: Math.random() > 0.3 ? 'available' : 'occupied'
        });
    }

    return (
        <div className="agendamento-page">
            {isMobile ? (
                <div className="mobile-header">
                    <Link to="/home" className="back-button">
                        <img src={IconArrowBack} alt="" />
                        Voltar
                    </Link>
                </div>
            ) : (
                <Navbar />
            )}

            <div className="agendamento-container">
                <ScheduleHeader mesa={mesaId} />

                <div className="time-slots-container">
                    {timeSlots.map((slot, index) => (
                        <TimeSlot
                            key={index}
                            time={slot.time}
                            status={slot.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Agendamento;