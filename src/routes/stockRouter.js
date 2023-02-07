const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockControllers')
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
 *    Producto:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Autoincremental por defecto
 *        descripcion:
 *          type: string
 *          description: Nombre del producto
 *        precio:
 *          type: Number
 *          description: Precio del producto
 *        eliminado:
 *          type: boolean
 *          description: No eliminado por defecto.
 *        stock:
 *          type: integer
 *          description: Cantidad de productos para agregar al inventario
 *        marca:
 *          type: integer
 *          description: ID de la marca
 *        linea:
 *          type: integer
 *          description: ID linea del producto
 *      required:
 *        - descripcion
 *        - precio
 *        - stock
 *        - marca
 *        - linea
 *      example:
 *        descripcion: Sudadero Gran Era
 *        precio: 790
 *        stock: 100
 *        marca: 1
 *        linea: 3
 */
router
/**
 * @swagger
 * /api/stock:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los productos del inventario
 *    tags: [Producto]
 *    responses:
 *      200:
 *        description: se han obtenido todos los productos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *
 */
  .get("/", token.verifyToken, stockController.getProducts)
/**
 * @swagger
 * /api/stock/activos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los productos activos
 *    tags: [Producto]
 *    responses:
 *      200:
 *        description: se han obtenido todos los productos activos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *
 */
  .get("/activos", token.verifyToken, stockController.getActives)
  
/**
 * @swagger
 * /api/stock/eliminar/{id}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Eliminado suave del producto en stock
 *    tags: [Producto]
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
 *              $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Por favor comprueba el ID
 */
  .post("/eliminar/:id", token.verifyToken, stockController.softDelete)
  
/**
 * @swagger
 * /api/stock/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna un producto según su ID
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Producto
 *    responses:
 *      200:
 *        description: Se ha obtenido el producto
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Por favor comprueba el ID.
 */
  .get("/:id", token.verifyToken, stockController.getProductById)
/**
 * @swagger
 * /api/stock:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Añade productos al stock
 *    tags: [Producto]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      201:
 *        description: Producto agregado al stock.
 */
  .post("/", token.verifyToken, stockController.createProduct)
/**
 * @swagger
 * /api/stock/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza un producto en stock
 *    tags: [Producto]
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
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      200:
 *        description: Producto actualizado en Stock
 *      404:
 *        description: No se ha encontrado el producto por favor comprueba el ID
 */
  .put("/:id", token.verifyToken, stockController.editProduct)
/**
 * @swagger
 * /api/stock/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina un producto del stock
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Producto
 *    responses:
 *      200:
 *        description: Se ha eliminado el producto
 *      404:
 *        description: No se ha encontrado el producto por favor comprueba el ID
 */
  .delete("/:id", token.verifyToken, stockController.deleteProduct)
/**
 * @swagger
 * /api/stock/marca/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna los productos que se encuentren en stock segun la marca
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Marca
 *    responses:
 *      200:
 *        description: Se ha obtenido el producto
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Producto no encontrado, por favor verifique el ID
 */
  .get("/marca/:id", token.verifyToken, stockController.getProductByBrands)
/**
 * @swagger
 * /api/stock/linea/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna los productos de stock segun la linea
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID linea
 *    responses:
 *      200:
 *        description: Se ha obtenido el producto
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *      404:
 *        description: No se ha encontrado el producto por favor comprueba el ID
 */
  .get("/linea/:id", token.verifyToken, stockController.getProductByLine)

  module.exports = router;