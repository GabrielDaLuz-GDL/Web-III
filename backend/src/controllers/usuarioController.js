const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcrypt');

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuarios();
        res.status(200).json({ data: usuarios });
    } catch (err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuarios' });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obterUsuarioPorId(id);

        if (!usuario) return res.status(404).json({ err: 'Usuario não encontrado' });

        res.status(200).json({ data: usuario });
    } catch (err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuario' });
    }
};

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) return res.status(400).json({ err: 'Dados Invalidos' });

        const hash = await bcrypt.hash(senha,10);

        const usuario = await usuarioService.criarUsuario({ nome, email, senha });
        res.status(201).json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Erro interno ao criar usuario' });
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        if (!nome || !email) return res.status(400).json({ err: 'Dados Invalidos' });

        const dadosAtualizados = { nome, email };
        if (senha) dadosAtualizados.senha = senha;

        const usuario = await usuarioService.atualizarUsuario(id, dadosAtualizados);

        if (!usuario) return res.status(404).json({ err: 'Usuario não encontrado' });
        res.status(200).json({ data: usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Erro interno ao atualizar usuario' });
    }
};

const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.deletarUsuario(id);

        if (!usuario) return res.status(404).json({ err: 'Usuario não encontrado' });
        res.status(200).json({ data: usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Erro interno ao deletar usuario' });
    }
};

module.exports = { 
    buscarUsuarios, 
    criarUsuario, 
    buscarUsuarioPorId, 
    atualizarUsuario, 
    deletarUsuario 
};