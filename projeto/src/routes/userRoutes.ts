// src/routes/userRoutes.ts
import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// GET /api/users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: true },
  });
  user ? res.json(user) : res.status(404).json({ error: "Usuário não encontrado" });
});

// POST /api/users
router.post("/", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "O email precisa ser único" });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { email, name },
    });
    res.json(user);
  } catch {
    res.status(404).json({ error: "Usuário não encontrado ou email ..." });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Usuário deletado" });
  } catch {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

export default router;