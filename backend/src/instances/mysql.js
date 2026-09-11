const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

// Testa a conexão e sincroniza os models com o banco
sequelize.authenticate()
    .then(() => console.log('Conexão com o banco estabelecida com sucesso.'))
    .catch(err => console.error('Erro ao conectar no banco:', err));

sequelize.sync({ alter: true })
    .then(() => console.log('Tabelas sincronizadas com sucesso.'))
    .catch(err => console.error('Erro ao sincronizar tabelas:', err));

module.exports = { sequelize };