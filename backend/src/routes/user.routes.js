const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

router.post('/login', userController.login);
router.post('/cadastrar', userController.cadastrar);

router.get('/teste', (req, res) => {
    res.json({ mensagem: "Rota de teste funcionando!" });
});

module.exports = router;