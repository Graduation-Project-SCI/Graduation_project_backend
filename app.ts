import express from "express";
import Routers from './src/Router/index'
import cors from 'cors'
const app = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:5173'}))

app.use('/api', Routers)

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});


