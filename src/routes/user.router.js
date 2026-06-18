import Router from "express";
import { userModel } from "../models/user.model.js";
import { fakerES_MX as faker } from "@faker-js/faker";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

userRouter.get("/test", (req, res) => {
  let name = faker.person.fullName();
  let email = faker.internet.email();
  let password = faker.internet.password();
  let fakeUser = {
    name,
    email,
    password,
  };
  res.send(fakeUser);
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne(
    ({ email: email }, { password: password }),
  );

  if (user) {
    res.send({ status: "ok", message: "el user se logeó correctamente" });
  } else {
    res.status(400).send({
      status: "error",
      message: "El usuario o contraseña es incorrecto",
    });
  }
});

userRouter.post("/create", async (req, res) => {
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
