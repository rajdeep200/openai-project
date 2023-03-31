const express = require("express");
require("dotenv").config();
const app = express();
const chatRouter = require("./routers/chatRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/demo", (req, res) => {
    res.json({
        message: "Hello"
    })
})
app.use("/chat", chatRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
