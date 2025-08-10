const axios = require('axios');

const handleChatbotPrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json({ reply: response.data.choices[0].text.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Chatbot API failed', details: err.message });
  }
};

module.exports = { handleChatbotPrompt };
