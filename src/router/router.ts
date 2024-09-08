import {Router} from "express";
import { userRouter } from "./UserRoutes";

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.send("Hello World!");
});

mainRouter.use("/users", userRouter);

export {mainRouter};