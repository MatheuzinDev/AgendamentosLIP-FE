import '../Navbar/Navbar.css';
import ImgPerfil from "../../assets/do-utilizador.png"

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>Mesas do laboratório</li>
                <img src={ImgPerfil} alt="Perfil" className='icone-perfil-navbar' />
            </ul>
        </nav>
    );
}

export default Navbar;
