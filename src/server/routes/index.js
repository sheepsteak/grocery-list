import { Router } from "express";
import { itemsRouter } from "./items";

const router = new Router();
router.use("/api/items", itemsRouter);

export { router };
