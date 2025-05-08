import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import useIsMobile from "../../hooks/useIsMobile";
import Navbar from "../../Components/Navbar/Navbar";
import "../Home/Home.css";
import CardMesa from "../../Components/CardMesa/CardMesa";
import ImgPerfil from "../../assets/do-utilizador.png";

function Home() {
  const isMobile = useIsMobile();

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
          <h2>12</h2>
        </div>
        <div className="dashboard-box">
          <p>Meus agendamentos</p>
          <h2>2</h2>
        </div>
      </div>

      <div className="mesas-section">
        <h3 className="section-title">Mesas</h3>
        <div className="grid-mesas">
          {[...Array(9)].map((_, i) => (
            <CardMesa
              key={i}
              numero={i + 1}
              status="disponivel"
            />
          ))}
        </div>
      </div>

      <div className="legenda">
        <div><span className="bolinha verde"></span>Disponível</div>
        <div><span className="bolinha vermelha"></span>Ocupada</div>
      </div>
    </div>
  );
}

export default Home;