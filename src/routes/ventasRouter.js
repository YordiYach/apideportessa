const express = require('express');
const router = express.Router();
const token = require('../controllers/loginControllers');
const ventasController = require('../controllers/ventasControllers')

//routes
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security:
 *  - bearerAuth: []
 *  schemas:
 *    Venta:
 *      type: object
 *      properties:
 *        idProducto:
 *          type: integer
 *          description: ID del producto
 *        cantidadVendida:
 *          type: integer
 *          description: Cantidad de productos vendidos
 *      required:
 *        - idProducto
 *        - cantidadVendida
 *      example:
 *        idProducto: 1
 *        cantidadVendida: 15
 */
router
/**
 * @swagger
 * /api/ventas:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Hace una venta nueva, descontando el stock
 *    tags: [ventas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Venta'
 *    responses:
 *      200:
 *        description: Venta realizada con exito
 */
.post("/", token.verifyToken, ventasController.newProductSale)

module.exports = router;