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
                            <div className="menu-link">
                                <span>⚙️</span>
                                <span>Configurações</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HamburgerMenu;