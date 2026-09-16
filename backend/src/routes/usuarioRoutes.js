const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.buscarUsuarios);
<<<<<<< HEAD
router.post('/', usuarioController.criarUsuario);
router.get('/:id', usuarioController.buscarUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);
=======
>>>>>>> c5cf86c059729f25df4e5e001551fc767703ed27

module.exports = router;