const express=require("express");
require("dotenv").config();
const app=express();
const morgan=require("morgan");
const errorMiddleware = require("./MiddleWares/error");
const cors=require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const task=require("./Route/taskRoute");

app.use("/api/v1",task);

app.use(errorMiddleware);

module.exports=app;