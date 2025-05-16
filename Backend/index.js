import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from 'cors'
import path from 'path'
import messageRoute from './routes/messageRoute.js'
// import router from "./routes/userRoutes.js"
import userRoutes from "./routes/userRoutes.js"
// import router from "./routes/userRoutes"
import {app, server} from "./Socketio/server.js"
// const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser());
app.use(cors()); 
const PORT =process.env.PORT;
const URI=process.env.MONGODB_URI


try {
    mongoose.connect(URI).then(console.log("connected"))
} catch (error) {
    console.log(error)
}

app.use("/api/user",userRoutes)
app.use("/api/message",messageRoute)



// if(process.env.NODE_ENV==='production'){
//   const dirpath = path.resolve();
//   app.use(express.static("/Frontend/dist"));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(dirpath,'./Frontend/dist','index.html'));
//   })
// }
if (process.env.NODE_ENV === 'production') {
  const dirpath = path.resolve();
  app.use(express.static(path.join(dirpath, 'Frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirpath, 'Frontend', 'dist', 'index.html'));
  });
}



server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})