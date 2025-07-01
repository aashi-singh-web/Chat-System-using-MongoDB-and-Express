const express = require("express");
const app=express();

const mongoose = require('mongoose');
const Chat= require("./models/chats.js");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");




main().then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CHAT_APP');
};

let chat1= new Chat({
    from: "Alice",
    to: "Bob",
    message: "Hello Bob!",
    created_at: new Date(), //UTC date
});

chat1.save().then((res) => {
    console.log(res)
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});