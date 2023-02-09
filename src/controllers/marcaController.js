const jwt = require('jsonwebtoken')
const marca = require('../database/marca');

const getMarcas = (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Marcas obtenidas",
        Marca: marca,
      });
    }
  });
};

const getMarcaActiva = (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const marcasActivas = [];
      marca.forEach((element) => {
        if (element.existencia == true) {
          marcasActivas.push(element);
        }
      });
      if (marcasActivas.length > 0) {
        res.status(200).send(marcasActivas);
      } else {
        return res.status(200).send("Parece que no se cuenta con stock");
      }
    }
  });
};

const softDelete = (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {

        const marca2 = marca.find((c) => c.idMarca === parseInt(req.params.id));
        if (!marca2) {
          return res.status(404).send("Producto no encontrado, verifica ID");
        } else {
          const index = marca.indexOf(marca2);
          marca[index] = {
            ...marca[index],
            existencia: false,
          };
          res.status(200).send(getMarcaActiva(req, res));
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
        idMarca: marca.length == 0 ? 1 : marca[marca.length - 1].idMarca + 1,
        nombre: req.body.nombre,
        existencia: true,
      };

      marca.push(product);
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
      let { existencia } = req.body;
      let tmpProduct;

      try {
        for (let [index, item] of marca.entries()) {
          if (id == item.idMarca) {
            tmpProduct = {
              ...item,
              existencia
            };
            marca[index] = tmpProduct;
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

module.exports = {
  getMarcas,
  getMarcaActiva,
  softDelete,
  createProduct,
  editProduct
}