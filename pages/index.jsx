import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [result, setResult] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, tone }),
    });
    const data = await res.json();
    setResult(data.result || data.error || 'Nimic generat.');
  }

  return (
    <div>
      <h1>BlogMachine</h1>
      <form onSubmit={handleSubmit}>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Subiect" />
        <input value={tone} onChange={e => setTone(e.target.value)} placeholder="Ton (formal, relaxat…)" />
        <button type="submit">Generează</button>
      </form>
      <pre>{result}</pre>
    </div>
  );
}
