const app = require('./src/app')
const{createServer} = require("http")
const{Server} = require("socket.io")
const httpServer = createServer(app)
const allowedOrigins = [
  'https://mini-chatbot-six.vercel.app',
  'http://localhost:5173'
];

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});


const generateResponse = require("./src/services/ai.service.js")

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