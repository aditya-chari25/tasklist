import React from "react";
import Axios from "axios";
import './cardlayout.css'

const Card = (props) => {
    const deleteTask =(id,ttask)=>{
        Axios.delete(`https://mern-aditaskapp.herokuapp.com/deleteTask/${id}`)
        .then(()=>{
            alert("Task deleted ",ttask);
            window.location.reload(false);
        })
    }
    const updateTask =(id,ob3)=>{
        if(ob3==0)
            ob3=1
        else
            ob3=0
        Axios.put("https://mern-aditaskapp.herokuapp.com/updateTask",{
          id:id,
          check:ob3
        })
        .then((res)=>{
            alert(ob3);
            window.location.reload(false);
    
        });
    }
    return(
        <div className="layed">
        <div className="layoutcard">
            <p style={{fontSize:"20px"}}>{props.ttask}</p>
            <button className="hellob" onClick={()=>deleteTask(props.tid,props.ttask)}><i class="fa-regular fa-trash-can" style={{color:"white"}}></i></button>
            {props.tcheck ==0 &&
            <button onClick={()=>updateTask(props.tid,props.tcheck)}><i class="fa-solid fa-circle-xmark" style={{color:"white"}}></i></button>}
            {props.tcheck==1 &&
            <button onClick={()=>updateTask(props.tid,props.tcheck)}><i class="fa-solid fa-circle-check" style={{color:"white"}}></i></button>}
        </div>
        <p style={{color:"grey",fontStyle:"italic",fontSize:"13px"}}>Task written by:- {props.tname}</p>
        </div>
    );
}

export default Card