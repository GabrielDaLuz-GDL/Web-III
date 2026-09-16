<<<<<<< HEAD
const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes );


module.exports = router;
=======
const Router = require('express');
const usuariosRoutes = express.Router();

const router = Router();

router.use('/usuarios', usuarioRoutes);

export default router;
>>>>>>> c5cf86c059729f25df4e5e001551fc767703ed27
