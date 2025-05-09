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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const router = (0, express_1.Router)();
// GET /api/users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({ include: { posts: true } });
    res.json(users);
}));
// GET /api/users/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: Number(req.params.id) },
        include: { posts: true },
    });
    user ? res.json(user) : res.status(404).json({ error: "Usuário não encontrado" });
}));
// POST /api/users
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    try {
        const user = yield prisma.user.create({ data: { email, name } });
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: "O email precisa ser único" });
    }
}));
// PUT /api/users/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    try {
        const user = yield prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { email, name },
        });
        res.json(user);
    }
    catch (_a) {
        res.status(404).json({ error: "Usuário não encontrado ou email ..." });
    }
}));
// DELETE /api/users/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "Usuário deletado" });
    }
    catch (_a) {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
}));
exports.default = router;
