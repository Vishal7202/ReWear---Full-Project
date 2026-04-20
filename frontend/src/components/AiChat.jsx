import React, { useState } from "react";

const AiChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      setResponse(data.response || "No response");
    } catch (error) {
      setResponse("⚠️ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 px-6">

      {/* CARD */}
      <div className="relative bg-[#0B1220] border border-white/10 rounded-2xl p-6 shadow-xl">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent)] rounded-2xl"></div>

        <div className="relative z-10">

          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🤖 AI Clothing Assistant
          </h2>

          {/* INPUT */}
          <textarea
            className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows="4"
            placeholder="Ask anything about sustainable fashion, outfit ideas, or clothing match..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:scale-105 transition duration-300"
          >
            {loading ? "Thinking..." : "Get AI Suggestion"}
          </button>

          {/* RESPONSE */}
          {response && (
            <div className="mt-6 p-4 rounded-xl bg-[#020617] border border-white/10 text-gray-300 whitespace-pre-wrap">
              <span className="text-cyan-400 font-semibold">AI:</span>
              <p className="mt-2 leading-relaxed">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChat;