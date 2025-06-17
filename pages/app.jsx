import { useState } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Profesional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateArticle = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone }),
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>BlogMachine</h1>
      <input
        placeholder="Subiect"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
      />
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
      >
        <option>Profesional</option>
        <option>Relaxat</option>
      </select>
      <button
        onClick={generateArticle}
        disabled={loading}
        style={{ padding: "1rem", width: "100%" }}
      >
        {loading ? "Se generează..." : "Generează articol"}
      </button>
      <pre style={{ marginTop: "2rem", background: "#eee", padding: "1rem" }}>
        {output}
      </pre>
    </div>
  );
}
