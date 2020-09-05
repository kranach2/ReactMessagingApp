const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const path= require("path");
require("dotenv").config();
app.use(express.urlencoded({ extended: false }))
const usersRouter = require("./routes/users");
const userAuthenticateRouter = require("./routes/user-authenticate")
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/user-authenticate", userAuthenticateRouter);

const uri = process.env.ATLAS_URI;
 mongoose.connect(uri, {
  useNewUrlParser: true,
     useCreateIndex: true,
    useUnifiedTopology: true
  })
   .then(() => {
    console.log("Db connected");
   })
   .catch(err => {
     console.log(err);
   });

   const connection = mongoose.connection;
 connection.once("open", () => {
   console.log("Mongodb database is connected");
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static("messageapp/build"));

 app.get("*", (req, res) =>{
   res.sendFile(path.join(__dirname, "messageapp", "build", "index.html"));
 
});
}

const server = app.listen(port, ()=>{
    console.log(`The server is running in ${port}`);
})

//Socket setup
const io = socket(server);

io.on("connection", (socket)=>{
    console.log(socket.id);
    console.log("user is connected")
    socket.on("message", (data)=>{
        console.log("message:" + JSON.stringify(data)) ;
        io.emit("message", data );
    })

    socket.on("typingAlert", (name)=>{
        console.log("typingAlert:" + name) ;
        socket.broadcast.emit("typingAlert", name );
    })

});

