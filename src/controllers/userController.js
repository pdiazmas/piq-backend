// Base de datos temporal
let playerPoints = {
  Alice: 20000,
  Bob: 195000,
  Charlie: 900,
};

// --- NUEVO: Obtener todos los usuarios ---
exports.getAllUsers = (req, res) => {
  // Convertimos el objeto en una lista para que sea más fácil de leer en Flutter
  const usersList = Object.keys(playerPoints).map((name) => ({
    name: name,
    points: playerPoints[name],
  }));

  res.json({ status: "success", data: usersList });
};

// Obtener puntos de un jugador específico
exports.getPlayerPoints = (req, res) => {
  const { playerName } = req.params;
  const points = playerPoints[playerName];

  if (points !== undefined) {
    res.json({ status: "success", data: { name: playerName, points } });
  } else {
    res.status(404).json({ status: "error", message: "Jugador no encontrado" });
  }
};

// Actualizar puntos
exports.updatePoints = (req, res) => {
  const { playerName, amount, operation } = req.body;

  if (playerPoints[playerName] === undefined) {
    return res
      .status(404)
      .json({ status: "error", message: "Usuario no existe" });
  }

  if (operation === "subtract" && playerPoints[playerName] < amount) {
    return res
      .status(400)
      .json({ status: "error", message: "Saldo insuficiente" });
  }

  playerPoints[playerName] =
    operation === "add"
      ? playerPoints[playerName] + amount
      : playerPoints[playerName] - amount;

  res.json({
    status: "success",
    message: "Saldo actualizado",
    newBalance: playerPoints[playerName],
  });
};
