const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Esta es la ruta que te faltaba: responde a GET /api/users
router.get('/', userController.getAllUsers);

// Responde a GET /api/users/points/Alice
router.get('/points/:playerName', userController.getPlayerPoints);

// Responde a POST /api/users/update-points
router.post('/update-points', userController.updatePoints);

module.exports = router;