const jwt = require('jsonwebtoken')

const loginSession = (req, res) => {
  const user = {
    id: 1,
    nombre: "admin",
    email: "admin@admin.com"
  }
  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token
    })
  })
}

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = { loginSession, verifyToken }