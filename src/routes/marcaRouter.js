const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController')
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
 *    Marca:
 *      type: object
 *      properties:
 *        idMarca:
 *          type: integer
 *          description: Marca asignada
 *        nombre:
 *          type: string
 *          description: Nombre de la marca
 *        existencia:
 *          type: boolean
 *          description: No eliminado por defecto.
 *      required:
 *        - nombre
 *      example:
 *        nombre: Chicote
 *    MarcaEdit:
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
 * /api/marcas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las marcas almacenadas
 *    tags: [Marca]
 *    responses:
 *      200:
 *        description: Se han obtenido todas las marcas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Marca'
 *
 */
  .get("/", token.verifyToken, marcaController.getMarcas)
/**
 * @swagger
 * /api/marcas/activos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las marcas activas
 *    tags: [Marca]
 *    responses:
 *      200:
 *        description: Se han obtenido todos los productos activos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Marca'
 *
 */
  .get("/activos", token.verifyToken, marcaController.getMarcaActiva)
  
/**
 * @swagger
 * /api/marcas/eliminar/{id}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Eliminado suave del producto en stock
 *    tags: [Marca]
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
 *              $ref: '#/components/schemas/Marca'
 *      404:
 *        description: Por favor comprueba el ID
 */
  .post("/eliminar/:id", token.verifyToken, marcaController.softDelete)
  
/**
 * @swagger
 * /api/marcas:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Añade marcas
 *    tags: [Marca]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Marca'
 *    responses:
 *      201:
 *        description: Producto agregado al stock.
 */
  .post("/", token.verifyToken, marcaController.createProduct)
/**
 * @swagger
 * /api/marcas/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una marca
 *    tags: [Marca]
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
 *            $ref: '#/components/schemas/MarcaEdit'
 *    responses:
 *      200:
 *        description: Producto actualizado en Stock
 *      404:
 *        description: No se ha encontrado el producto por favor comprueba el ID
 */
  .put("/:id", token.verifyToken, marcaController.editProduct)

  module.exports = router;