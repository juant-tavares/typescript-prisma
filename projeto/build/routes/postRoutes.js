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
// GET /api/posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma.post.findMany({ include: { author: true } });
    res.json(posts);
}));
// GET /api/posts/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma.post.findUnique({
        where: { id: Number(req.params.id) },
        include: { author: true },
    });
    post ? res.json(post) : res.status(404).json({ error: "Postagem não encontrada" });
}));
// POST /api/posts
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, published, authorId } = req.body;
    try {
        const post = yield prisma.post.create({
            data: {
                title,
                content,
                published,
                author: { connect: { id: Number(authorId) } },
            },
        });
        res.status(201).json(post);
    }
    catch (_a) {
        res.status(400).json({ error: "authorId ou dado inválido" });
    }
}));
// PUT /api/posts/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, published } = req.body;
    try {
        const post = yield prisma.post.update({
            where: { id: Number(req.params.id) },
            data: { title, content, published },
        });
        res.json(post);
    }
    catch (_a) {
        res.status(404).json({ error: "Postagem não encontrada" });
    }
}));
// DELETE /api/posts/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.post.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "Postagem excluída" });
    }
    catch (_a) {
        res.status(404).json({ error: "Postagem não encontrada" });
    }
}));
exports.default = router;
