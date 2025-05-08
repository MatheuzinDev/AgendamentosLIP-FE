import { useState } from "react";
import "../MenuHamburger/MenuHamburger.css";
import { Link } from "react-router-dom";

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>}

            <div className="hamburger-container">
                <button
                    className={`hamburger hamburger--spin ${isOpen ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                <div className={`menu ${isOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/home" className="menu-link" onClick={() => setIsOpen(false)}>
                                <span>🪑</span>
                                <span>Mesas do laboratório</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/historico" className="menu-link" onClick={() => setIsOpen(false)}>
                                <span>📅</span>
                                <span>Meus agendamentos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pedidos-supervisor" className="menu-link" onClick={() => setIsOpen(false)}>
                                <span>📋</span>
                                <span>Pedidos de Alunos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/qrcode" className="menu-link" onClick={() => setIsOpen(false)}>
                                <span>📷</span>
                                <span>Escanear QR Code</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/perfil" className="menu-link" onClick={() => setIsOpen(false)}>
                                <span>👤</span>
                                <span>Meu Perfil</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HamburgerMenu;