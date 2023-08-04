import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createTask, deleteTask, getTasks, updateTask } from './Actions/taskActions';
import { DELETE_TASK_RESET, NEW_TASK_RESET, UPDATE_TASK_RESET } from './Constants/taskConstants';

function App() {

  const { error, tasks } = useSelector(state => state.allTasks);
  const {isDeleted, isUpdated}=useSelector(state=>state.task);
  const [newTask,setNewTask]=useState("");
  const [popUp, setPopup] = useState(false);

  const {success}=useSelector(state=>state.newTask)
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if(success){
      dispatch({type:NEW_TASK_RESET});
    }
    if(isDeleted){
      dispatch({type:DELETE_TASK_RESET});
    }
    if(isUpdated){
      dispatch({type:UPDATE_TASK_RESET});
    }
    dispatch(getTasks());
  }, [error, dispatch, success, isDeleted, isUpdated])

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  }
  const handleSubmit=()=>{
    if(newTask.trim()===""){
      return;
    }
    const myForm=new FormData();
    myForm.set("description",newTask);
    dispatch(createTask(myForm));
    setPopup(false);
  }
  const handleStatusUpdate=(task)=>{
    if(task.status==="pending"){
      task.status="completed";
    }
    else{
      task.status="pending";
    }
    const myForm=new FormData();
    myForm.set("status",task.status);
    dispatch(updateTask(task._id,myForm));
  }
  return (
    <div className="App">
      <h4>Your Tasks</h4>
      <div className="tasks">
        {tasks && tasks.map((task) => (

          <div className={`task ${task.status === "pending" ? "" : "is-complete"}`}>
            <div className="checkbox" onClick={()=>handleStatusUpdate(task)}></div>
            <div className="text">{task.description}</div>
            <div className="delete-task" onClick={()=>handleDelete(task._id)}>X</div>
          </div>
        ))
        }
      </div>
      <div className="addPopup" onClick={() => setPopup(!popUp)}>+</div>
      {popUp &&
        <div className="popup">
          <div className="closePopup" onClick={()=>setPopup(false)}>X</div>
          <div className="content">
            <h3>Add Tasks</h3>
            <input type="text" className='add-task-input' onChange={(e)=>setNewTask(e.target.value)}/>
            <div className="button" onClick={handleSubmit}>Create Tasks</div>
          </div>
        </div>
        }
    </div>
  );
}

export default App;
