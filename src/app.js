import express from "express";
import mongoose from "mongoose";
import { addLogger } from "./utils/logger.js";
import userRouter from "./routes/user.router.js";


const app = express();
const port = 8080;

app.listen(port, () => {
  console.log("Server activated on port: " + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);

mongoose
  .connect("mongodb://localhost:27017/prueba_testing")
  .then(() => console.log("Conectado a MongoDB de forma exitosa"))
  .catch((err) => console.error("Error en la base de datos: ", error));

app.get("/", (req, res) => {
  req.logger.info("Estoy en la pag principal");
  res.send({ status: "ok", message: "Estamos en la pagina principal" });
});

app.get("/admin", (req, res) => {
  req.logger.warning("Estoy en el admin");
  res.send("Estamos en el panel de admin");
});

app.get("/cpanel", (req, res) => {
  req.logger.fatal("Estoy en el Panel de Admin Hosting");
  res.send("Estamos en el panel de admin");
});

app.get("/operacion_simple", (req, res) => {
  let total = 0;

  for (let i = 0; i < 1000000; i++) {
    total += 1;
  }

  res.send(total);
});

app.get("/operacion_compleja", (req, res) => {
  let total = 0;

  for (let i = 0; i < 1000000000; i++) {
    total += 1;
  }

  res.send(total);
});

app.use("/api/users", userRouter);
