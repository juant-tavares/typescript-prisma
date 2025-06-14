import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import { PrismaClient } from '../generated/prisma';

import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

const prisma = new PrismaClient();
const port: number = 3000;

type Discipline = {
  name: string;
  professor: string;
  semestre?: number;
};

interface Aluno {
  name: string;
  age: number;
  disciplines: Array<Discipline>;
}

let aluno: Aluno = {
  name: "Otávio",
  age: 40,
  disciplines: [],
};

const app: Express = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
