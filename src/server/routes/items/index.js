import { Router } from "express";
import { getItems } from "./get";
import { patchItem } from "./patch";
import { postItem } from "./post";

const itemsRouter = new Router();

itemsRouter.get("/", getItems);
itemsRouter.patch("/:id", patchItem);
itemsRouter.post("/", postItem);

export { itemsRouter };
