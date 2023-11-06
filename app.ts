import express from "express";
import { Request , Response } from "express";
import {router as DoctorRuote} from './src/Router/DoctorRuote'
const app = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript With Express");
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});

app.use('/Doctors',DoctorRuote)

