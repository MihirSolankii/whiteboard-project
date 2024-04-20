const express =  require('express');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;
 const cookie=require("cookie-parser")
 app.use(cookie());
app.use(express.json());
const cors=require("cors");
app.use(cors());
require("./config/database").connect()

// route import and mount 
const user = require("./routes/user");
app.use("/api/v1",user);

// Activate 
app.listen(PORT,() => {
    console.log("Server Run at ",PORT);
})

app.get("/", (req,res) => {
    res.send("<h1>Auth App</h1>")
})