<<<<<<< HEAD
const Usuario = require('../models/Usuario');

const obterTodosUsuarios = async () => {
    return await Usuario.findAll();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const criarUsuario = async ({ nome, email, senha }) => {
    return await Usuario.create({ nome, email, senha });
};

const atualizarUsuario = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    await usuario.update(dados);
    return usuario;
};

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    await usuario.destroy();
    return usuario;
};

module.exports = { obterTodosUsuarios, obterUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario }
=======
const obterTodosUsuarios = async () => {
    const mockUsuarios = [
        {
            id: 1, nome: 'João', email: 'joao@email.com'
        },

        {
            id: 2, nome: 'Marcos', email: 'marcos@email.com'
        }
    ]

    return mockUsuarios;
};

module.export = { obterTodosUsuarios }
>>>>>>> c5cf86c059729f25df4e5e001551fc767703ed27
