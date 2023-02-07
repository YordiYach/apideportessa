const express = require('express');
const router = express.Router();
const token = require('../controllers/loginControllers');
const ingresosControllers = require('../controllers/ingresosControllers')

//routes
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
 *    Ingresos:
 *      type: object
 *      properties:
 *        id de venta:
 *          type: string
 *          description: Generado por un uuid
 *        fecha de venta:
 *          type: string
 *          description: Fecha de la venta del producto
 *        itemVendido:
 *          type: string
 *          description: Nombre del producto
 *        marca:
 *          type: Number
 *          description: ID Marca del producto
 *        linea:
 *          type: integer
 *          description: ID linea del producto
 *        cantidadVendida:
 *          type: integer
 *          description: Cantidad de productos vendidos
 *        subtotal:
 *          type: integer
 *          description: Precio unidad
 *        total:
 *          type: integer
 *          description: Total a pagar
 *      example:
 *        id de venta: 1
 *        fecha de venta: 25/01/2023
 *        itemVendido: Sueter
 *        marca: 1
 *        linea: 3
 *        cantidadVendida: 2
 *        subtotal: 100
 *        total: 500
 */
router
/**
 * @swagger
 * /api/ingresos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las ventas
 *    tags: [Ingresos]
 *    responses:
 *      200:
 *        description: se han obtenido todos las ventas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Ingresos'
 *
 */
.get("/", token.verifyToken, ingresosControllers.getSales);

module.exports = router;