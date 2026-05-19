const userModel = require('../models/user.models');

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await userModel.fazerLogin(email, senha);
        if (usuario) {
            return res.status(200).json({ mensagem: "Logado com sucesso!", usuario });
        } else {
            return res.status(401).json({ mensagem: "Email ou senha incorretos!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro no servidor ao tentar logar" });
    }
};

exports.cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Preencha todos os campos!" });
        }
        await userModel.cadastrar(nome, email, senha);
        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: "Email já cadastrado!" });
        }
        console.error(err);
        return res.status(500).json({ mensagem: "Erro no servidor ao cadastrar" });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await userModel.listarTodos();
        return res.status(200).json({ usuarios });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
};

exports.atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        if (!nome || !email) {
            return res.status(400).json({ mensagem: "Nome e email são obrigatórios!" });
        }
        const result = await userModel.atualizar(id, nome, email);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }
        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: "Email já está em uso!" });
        }
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
    }
};

exports.deletarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.deletar(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }
        return res.status(200).json({ mensagem: "Usuário removido com sucesso!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao remover usuário" });
    }
};