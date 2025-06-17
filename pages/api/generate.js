export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic, tone } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Lipsește cheia API OpenAI.' });
  }

  const prompt = `Scrie un articol de blog cu ton ${tone}, pe tema: ${topic}.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content || "Nimic generat.";
    res.status(200).json({ result: output });

  } catch (error) {
    console.error("Eroare la generare:", error);
    res.status(500).json({ error: "Eroare la generare." });
  }
}
