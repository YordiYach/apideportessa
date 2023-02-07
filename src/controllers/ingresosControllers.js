const jwt = require('jsonwebtoken');
const sales = require('../database/sales');

const getSales = (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.status(200).json({
                status: 200,
                message: "Ventas obtenidas",
                "Ventas": sales,
            });
        }
    });
};

module.exports = {
    getSales
}