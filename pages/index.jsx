import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, tone }),
    });

    const data = await res.json();
    setResult(data.result || data.error || 'Nimic generat.');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>BlogMachine</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Subiect"
          style={{ marginRight: '0.5rem' }}
        />
        <input
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="Ton (formal, relaxat...)"
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit">Generează</button>
      </form>
      <pre style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>{result}</pre>
    </div>
  );
}
