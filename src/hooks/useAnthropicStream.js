import { useState } from "react";

console.log("KEY:", import.meta.env.VITE_OPENROUTER_API_KEY);
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function callAI(messages, systemPrompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemma-4-31b-it:free",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });
  return res.json();
}

export function useAnthropicStream() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (messages, systemPrompt) => {
    setIsLoading(true);
    setResponse("");
    setError(null);

    try {
      const data = await callAI(messages, systemPrompt);
      console.log("API response:", data);
      const text = data.choices?.[0]?.message?.content;
      if (text) setResponse(text);
      else setError("No response received.");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, sendMessage };
}

export default useAnthropicStream;