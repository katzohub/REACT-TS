import React, { useState } from 'react'
import InputField from './components/InputField'
import  TodoList  from './components/TodoList'
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from './model'






const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('')
  const [todos,setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
      setTodo('')
    }

  }
  

 const onDragEnd = (result:DropResult) => {
   const {source,destination} = result

   if (!destination) return;

  if (
    destination.droppableId === source.droppableId && destination.index === source.index
  ) 
  return
  let add
  const active = todos
  const complete = completedTodos
      
      if (source.droppableId === 'TodoList') {
        add = active[source.index]
        active.splice(source.index,1)
      } else {
        add = complete[source.index]
        complete.splice(source.index,1) 
      }

      if (destination.droppableId === 'TodoList') {
        active.splice(destination.index,0,add)
      } else {
        complete.splice(destination.index,0,add)
      }

      setCompletedTodos(complete)
      setTodos(active)

  
  }
  

  return (
    <DragDropContext
    onDragEnd = {onDragEnd}
    >   
    <h1 className='text-2xl text-center text-yellow-200 bg-blue-500 '>
     Task-Blog
    </h1>
    <InputField 
    todo={todo}
    setTodo={setTodo}
    handleAdd={handleAdd}
    />
    <TodoList 
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos} index={0}    />

    </DragDropContext>
    
  )
}

export default App
