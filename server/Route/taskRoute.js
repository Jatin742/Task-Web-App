const express=require("express");
const { createTask, updateTask, getTask, deleteTask, getAllTasks } = require("../Controller/taskController");
const Router=express.Router();

Router.route("/task/new").post(createTask);

Router.route("/tasks").get(getAllTasks);

Router.route("/task/:id").put(updateTask)
                        .get(getTask)
                        .delete(deleteTask);

module.exports=Router;