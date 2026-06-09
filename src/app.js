import express from "express";
import { addLogger } from "./utils/logger.js";

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log("Server activated on port: " + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);

app.get("/", (req, res) => {
  res.send({ status: "ok", message: "Estamos en la pagina principal" });
});

app.get("/admin", (req, res) => {
    req.logger.warn("Estoy en el admin")
  res.send("Estamos en el panel de admin");
});
