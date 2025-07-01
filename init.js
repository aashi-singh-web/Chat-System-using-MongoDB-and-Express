//Intialise some database 
const mongoose = require('mongoose');
const Chat = require("./models/chats.js");

main().then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CHAT_APP');
};

let chats =[
    {
        from: "Alice",
        to: "Bob",
        message: "Hello Bob!",
        created_at: new Date(), //UTC date
    },

    {
        from: "Adam",
        to: "Eve",
        message: "Hi Eve, how are you?",
        created_at: new Date(), 
    },
    {
        from: "Charlie",
        to: "Dave",
        message: "Hey Dave, let's catch up later.",
        created_at: new Date(), 
    },

    {
        from: "Eve",
        to: "Alice",
        message: "Hi Alice, nice to meet you!",
        created_at: new Date(), 
    },

    {
        from: "Bob",
        to: "Charlie",
        message: "Charlie, did you finish the report?",
        created_at: new Date(), 
    }
];

Chat.insertMany(chats);