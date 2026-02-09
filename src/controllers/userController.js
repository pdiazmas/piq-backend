const User = require('../models/User');

// --- Obtener todos los usuarios de Postgres ---
exports.getAllUsers = async (req, res) => {
  try {
    // Buscamos todos y los ordenamos por puntos de mayor a menor
    const users = await User.findAll({
      order: [['points', 'DESC']]
    });
    res.json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// --- Obtener puntos de un jugador específico ---
exports.getPlayerPoints = async (req, res) => {
  try {
    const { playerName } = req.params;
    const user = await User.findOne({ where: { name: playerName } });

    if (user) {
      res.json({ status: "success", data: user });
    } else {
      res.status(404).json({ status: "error", message: "Jugador no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// --- Actualizar puntos con persistencia en Postgres ---
exports.updatePoints = async (req, res) => {
  try {
    const { playerName, amount, operation } = req.body;
    
    // 1. Buscamos al usuario
    const user = await User.findOne({ where: { name: playerName } });

    if (!user) {
      return res.status(404).json({ status: "error", message: "Usuario no existe" });
    }

    // 2. Lógica de negocio
    if (operation === "subtract" && user.points < amount) {
      return res.status(400).json({ status: "error", message: "Saldo insuficiente" });
    }

    const newPoints = operation === "add" 
      ? user.points + parseInt(amount) 
      : user.points - parseInt(amount);

    // 3. Guardamos los cambios
    await user.update({ points: newPoints });

    res.json({
      status: "success",
      message: "Saldo actualizado en PostgreSQL",
      newBalance: user.points,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
