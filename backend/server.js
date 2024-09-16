const app=require("./app")
const dotenv=require('dotenv')
const connectDB=require('./config/database')
const cloudinary=require('cloudinary')

//Config

dotenv.config({path:'./backend/config/config.env'})

//Connecting db
connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

//Handling Uncaught Exception
process.on('uncaughtException',err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

//Handle unhandled promise rejections
process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})
