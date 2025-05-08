import { useState, useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import useIsMobile from '../../hooks/useIsMobile';
import Navbar from '../../Components/Navbar/Navbar';
import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger";
import Button from "../../Components/Button/Button";
import "./QrCode.css";
import ImgPerfil from "../../assets/do-utilizador.png";

const QrCode = () => {
    const [result, setResult] = useState('');
    const [error, setError] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const isMobile = useIsMobile();
    const controllerRef = useRef(null);

    useEffect(() => {
        if (cameraActive) {
            const codeReader = new BrowserQRCodeReader();
            
            codeReader.decodeFromVideoDevice(undefined, 'video-preview', (result, error) => {
                if (result) {
                    setResult(result.getText());
                    setCameraActive(false);
                }
                
                if (error && !(error instanceof DOMException)) {
                    setError(error.message);
                }
            }).then(controller => {
                controllerRef.current = controller;
            }).catch(err => {
                setError(err.message);
                setCameraActive(false);
            });
        }

        return () => {
            if (controllerRef.current) {
                controllerRef.current.stop();
                controllerRef.current = null;
            }
        };
    }, [cameraActive]);

    const handleToggleCamera = () => {
        if (!cameraActive) {
            setError(null);
            setResult('');
        }
        setCameraActive(!cameraActive);
    };

    return (
        <div className="page-container-qr">
            {isMobile ? (
                <div className="topbar-qr">
                    <div className="left-topbar">
                        <HamburgerMenu />
                        <h1 className="titulo-pagina mobile-title">Escanear QR Code</h1>
                    </div>
                    <img src={ImgPerfil} alt="Perfil" className='icone-perfil' />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="navbar-spacer"></div>
                </>
            )}

            <div className="qr-container">
                <div className="qr-content">
                    <h2 className="qr-title">Escaneie o QR Code da mesa</h2>
                    
                    <div className="scanner-wrapper">
                        {cameraActive ? (
                            <video 
                                id="video-preview"
                                className="video-preview"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    borderRadius: '12px',
                                    margin: '0 auto',
                                    aspectRatio: '1'
                                }}
                            />
                        ) : (
                            <div className="camera-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                                    <circle cx="12" cy="13" r="3"/>
                                </svg>
                            </div>
                        )}

                        {cameraActive && <div className="scan-overlay"></div>}
                    </div>

                    {error && (
                        <div className="error-message">
                            <p>⚠️ {error}</p>
                            <small>Soluções possíveis:</small>
                            <ul>
                                <li>Atualize o navegador</li>
                                <li>Conceda permissão à câmera</li>
                                <li>Acesse via HTTPS</li>
                            </ul>
                        </div>
                    )}

                    {result && <div className="scan-result">Código escaneado: {result}</div>}

                    <div className="qr-actions">
                        <Button
                            text={cameraActive ? "Parar Escaneamento" : "Iniciar Câmera"}
                            padding="1rem 2rem"
                            borderRadius="8px"
                            backgroundColor={cameraActive ? "#dc2626" : "#3b82f6"}
                            color="white"
                            onClick={handleToggleCamera}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCode;