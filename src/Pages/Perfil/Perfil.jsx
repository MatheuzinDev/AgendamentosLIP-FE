import { useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import Button from "../../Components/Button/Button";
import "./Perfil.css";
import ImgPerfil from "../../assets/do-utilizador.png";

const Perfil = () => {
    const isMobile = useIsMobile();
    const [usuario] = useState({
        nome: "Ana Silva",
        email: "ana.silva@email.com",
        matricula: "202311040001",
        tipo: "Aluno"
    });

    const handleAlterarSenha = () => {
        // Lógica para alterar senha
        console.log("Redirecionar para alteração de senha");
    };

    return (
        <div className="page-container-perfil">
            {isMobile ? (
                <div className="topbar-perfil">
                    <div className="left-topbar">
                        <HamburgerMenu />
                        <h1 className="titulo-pagina mobile-title">Perfil</h1>
                    </div>
                    <img src={ImgPerfil} alt="Perfil" className='icone-perfil' />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="navbar-spacer"></div>
                </>
            )}

            <div className="perfil-container">
                <div className="perfil-content">
                    <div className="perfil-header">
                        <div className="avatar-grande">
                            <img src={ImgPerfil} alt="Avatar" />
                        </div>
                        <h2 className="nome-usuario">{usuario.nome}</h2>
                        <p className="tipo-usuario">{usuario.tipo}</p>
                    </div>

                    <div className="info-container">
                        <div className="info-card">
                            <label>Matrícula</label>
                            <p>{usuario.matricula}</p>
                        </div>
                        
                        <div className="info-card">
                            <label>E-mail</label>
                            <p>{usuario.email}</p>
                        </div>
                    </div>

                    <div className="seguranca-section">
                        <h3 className="section-title">Segurança</h3>
                        <Button
                            text="Alterar Senha"
                            padding="1rem 2rem"
                            borderRadius="8px"
                            backgroundColor="#3b82f6"
                            color="white"
                            onClick={handleAlterarSenha}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;