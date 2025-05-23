import express from "express";
import userController from "./controllers/userController.js";
import authorController from "./controllers/authorController.js";
import categoryController from "./controllers/categoryController.js";
import publishersController from "./controllers/publishersController.js";

const route = express();

route.use("/user", userController);
route.use("/autor", authorController);
route.use("/categoria", categoryController);
route.use("/editora", publishersController);



export default route;