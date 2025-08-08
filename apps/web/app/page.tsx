"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { appName, MessagePayload } from '@rob04/shared';
import { Moon, Sun } from 'lucide-react';
import { v4 as uuid } from 'uuid';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000';

export default function HomePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [chatId, setChatId] = useState<string>('public');
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [text, setText] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const socket = io(serverUrl, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.emit('join', chatId);
    socket.on('message', (msg: MessagePayload) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  const send = () => {
    if (!text.trim() || !socketRef.current) return;
    const msg: MessagePayload = {
      id: uuid(),
      chatId,
      senderId: 'demo-user',
      createdAt: new Date().toISOString(),
      type: 'text',
      text,
      e2e: false,
    };
    socketRef.current.emit('message', msg);
    setText('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-darkBg dark:to-black">
      <div className="mx-auto max-w-3xl p-4">
        <header className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-semibold text-primary">{appName}</h1>
          <button
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <input
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="flex-1 rounded-md border bg-white/70 px-3 py-2 text-sm outline-none backdrop-blur dark:bg-black/40"
            placeholder="Chat ID (join room)"
          />
          <button
            onClick={() => socketRef.current?.emit('join', chatId)}
            className="rounded-md bg-primary px-3 py-2 text-sm text-white shadow hover:brightness-110"
          >
            Join
          </button>
        </div>

        <section className="h-[60vh] overflow-y-auto rounded-lg border bg-white/60 p-3 dark:bg-black/30">
          {messages.map((m) => (
            <div key={m.id} className="mb-2">
              <div className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleTimeString()}</div>
              <div className="rounded-md bg-white px-3 py-2 shadow dark:bg-gray-900">{m.text}</div>
            </div>
          ))}
        </section>

        <div className="mt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            className="flex-1 rounded-md border bg-white/70 px-3 py-2 text-sm outline-none backdrop-blur dark:bg-black/40"
            placeholder="Type a message"
          />
          <button onClick={send} className="rounded-md bg-secondary px-3 py-2 text-sm text-white shadow hover:brightness-110">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}