const express = require("express");
const app=express();

const path = require("path");
app.use("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const Chat= require("./models/chats.js");

const mongoose = require('mongoose');

main().then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CHAT_APP');
}




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});