import express, { json } from "express";
import { createDatabase } from "./database";
import { html } from "./html";
import { router } from "./routes";

const database = createDatabase([
  {
    id: 1,
    description: "Milk",
    isComplete: false,
  },
  {
    id: 2,
    description: "Bread",
    isComplete: false,
  },
  {
    id: 3,
    description: "Toilet paper",
    isComplete: false,
  },
  {
    id: 4,
    description: "Toilet paper",
    isComplete: false,
  },
  {
    id: 5,
    description: "Toilet paper",
    isComplete: false,
  },
  {
    id: 6,
    description: "Hand sanitiser",
    isComplete: false,
  },
]);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(json())
  .use((req, res, next) => {
    req.database = database;
    next();
  })
  .use(router)
  .get("/*", (req, res) => {
    res.status(200).send(html);
  });

export default server;
