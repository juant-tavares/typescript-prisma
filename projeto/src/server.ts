import express, {Express, Request, Response} from "express";

const port : number = 3000;

type Discipline = {
	name: string;
	professor: string;
	semestre?: number; (opcional)
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

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))