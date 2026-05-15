const userModel = require('../models/user.models');

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await userModel.fazerLogin(email, senha);
        if (usuario) {
            return res.status(200).json({ mensagem: "Logado com sucesso!", usuario });
        } else {
            return res.status(401).json({ mensagem: "Email ou senha errados!" });
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
        // Erro de email duplicado
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: "Email já cadastrado!" });
        }
        console.error(err);
        return res.status(500).json({ mensagem: "Erro no servidor ao cadastrar" });
    }
};