export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { topic, tone } = req.body;
  const prompt = `Scrie un articol de blog cu ton ${tone}, pe tema: ${topic}.`;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Cheia OpenAI nu este setată." });
  }

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
    res.status(200).json({ result: data.choices?.[0]?.message?.content || "Nimic generat." });
  } catch (error) {
    res.status(500).json({ error: "Eroare la generare." });
  }
}
