const jwt = require('jsonwebtoken')
const products = require('../database/products');

const getProducts = (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Productos obtenidos satisfactoriamente",
        productos: products,
      });
    }
  });
};

const getActives = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const activeProducts = [];
      products.forEach((element) => {
        if (element.eliminado == false) {
          activeProducts.push(element);
        }
      });
      if (activeProducts.length > 0) {
        res.status(200).send(activeProducts);
      } else {
        return res.status(200).send("Parece que no se cuenta con stock");
      }
    }
  });
};

const getProductById = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = products.find((c) => c.id === parseInt(req.params.id));
      if (!product) {
        return res.status(404).send("Producto no encontrado, verifica ID");
      } else {
        res.status(200).send(product);
      }
    }
  });
};

const getProductByBrands = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const productsByBrand = [];
      products.forEach((element) => {
        if (element.marca == req.params.id) {
          productsByBrand.push(element);
        }
      });
      if (productsByBrand.length > 0) {
        res.status(200).send(productsByBrand);
      } else {
        return res.status(200).send("No existen productos para esta marca");
      }
    }
  });
};

const getProductByLine = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const productsByLine = [];
      products.forEach((element) => {
        if (element.linea == req.params.id) {
          productsByLine.push(element);
        }
      });
      if (productsByLine.length > 0) {
        res.status(200).send(productsByLine);
      } else {
        return res.status(200).send("No existen productos para esta linea.");
      }
    }
  });
};

const createProduct = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = {
        id: products.length == 0 ? 1 : products[products.length - 1].id + 1,
        descripcion: req.body.descripcion,
        precio: parseInt(req.body.precio),
        eliminado: req.body.eliminado === "true",
        stock: req.body.stock,
        marca: req.body.marca,
        linea: req.body.linea,
      };

      products.push(product);
      res.status(201).send({ Producto_Agregado: product });
    }
  });
};

const editProduct = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let { id } = req.params;
      let { descripcion, precio, eliminado, stock, marca, linea } = req.body;
      let tmpProduct;

      try {
        for (let [index, item] of products.entries()) {
          if (id == item.id) {
            tmpProduct = {
              ...item,
              descripcion,
              precio,
              eliminado,
              stock,
              marca,
              linea,
            };
            products[index] = tmpProduct;
          }
        }
        if (tmpProduct) {
          console.log();
          res.status(200).json(tmpProduct);
        } else {
          res.status(404).json({ response: "ID no encontrado" });
        }
      } catch (error) {
        res.status(500).json({ response: error.message });
      }
    }
  });
};

const deleteProduct = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = products.find((c) => c.id === parseInt(req.params.id));
      if (!product) {
        return res.status(404).send("Producto no encontrado, verifica ID");
      } else {
        const index = products.indexOf(product);
        products.splice(index, 1);
        res.status(200).send(product);
      }
    }
  });
};

const softDelete = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = products.find((c) => c.id === parseInt(req.params.id));
      if (!product) {
        return res.status(404).send("Producto no encontrado, verifica ID");
      } else {
        const index = products.indexOf(product);
        products[index] = {
          ...products[index],
          eliminado: true,
        };
        res.status(200).send(getActives(req, res));
      }
    }
  });
};

module.exports = {
  getProducts,
  getActives,
  softDelete,
  getProductById,
  getProductByBrands,
  getProductByLine,
  createProduct,
  editProduct,
  deleteProduct
}