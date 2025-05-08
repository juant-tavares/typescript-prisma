"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const port = 3000; // localhost:3000
let aluno = {
    name: "Otávio",
    age: 40,
    disciplines: []
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, response) => {
    response.json({
        status: "OK"
    });
});
app.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Rota /api/users foi chamada");
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json({
            status: "ok",
            users: users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : String(error),
        });
    }
}));
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
