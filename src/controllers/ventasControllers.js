const jwt = require('jsonwebtoken');
const sales = require('../database/sales');
const products = require('../database/products');
const {v4: uuid} = require('uuid')

const newProductSale = (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        let id = req.body.idProducto;
        let cantidad = req.body.cantidadVendida;
        
        if (cantidad) {
          if (id) {
            let index = products.findIndex((el) => el.id == id);
            let price = products.find((el) => el.id == id);
  
            if (products.find((el) => el.id == id).stock >= cantidad) {
              const soldProduct = {
                ...products[index],
                total: price.precio * cantidad,
              };
              const newSale = {
                "id de venta": uuid(),
                "fecha de venta": new Date().toLocaleDateString("en-US",{timeZone: "UTC"}),
                itemVendido: soldProduct.descripcion,
                marca: soldProduct.marca,
                linea: soldProduct.linea,
                cantidadVendida: cantidad,
                subtotal: soldProduct.precio,
                total: soldProduct.total,
              };
  
              sales.push(newSale);
  
              products[index] = {
                ...products[index],
                stock: products.find((el) => el.id == id).stock - cantidad,
              };
              res.send({
                message: "Venta realizada.",
                detalles: newSale,
              });
            } else {
              res.send({
                message: "No hay suficientes productos.",
              });
            }
          } else {
             return res.status(500).send("Datos incorrectos.");
          }
        } else {
            return res.status(500).send("Datos incorrectos.");
        }
      }
    });
  };
  

module.exports = {
    newProductSale
}