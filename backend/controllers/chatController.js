const { Configuration, OpenAIApi } = require("openai");

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

const getChatResponse = async (req, res) => {
  const { title, description, price } = req.body;
  const message = `Please write me a upwork job proposal for a client. I'm giving you the job details. It should be short and specific. Here is the detais. Title: ${title}, Description: ${description}, Price: $${price}.`;
  const response = await openAi.createChatCompletion({
    model: process.env.OPEN_AI_MODEL,
    messages: [{ role: process.env.OPEN_AI_ROLE, content: message }],
  });
  if(response && response.data) {
      res.json({
        question: message,
        answer: response.data.choices[0].message.content,
      });
  }
};

module.exports = getChatResponse;
