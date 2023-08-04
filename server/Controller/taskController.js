const catchAsyncErrors=require("../MiddleWares/catchAsyncErrors");
const Task=require("../Model/taskModel");
const ErrorHandler=require("../Utils/errorhander");

exports.createTask=catchAsyncErrors(async (req,res)=>{
    const task=await Task.create(req.body);
    res.json({
        success:true,
        task
    })
})

exports.getAllTasks=catchAsyncErrors(async (req,res,next)=>{
    const tasks=await Task.find();
    res.json({
        success:true,
        tasks
    })
})

exports.getTask=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    const task=await Task.findById(id);
    if(!task){
        return next(new ErrorHandler(`Task Not Found with id ${id}`));
    }
    res.json({
        success:true,
        task
    })
})

exports.updateTask=catchAsyncErrors(async (req,res)=>{
    const {id}=req.params;
    let task=await Task.findById(id);
    if(!task){
        return next(new ErrorHandler(`Task Not Found with id ${id}`));
    }
    task=await Task.findByIdAndUpdate(id, req.body,{
        new:true,
        useFindAndModify:false,
    })
    res.json({
        success:true,
        task
    })
})

exports.deleteTask=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    let task=await Task.findById(id);
    if(!task){
        return next(new ErrorHandler(`Task Not Found with id ${id}`));
    }
    await Task.deleteOne(task);
    res.json({
        success:true,
    })
})