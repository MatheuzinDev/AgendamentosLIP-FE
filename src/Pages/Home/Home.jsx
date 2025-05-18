import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import useIsMobile from "../../hooks/useIsMobile";
import Navbar from "../../Components/Navbar/Navbar";
import "../Home/Home.css";
import CardMesa from "../../Components/CardMesa/CardMesa";
import ImgPerfil from "../../assets/do-utilizador.png";
import { useState, useEffect } from "react";
import api from '../../api/api';
import Spinner from '../../Components/Spinner/Spinner';
import Notification from '../../Components/Notification/Notification';
import { useNavigate } from 'react-router-dom';

function Home() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  useEffect(() => {
    const carregarMesas = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/mesas/listarMesas');
        setMesas(data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
        showNotification('Erro ao carregar mesas', 'error');
      } finally {
        setLoading(false);
      }
    };

    carregarMesas();
  }, [navigate]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  const mesasDisponiveis = mesas.filter(mesa => mesa.status === 'DISPONIVEL').length;

  if (loading) return <Spinner />;

  return (
    <div className="page-container-home">
      {isMobile ? (
        <div className="topbar-home">
          <div className="left-topbar">
            <HamburgerMenu />
            <h1 className="titulo-pagina">Mesas do laboratório</h1>
          </div>
          <img src={ImgPerfil} alt="Perfil" className='icone-perfil'/>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="navbar-spacer"></div>
        </>
      )}

      <div className="dashboard">
        <div className="dashboard-box">
          <p>Mesas disponíveis</p>
          <h2>{mesasDisponiveis}</h2>
        </div>
        <div className="dashboard-box">
          <p>Meus agendamentos</p>
          <h2>2</h2>
        </div>
      </div>

      <div className="mesas-section">
        <h3 className="section-title">Mesas</h3>
        <div className="grid-mesas">
          {mesas.map((mesa) => (
            <CardMesa
              key={mesa.id}
              numero={mesa.numero}
              status={mesa.status.toLowerCase()}
              id={mesa.id}
            />
          ))}
        </div>
      </div>

      <div className="legenda">
        <div><span className="bolinha verde"></span>Disponível</div>
        <div><span className="bolinha vermelha"></span>Ocupada</div>
        <div><span className="bolinha laranja"></span>Reservada</div>
      </div>

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
    </div>
  );
}

export default Home;