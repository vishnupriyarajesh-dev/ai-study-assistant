import { useState } from "react";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

console.log("KEY:", API_KEY);

async function callAI(messages, systemPrompt) {
  const res = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
  }),
});

const data = await res.json();

console.log("FULL RESPONSE:", data);

if (!res.ok) {
  throw new Error(data.error?.message || "API Error");
}

return data;
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

      const text = data.choices?.[0]?.message?.content;

      if (text) {
        setResponse(text);
      } else {
        setError("No response received.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, sendMessage };
}

export default useAnthropicStream;