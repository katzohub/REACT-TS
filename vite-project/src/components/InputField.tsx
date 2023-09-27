import { useRef } from "react"

interface Props {
    todo:string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd:(e: React.FormEvent) => void

}

const InputField: React.FC<Props> = ({todo,setTodo,handleAdd}) => {

    const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form 
    className="flex w-90 justify-center mt-2"
    onSubmit={(e) => {handleAdd(e)
                    inputRef.current?.blur()
    }}
    >
    <div className="w-100 relative flex items-center">
      <input 
      ref={inputRef}
      type="input" 
      placeholder="Enter a task" 
      className="w-100 rounded-full px-4 py-2 text-2xl transition2s shadow-[inset_0_0_5px_black]" 
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
      />
      <button className="absolute w-[55px] h-[55px] rounded-full bg-[#2f74c0] text-center text-white right-0 shadow-[inset_0_0_10px_black] hover:bg-sky-300 hover:cursor-pointer active:scale-0.8 active:shadow[0_0_5px_black]" type="submit">Go</button>
      </div>

    </form>
  )
}

export default InputField
