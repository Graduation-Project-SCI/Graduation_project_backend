import express from "express";
import { Request , Response } from "express";
import routes from "./src/Router";
const app = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript With Express");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});


