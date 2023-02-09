const express = require('express');
const router = express.Router();
const lineaController = require('../controllers/lineaController')
const token = require('../controllers/loginControllers');

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
 *    Linea:
 *      type: object
 *      properties:
 *        idLinea:
 *          type: integer
 *          description: Linea asignada
 *        nombre:
 *          type: string
 *          description: Nombre de la marca
 *        existencia:
 *          type: boolean
 *          description: No eliminado por defecto.
 *      required:
 *        - nombre
 *      example:
 *        nombre: Pantalon
 *    LineaEdit:
 *      type: object
 *      properties:
 *        existencia:
 *          type: boolean
 *          description: No eliminado por defecto.
 *      required:
 *        - existencia
 *      example:
 *        existencia: false
 */
router
/**
 * @swagger
 * /api/lineas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las lineas almacenadas
 *    tags: [Linea]
 *    responses:
 *      200:
 *        description: Se han obtenido todas las lineas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Linea'
 *
 */
  .get("/", token.verifyToken, lineaController.getMarcas)
/**
 * @swagger
 * /api/lineas/activos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las lineas activas
 *    tags: [Linea]
 *    responses:
 *      200:
 *        description: Se han obtenido todos los productos activos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Linea'
 *
 */
  .get("/activos", token.verifyToken, lineaController.getMarcaActiva)
  
/**
 * @swagger
 * /api/lineas/eliminar/{id}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Eliminado suave del producto en stock
 *    tags: [Linea]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Producto
 *    responses:
 *      200:
 *        description: Se ha eliminado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Linea'
 *      404:
 *        description: Por favor comprueba el ID
 */
  .post("/eliminar/:id", token.verifyToken, lineaController.softDelete)
  
/**
 * @swagger
 * /api/lineas:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Añade lineas
 *    tags: [Linea]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Linea'
 *    responses:
 *      201:
 *        description: Producto agregado al stock.
 */
  .post("/", token.verifyToken, lineaController.createProduct)
/**
 * @swagger
 * /api/lineas/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una marca
 *    tags: [Linea]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del producto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/LineaEdit'
 *    responses:
 *      200:
 *        description: Producto actualizado en Stock
 *      404:
 *        description: No se ha encontrado el producto por favor comprueba el ID
 */
  .put("/:id", token.verifyToken, lineaController.editProduct)

  module.exports = router;