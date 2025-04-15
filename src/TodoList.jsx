import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export default function TodoList(){
    const[todos,settodos]=useState([{task:"Sample task",id:uuidv4(),isDone:false}]);
    const [newTodo, setnewTodo] = useState([""]);
    const doSomething=()=>{
        if(newTodo===""){
            alert("Please enter a task");
            return;
        }
        console.log("Button is Working");
        settodos([...todos,{task:newTodo,id:uuidv4()}]);
        setnewTodo("");
    }

    const doSomethingforkeyboard=(event)=>{
        if(event.key==="Enter"){
            if(newTodo===""){
                alert("Please enter a task");
                return;
            }
            console.log("Button is Working");
            settodos([...todos,{task:newTodo,id:uuidv4(),isDone:false}]);
            setnewTodo("");
            
        };
    }

    const updateTodo=(event)=>{
        setnewTodo(event.target.value);
    }


    const deletetodo=(id)=>{
        settodos(todos.filter((todo)=>todo.id!==id));
    }

    const donetodo=(id)=>{
        console.log("This todo is done");
        settodos((prevtodos)=>{
            return prevtodos.map((todo)=>{
                if(todo.id===id){
                    return{
                        ...todo,
                        isDone:true,
                    };
                }
                else{
                    return todo;
                }
            })
        })

    }

    return(
        <div className='todo-list'>  
            <input placeholder="Enter your task" type="text" value={newTodo} onChange={updateTodo} onKeyDown={doSomethingforkeyboard}/><br />

            <button onClick={doSomething} >Add task</button>
            <h2>Work ToDo-:</h2>
            <ul>
                {
                    todos.map((todo)=>(
                        <li key={todo.id}>
                            <span style={todo.isDone? {textDecorationLine:"line-through"}:{}}>{todo.task}</span>&nbsp;&nbsp;
                            <button onClick={()=>deletetodo(todo.id)}>Delete</button>
                            <button onClick={()=>donetodo(todo.id)}>Done</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}