const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');


//routes
router
/**
 * @swagger
 * /api/login:
 *  post:
 *    summary: Inicio de Sesion
 *    tags: [Inicio de Sesion]
 *    responses:
 *      200:
 *        description: Token obtenido, sesion iniciada.
 */
.post("/", loginControllers.loginSession);

module.exports = router;