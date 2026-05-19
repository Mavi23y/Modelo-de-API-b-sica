const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

// POST
router.post('/cadastrar', userController.cadastrar);
router.post('/login',     userController.login);

// GET
router.get('/teste', (req, res) => {
    res.json({ mensagem: "Rota de teste funcionando!" });
});
router.get('/', userController.listarUsuarios);

// PUT
router.put('/:id', userController.atualizarUsuario);

// DELETE
router.delete('/:id', userController.deletarUsuario);

module.exports = router;
