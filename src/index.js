const express = require('express');

const stockRouter = require("./routes/stockRouter.js");
const loginRouter = require("./routes/loginRouter");
const ventasRouter = require("./routes/ventasRouter");
const ingresosRouter = require("./routes/ingresosRouter");

const app = express();
const PORT = process.env.PORT || 3000;

//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REGISTRO E INVENTARIO DEPORTES S.A.",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/routes/*.js"],
};

//configuration
app.use(express.json());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));

//routes
app.use("/api/stock", stockRouter);
app.use("/api/login", loginRouter);
app.use("/api/ingresos", ingresosRouter);
app.use("/api/ventas", ventasRouter);

//comprobation
app.use((req, res, next) => {
  res.status(404.3).json({
    Atencion: "Falla de autenticación o endpoint desconocido",
  });
});

//server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
