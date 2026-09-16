const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const router = require('../src/routes/routes')

app.use(cors());
app.use(express.json());
app.use(router);

<<<<<<< HEAD
app.get('/api/mensagem', (req, res) => {
    res.json({ texto: "Ola do servidor!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
=======
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
>>>>>>> c5cf86c059729f25df4e5e001551fc767703ed27
