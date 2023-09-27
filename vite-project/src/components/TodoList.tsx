import { Todo } from "../model"
import  SingleTodo  from "./SingleTodo"
import { Droppable } from "react-beautiful-dnd";

interface Props{
    index:number
    todos:Todo[]
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos:Todo[]
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({todos,setTodos,completedTodos,setCompletedTodos}:Props) => {
  return (
    <div className="w-[100%] flex justify-around flex-wrap items-start">
      <Droppable droppableId='TodoList'>
        {(provided,snapshot)=>(
          <div 
            ref={provided.innerRef} {...provided.droppableProps}
            className={`bg-gradient-to-r from-green-400 to-green-700  text-center rounded-lg p-2 mt-4 w-[340px] flex-col ${snapshot.isDraggingOver ? 'bg-gradient-to-r from-green-300 to-green-600' : ''}`}
          >
            <span className="text-white text-lg">
              Active task
            </span>
            {todos.map((todo,index) => (
              <SingleTodo 
                index={index}
                todo={todo} 
                todos={todos} 
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId='TodosRemove'>
        {(provided,snapshot)=>(
          <div 
            ref={provided.innerRef} {...provided.droppableProps}
            className={`bg-gradient-to-r from-red-700 to-red-300 text-center rounded-lg p-2 mt-4 w-[340px] flex-col ${snapshot.isDraggingOver ? 'bg-gradient-to-r from-red-600 to-red-200' : ''}`}
          >
            <span className="text-white text-lg">
              Completed Tasks
            </span>
            {completedTodos.map((todo,index) => (
              <SingleTodo 
                index={index}
                todo={todo} 
                todos={completedTodos} 
                key={todo.id} 
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList;
