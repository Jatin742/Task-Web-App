import axios from 'axios';
import {
    ALL_TASK_REQUEST,
    ALL_TASK_SUCCESS,
    ALL_TASK_FAIL,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    CLEAR_ERRORS
} from "../Constants/taskConstants";

const host=process.env.REACT_APP_BACKEND_URL;

export const getTasks = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_TASK_REQUEST });

        let link = `${host}/api/v1/tasks`;
        const { data } = await axios.get(link);
        dispatch({
            type: ALL_TASK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_TASK_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const createTask = (taskData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_TASK_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(`${host}/api/v1/task/new`, taskData, config);
        dispatch({
            type: NEW_TASK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_TASK_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const updateTask = (id, taskData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TASK_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(`${host}/api/v1/task/${id}`, taskData, config);
        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TASK_REQUEST });
        const { data } = await axios.delete(`${host}/api/v1/task/${id}`);
        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}