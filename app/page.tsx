'use client';

import { useState } from 'react';
import { models, systemRoles, temperatures } from './lib/roles';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState(systemRoles[0]);
  const [selectedModel, setSelectedModel] = useState(models[0].value);
  const [temperature, setTemperature] = useState(0.7)

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      { role: 'system', content: activeRole.prompt }, // inject selected role
      // ...messages,
      { role: 'user', content: input },
    ];

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: newMessages, 
          model: selectedModel, 
          temperature: temperature }),
      });

      const data = await res.json();
      if (data.reply) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.reply,
        };
        setMessages((msgs) => [...msgs, assistantMessage]);
      } else {
        console.error('No reply in response', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
       {/* Sidebar */}
       <aside className="w-64 bg-white border-r shadow-lg p-4 space-y-2 overflow-y-auto">
       <div className="mt-1">
          <h2 className="text-lg font-bold mb-2">Model</h2>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {models.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
       <div className="mt-1">
          <h2 className="text-lg font-bold mb-2">Creativity</h2>
          <select
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {temperatures.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <h2 className="text-lg font-bold mt-6 mb-2">AI Roles</h2>
        {systemRoles.map(role => (
          <button
            key={role.id}
            onClick={() => setActiveRole(role)}
            className={`w-full text-left p-2 rounded-lg transition ${
              role.id === activeRole.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {role.title}
          </button>
        ))}
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white shadow-md">
          <h1 className="text-xl font-semibold">🧠 JML Chat with: {activeRole.title}</h1>
          <p className="text-sm text-gray-500">{activeRole.prompt}</p>
        </header>

        <section className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 rounded-lg max-w-xl ${msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-white'}`}>
              <span className="block text-sm font-semibold mb-1 capitalize">{msg.role}</span>
              <p className="text-gray-700 prose prose-sm whitespace-pre-wrap break-words"><ReactMarkdown>{msg.content}</ReactMarkdown></p>
            </div>
          ))}
          {loading && <div className="text-gray-500">Thinking...</div>}
        </section>

        {/* Input */}
        <form
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
          className="p-4 bg-white border-t flex gap-2 items-center"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
          >
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
}
