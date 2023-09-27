import { useEffect, useRef, useState } from "react";
import { Todo } from "../model"
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index:number
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
  }

const SingleTodo = ({todo,todos,setTodos,index}: Props) => {

const [edit,setEdit] = useState<boolean>(false)
const [editTodo,setEditTodo] = useState<string>(todo.todo)
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
},[edit])


const handleDone = (id: number) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )
  );
};

const handleDelete = (id:number) => {
  setTodos(todos.filter((todo) => todo.id !== id))
}

  
const handleEdit = (e: React.FormEvent,id:number) => {
  e.preventDefault()

  setTodos(todos.map((todo) => (todo.id === id ? {...todo,todo:editTodo}: todo))
  )
  setEdit(false)
}



  return (

    <Draggable
    draggableId={todo.id.toString()} index={index}>
      {
        (provided,snapshot) => (
          <form 
          className={`flex justify-between items-center w-[300px] rounded-md p-5 bg-hero-pattern bg-cover bg-center')] m-3${snapshot.isDragging ? 'shadow-[0px_0px_25px_black)]' : ''}`}
          onSubmit={(e) => handleEdit(e,todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
            {
              edit ? (
                <input 
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                />
              ): (
                 todo.isDone ? (
            <span className="line-through font-semibold">
              {todo.todo}
            </span> 
          ):(
            <span className="font-semibold">
              {todo.todo}
            </span> 
          )
              )
            }
      
         
      
            
      
            <div className="flex">
              <span 
              className="m-2 cursor-pointer"
              onClick={()=>{
                if (!edit && !todo.isDone) {
                setEdit(!edit)
              }}}
              >
                  <AiFillEdit/>
              </span>
              <span 
              className="m-2 cursor-pointer"
              onClick={() => handleDelete(todo.id)}
              >
              <AiFillDelete/>
              </span>
              <span 
              className="m-2 cursor-pointer"
              onClick={() => handleDone(todo.id)}
              >
      
              <MdDone />
      
              </span>
            </div>
      
          </form>
        )
      }
    
    </Draggable>
    
  )
}

export default SingleTodo
