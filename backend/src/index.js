const express=require("express");
const helmet=require("helmet");
const cookieParser=require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const env=require("./config/env.js");

const notFound = require("./middleware/notFound.js");
const errorHandler = require("./middleware/errorHandler.js");


const app=express();


//middleware
app.use(helmet());
app.use(cors({
  origin:env.clientUrl,
  credentials:true
}));
if(env.nodeEnv==="development"){
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api/auth",require('./routes/authRoutes.js'));
app.use("/api/users",require('./routes/userRoutes.js'));
app.use("/api/categories",require('./routes/categoryRoutes.js'));
app.use("/api/products",require('./routes/productRoutes.js'));
app.use("/api/orders",require('./routes/orderRoutes.js'));
app.use("/api/carts",require('./routes/cartRoutes.js'));
app.use("/api/uploads",require('./routes/uploadRoutes.js'));

//at the end middleware
app.use(notFound);
app.use(errorHandler);
module.exports=app;
