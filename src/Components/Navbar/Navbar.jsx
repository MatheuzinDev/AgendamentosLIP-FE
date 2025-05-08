import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import ImgPerfil from "../../assets/do-utilizador.png";

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/home" className="nav-link">Mesas do laboratório</Link>
                </li>
                <li>
                    <Link to="/historico" className="nav-link">Meus Agendamentos</Link>
                </li>
                <li>
                    <Link to="/pedidos-supervisor" className="nav-link">Pedidos de Alunos</Link>
                </li>
                <li>
                    <Link to="/qrcode" className="nav-link">Escanear QR Code</Link>
                </li>
                <li className="profile-icon">
                    <Link to="/perfil">
                        <img src={ImgPerfil} alt="Perfil" className='icone-perfil-navbar' />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;