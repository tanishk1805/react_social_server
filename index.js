import express from "express";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js";
import authROutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users,posts} from "./data/index.js";

//Confirguations
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'/public/assets')));

//File Storage
const storage=multer.diskStorage({
destination:function(req,file,cb){
    cb(null,"public/assets");
},
filename:function(req,file,cb){
    cb(null,file.originalname);
}
});
const upload=multer({storage});

//Routes when uploading file is there
app.post("/auth/register",upload.single("picture"),register);
app.post("/post",verifyToken,upload.single("picture"),createPost);

//Routes
app.use("/auth",authROutes);
app.use  ("/users",userRoutes);
app.use("/post",postRoutes);

//Mongoose Setup
const PORT=process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`${PORT} is running`));
    //Add data once(Dont uncomment to avoid duplication)
    /* User.insertMany(users);
    Post.insertMany(posts);*/

}).catch((err)=>console.log(`${err} did not connect`));