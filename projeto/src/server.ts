import dotenv from "dotenv";
dotenv.config();

import express, {Express, Request, Response} from "express";

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient()

const port : number = 3000; // localhost:3000

type Discipline = {
	name: string;
	professor: string;
	semestre?: number;
}

interface Aluno{
	name: string;
	age: number;
	disciplines: Array<Discipline>
}

let aluno : Aluno = {
	name: "Otávio",
	age: 40,
	disciplines: []
}

const app : Express = express();
app.use(express.json());

app.get("/", (req: Request, response: Response) => {
	response.json({
		status: "OK"
	})
});

app.get("/api/users", async (req: Request, res: Response) => {
	console.log("Rota /api/users foi chamada");
	try {
		const users = await prisma.user.findMany();
		res.status(200).json({
			status: "ok",
			users: users,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			message: error instanceof Error ? error.message : String(error),
		});
	}
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))