const { Configuration, OpenAIApi } = require("openai");

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

const getChatResponse = async (req, res) => {
  const { message } = req.body;
  const response = await openAi.createChatCompletion({
    model: process.env.OPEN_AI_MODEL,
    messages: [{ role: process.env.OPEN_AI_ROLE, content: message }],
  });
  if(response && response.data) {
      res.json({
        message: response.data.choices[0].message.content,
      });
  }
};

module.exports = getChatResponse;
