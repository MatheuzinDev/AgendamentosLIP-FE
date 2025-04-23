import { useState } from "react";
import "../MenuHamburger/MenuHamburger.css";

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
                    <button
                        className={`hamburger hamburger--spin is-active`}
                        type="button"
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '20px'
                        }}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>


                    <ul>
                        <li>🪑 Mesas do laboratório</li>
                        <li>📅 Meus agendamentos</li>
                        <li>⚙️ Configurações</li>

                    </ul>


                </div>
            </div>
        </>
    );
}

export default HamburgerMenu;
