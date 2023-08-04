import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { allTasksReducer, newTaskReducer, taskReducer } from "./Reducers/taskReducers";

const reducer=combineReducers({
    allTasks:allTasksReducer,
    task:taskReducer,
    newTask:newTaskReducer,
});

let initialState={};
const middleware=[thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;