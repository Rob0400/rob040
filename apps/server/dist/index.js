// src/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
var app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
var httpServer = createServer(app);
var io = new Server(httpServer, { cors: { origin: "*" } });
var prisma = new PrismaClient();
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "rob04-server" });
});
app.post("/users", async (req, res) => {
  const { email, displayName } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email, displayName } });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upsert user" });
  }
});
io.on("connection", (socket) => {
  socket.on("join", (chatId) => {
    socket.join(chatId);
  });
  socket.on("message", async (msg) => {
    try {
      const saved = await prisma.message.create({
        data: {
          id: msg.id,
          chatId: msg.chatId,
          senderId: msg.senderId,
          type: msg.type,
          text: msg.text,
          mediaUrl: msg.mediaUrl
        }
      });
      io.to(msg.chatId).emit("message", { ...msg, createdAt: saved.createdAt.toISOString() });
    } catch (error) {
      console.error("Failed to persist message", error);
    }
  });
  socket.on("call:signal", (payload) => {
    io.to(payload.chatId).emit("call:signal", payload);
  });
});
var port = process.env.PORT || 4e3;
httpServer.listen(port, () => {
  console.log(`rob04 server listening on ${port}`);
});
//# sourceMappingURL=index.js.map