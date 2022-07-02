import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";
import Card from "./Components/Card";
import Modal from 'react-modal';

function App() {
  const[listTasks,setListTasks] = useState([]);
  const[name,setName] = useState("");
  const[taskname,setTaskname]=useState("");
  const[check,setCheck] = useState(0);

  const[modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(()=>{
    Axios.get("https://mern-aditaskapp.herokuapp.com/getTask")
    .then((res)=>{
      setListTasks(res.data)
    })
  },[])

  const createTask =()=>{
    Axios.post("https://mern-aditaskapp.herokuapp.com/createTask",{
      name:name,
      task:taskname,
      check,
    })
    .then((res)=>{
      setModalIsOpen(false)
      Axios.get("https://mern-aditaskapp.herokuapp.com/getTask")
    .then((res)=>{
      setListTasks(res.data)
    })
    });
  }

  

  return (
    <div className="App">

      <center><p style={{color:'white',fontSize:'30px',fontWeight:'500'}}>Todo List<span style={{marginLeft:'20px'}}></span>
      <button onClick={()=> setModalIsOpen(true)}><i class="fa-solid fa-circle-plus"></i></button></p></center>
      <span style={{color:'white',fontSize:'17px'}}><center><p><i class="fa-solid fa-circle-xmark" style={{color:"white"}}></i> - Not Completed <span style={{marginRight:'20px'}}></span> <i class="fa-solid fa-circle-check" style={{color:"white"}}></i> - Completed</p></center>
      </span>
      <Modal isOpen={modalIsOpen} 
      shouldCloseOnOverlayClick={true}
      onRequestClose={()=>setModalIsOpen(false)}
      style={
        
        {
          overlay:{
            backgroundColor:'#423a6f'
          },
          content:{
            width:"20vw",
            height:"45vh",
            left:"40vw",borderRadius:'20px',
            backgroundColor:'#352f5b'
            
          }
        }
      }>
        <center><p style={{color:'white',fontSize:'25px'}}>Add New Task Here</p></center>
        <div class="mod-contents">
        <input type="text" placeholder="Name"  onChange={(event)=>{
          setName(event.target.value);
        }}/>
        <textarea type="text" placeholder="Task" style={{marginTop:'3vh'}} onChange={(event)=>{
          setTaskname(event.target.value);
        }}/>
        <button onClick={createTask} style={{marginTop:'6vh',color:'white',fontSize:'20px',backgroundColor:'red',borderRadius:'20px'}}>Add Task</button>
        </div>

      </Modal>

      <div className="tasks">
        {listTasks.map((task,key)=>{
          return(
            <div key = {key} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
            <Card tname={task.name} ttask={task.task} tcheck={task.check} tid={task['_id']}/>
            </div>
          )
        })}
      </div>

      

    </div>


  );
}

export default App;
