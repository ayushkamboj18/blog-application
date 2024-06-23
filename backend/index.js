require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const records = require("./Routes/record");

var app = express();

// const DB = 'mongodb+srv://ayushkambojq51:OmUpcKsR0xZbgpjo@cluster0.ftqvjgw.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0'
const DB = process.env.MONGO_URI;

mongoose.connect(DB).then(() =>{
  console.log("Database connected")
}).catch((err) =>{
  console.log("Error in connection")
});


// mongodb: mongoose
//   .connect("mongodb://localhost:27017/blog-application", {
//   })
//   .then(() => {
//     console.log("connected to database.");
//   })
//   .catch((error) => {
//     console.log("Error connecting to databse", error);
//   });
  

app.use(cors());
app.use(express.json());
app.use('', records);


// start the Express server
app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});
