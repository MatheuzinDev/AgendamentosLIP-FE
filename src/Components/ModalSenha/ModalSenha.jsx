import { useState } from 'react';
import './ModalSenha.css';

const ModalSenha = ({ show, onClose, onSave }) => {
    const [dados, setDados] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmacaoSenha: ''
    });
    const [erro, setErro] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const campos = {
            senhaAtual: dados.senhaAtual.trim(),
            novaSenha: dados.novaSenha.trim(),
            confirmacaoSenha: dados.confirmacaoSenha.trim()
        };

        if (!campos.senhaAtual) {
            setErro('A senha atual é obrigatória');
            return;
        }
        if (!campos.novaSenha) {
            setErro('A nova senha é obrigatória');
            return;
        }
        if (!campos.confirmacaoSenha) {
            setErro('Confirme a nova senha');
            return;
        }
        if (campos.novaSenha !== campos.confirmacaoSenha) {
            setErro('A nova senha e a confirmação não coincidem');
            return;
        }
        if (campos.novaSenha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setErro('');
        onSave({
            senha_atual: campos.senhaAtual,
            nova_senha: campos.novaSenha
        });

        setDados({
            senhaAtual: '',
            novaSenha: '',
            confirmacaoSenha: ''
        });
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-senha">
                <h2>Alterar Senha</h2>
                <form onSubmit={handleSubmit}>
                    {erro && <div className="mensagem-erro">{erro}</div>}

                    <div className="form-group">
                        <label>Senha Atual</label>
                        <input
                            type="password"
                            value={dados.senhaAtual}
                            onChange={(e) => setDados({ ...dados, senhaAtual: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nova Senha</label>
                        <input
                            type="password"
                            value={dados.novaSenha}
                            onChange={(e) => setDados({ ...dados, novaSenha: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirmar Nova Senha</label>
                        <input
                            type="password"
                            value={dados.confirmacaoSenha}
                            onChange={(e) => setDados({ ...dados, confirmacaoSenha: e.target.value })}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalSenha;
