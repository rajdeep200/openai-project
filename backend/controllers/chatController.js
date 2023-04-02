const Cryptr = require('cryptr');
const { Configuration, OpenAIApi } = require("openai");

const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

const getChatResponse = async (req, res) => {
  try {
    const { title, description, price, paymentType } = req.body;
    let paymentTypeMsg;
    if(paymentType === 'fixed'){
      paymentTypeMsg = `It has fixed payment of ${price} dollars.`
    }else {
      paymentTypeMsg = `It has hourly payment rate of ${price} dollars.`
    }
    const message = `Please write me a upwork job proposal for a client. I'm giving you the job details. It should be short and specific. Here is the detais. Title: ${title}, Description: ${description} and ${paymentTypeMsg}`;
    const response = await openAi.createChatCompletion({
      model: process.env.OPEN_AI_MODEL,
      messages: [{ role: process.env.OPEN_AI_ROLE, content: message }],
    });
    if(response && response.data) {
      const message = response.data.choices[0].message.content
      const encryptedMessage = cryptr.encrypt(message);
        res.json({
          status: true,
          response: encryptedMessage
        });
      }
  } catch (error) {
    res.json({
      status: false,
      response: error
    })
  }
};

module.exports = getChatResponse;
