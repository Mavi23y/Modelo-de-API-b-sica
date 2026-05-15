const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conexão com o banco de dados 
pool.getConnection()
  .then(() => console.log('Conectado ao MySQL!'))
  .catch(err => console.error('Erro ao conectar:', err));

module.exports = pool;