const app = require("./src/app");
const sequelize = require("./src/config/database");
const User = require("./src/models/User");

const PORT = 30423;

// Sincronizamos con Postgres
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("✅ Conectado a PostgreSQL");

    // Opcional: Crear usuarios semilla si la tabla está vacía
    const count = await User.count();
    if (count === 0) {
      await User.bulkCreate([
        { name: "Alice", points: 200 },
        { name: "Bob", points: 1950 },
        { name: "Charlie", points: 900 },
      ]);
      console.log("🌱 Usuarios iniciales creados en Postgres");
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor listo en http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error conectando a Postgres:", err);
  });
