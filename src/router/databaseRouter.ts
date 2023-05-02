import express from "express";
import DataBaseController from "../controller/DataBaseController";

const databaseRouter = express.Router();
const databaseController = new DataBaseController();

databaseRouter.get("/recreate", databaseController.reCreate);
databaseRouter.get("/init", databaseController.init);

export default databaseRouter;