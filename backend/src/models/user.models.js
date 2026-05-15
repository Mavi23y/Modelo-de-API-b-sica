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
    }
};

module.exports = userModel;