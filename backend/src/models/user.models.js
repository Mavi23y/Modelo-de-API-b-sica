const db = require('../config/db');

const userModel = {

    fazerLogin: async (email, senha) => {
        const sql = `SELECT id, nome, email FROM user WHERE email = ? AND senha = ?`;
        const [rows] = await db.execute(sql, [email, senha]);
        return rows[0];
    },

    cadastrar: async (nome, email, senha) => {
        const sql = `INSERT INTO user (nome, email, senha) VALUES (?, ?, ?)`;
        const [result] = await db.execute(sql, [nome, email, senha]);
        return result;
    },

    listarTodos: async () => {
        const sql = `SELECT id, nome, email FROM user`;
        const [rows] = await db.execute(sql);
        return rows;
    },

    atualizar: async (id, nome, email) => {
        const sql = `UPDATE user SET nome = ?, email = ? WHERE id = ?`;
        const [result] = await db.execute(sql, [nome, email, id]);
        return result;
    },

    deletar: async (id) => {
        const sql = `DELETE FROM user WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result;
    }

};

module.exports = userModel;