require('dotenv').config()
const app = require('./src/app')
const{createServer} = require("http")
const{Server} = require("socket.io")
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173"
    }
})

const connectToDB = require('./src/db/db.js')
const generateResponse = require("./src/services/ai.service.js")
console.log(generateResponse)

const chatHistory =[]
io.on("connection",(socket)=>{
    socket.on("disconnect",()=>{
        console.log("A user disconnected")
    })
socket.on('ai-message',async(data)=>{
   chatHistory.push({
    role:"user",
    parts:[{text:data}]
   
})
 const response = await generateResponse(chatHistory)
 
 chatHistory.push({
    role:"model",
    parts:[{text:response}]
 })
 socket.emit('ai-response',{response})

})
  
})


// connectToDB();


 httpServer.listen(3000,(err)=>{
    if(err)
    console.log("Error in starting the server")

    console.log("server is stared")
})