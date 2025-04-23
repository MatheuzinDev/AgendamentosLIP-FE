import '../Navbar/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>Mesas do laboratório</li>
                <img src="src\assets\do-utilizador.png" alt="Perfil" className='icone-perfil-navbar' />
            </ul>
        </nav>
    );
}

export default Navbar;
