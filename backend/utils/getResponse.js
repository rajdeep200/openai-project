const { Configuration, OpenAIApi } = require("openai");

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

const getResponseFromOpenAi = async (input) => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "input" }],
  });
  console.log(response.data.choices[0].message.content);
};

module.exports = getResponseFromOpenAi;
