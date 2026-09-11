import { useState, useEffect } from 'react';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../../services/usuarioService';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [form, setForm] = useState({ nome: '', email: '', senha: '' });
    const [modalAberto, setModalAberto] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await getUsuarios();
            setUsuarios(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerPorId = async (id) => {
        try {
            const response = await getUsuario(id);
            const usuario = response.data;
            alert(`ID: ${usuario.id}\nNome: ${usuario.nome}\nEmail: ${usuario.email}`);
        } catch (err) {
            console.log(err);
        }
    };

    const abrirModalNovo = () => {
        setForm({ nome: '', email: '', senha: '' });
        setEditandoId(null);
        setModalAberto(true);
    };

    const abrirModalEditar = (usuario) => {
        setForm({ nome: usuario.nome, email: usuario.email, senha: '' });
        setEditandoId(usuario.id);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setForm({ nome: '', email: '', senha: '' });
        setEditandoId(null);
    };

    const handleSalvar = async (e) => {
        e.preventDefault();

        try {
            if (editandoId) {
                await updateUsuario(editandoId, form);
            } else {
                await createUsuario(form);
            }
            fecharModal();
            await fetchUsuarios();
        } catch (err) {
            console.log(err);
        }
    };

    const handleExcluir = async (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este usuário?');
        if (!confirmar) return;

        try {
            await deleteUsuario(id);
            await fetchUsuarios();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="usuarios-page">
            <div className="usuarios-header">
                <h1>Usuários</h1>
                <button onClick={abrirModalNovo}>Novo Usuário</button>
            </div>

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => handleVerPorId(usuario.id)}>Ver</button>
                                <button onClick={() => abrirModalEditar(usuario)}>Editar</button>
                                <button onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editandoId ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>

                        <form onSubmit={handleSalvar}>
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    name="nome"
                                    value={form.nome}
                                    onChange={handleChange}
                                    autoFocus
                                    required
                                />
                            </label>

                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Senha:
                                <input
                                    type="password"
                                    name="senha"
                                    value={form.senha}
                                    onChange={handleChange}
                                    placeholder={editandoId ? 'Deixe em branco para manter a atual' : ''}
                                    required={!editandoId}
                                />
                            </label>

                            <div className="modal-actions">
                                <button type="button" onClick={fecharModal}>Cancelar</button>
                                <button type="submit">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usuarios;