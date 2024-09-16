const express=require("express")
const app=express();
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config({path:'./backend/config/config.env'})
//Route Imports
const products=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");
const cookieParser = require("cookie-parser");
const errorMiddleware=require('./middleware/error');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use("/api/v1",products)
app.use("/api/v1",user)
app.use("/api/v1",order);
app.use("/api/v1",payment);

//middleware for errors

app.use(errorMiddleware);

module.exports=app