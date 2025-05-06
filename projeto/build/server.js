"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
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
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
