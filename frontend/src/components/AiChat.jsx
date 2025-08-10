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
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response || "No response");
    } catch (error) {
      setResponse("Error: Unable to fetch response.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
        🤖 AI Clothing Assistant
      </h2>

      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Type your idea or question about eco-friendly clothing..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Thinking..." : "Get AI Suggestion"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-800 whitespace-pre-wrap">
          <strong>AI says:</strong> <br />
          {response}
        </div>
      )}
    </div>
  );
};

export default AiChat;
