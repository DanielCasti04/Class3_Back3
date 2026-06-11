import Router from "express";
import { userModel } from "../models/user.model.js";

const userRouter = Router();

userRouter.use("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne(
    ({ email: email }, { password: password }),
  );

  if (user) {
    res.send({ status: "ok", message: "el user se logeó correctamente" });
  } else {
    res
      .status(400)
      .send({
        status: "error",
        message: "El usuario o contraseña es incorrecto",
      });
  }
});

userRouter.use("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password };
  const user = await userModel.insertOne(newUser);

  if (user) {
    res.send({ status: "ok", message: "el user se logeó correctamente" });
  } else {
    res
      .status(400)
      .send({ status: "error", message: "no se pudó crear el user" });
  }
});

export default userRouter;
