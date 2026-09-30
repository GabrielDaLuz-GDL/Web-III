const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar, autorizar } = require('../middlewares/authMiddleware');

router.post('/', usuarioController.criarUsuario);


router.get('/', usuarioController.buscarUsuarios);
router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);
router.put('/:id', autenticar, usuarioController.atualizarUsuario);
router.delete('/:id', autenticar, autorizar('admin'), usuarioController.deletarUsuario);


module.exports = router;