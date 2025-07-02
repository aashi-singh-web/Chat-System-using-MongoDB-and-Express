const express = require("express");
const app=express();

const mongoose = require('mongoose');
const Chat= require("./models/chats.js");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

main().then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CHAT_APP');
};


//index route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    
    res.render("index.ejs", {chats});
});

//new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
  let{ from,to,message}=req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date()
  });

  newChat.save().then(() => {
    console.log("New chat saved successfully");
  }).catch((err) => {
    console.log("Error saving new chat:", err);
});
  res.redirect("/chats");
});


//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;
  let chat = await Chat.findById(req.params.id);
  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let {message: newMsg} = req.body;
  let UpdatedChat= await Chat.findByIdAndUpdate(
    id,
     {message: newMsg},
    {runValidators: true, new: true}
  );
  res.redirect("/chats");
});

//delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChar= await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});