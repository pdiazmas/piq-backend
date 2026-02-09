const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("piq_db", "piquser", "piqpassword", {
  host: "europe-west2-001.proxy.sevalla.app", // El que NO termina en .local
  port: 30423, // El que te dé Sevalla
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: false, // Cambia a true si tu base de datos requiere SSL (la mayoría lo hace en producción)
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  keepAlive: true, // Ayuda a que el túnel con Sevalla no se cierre
});

module.exports = sequelize;
