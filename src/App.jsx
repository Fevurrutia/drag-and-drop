import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useEffect } from "react"
import { useState } from "react"

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Aprender React' },
  { id: 2, text: 'Aprender JS' },
  { id: 3, text: 'Aprender CSS' },
]

const App = () => {
  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log('prueba')
  }, [todos])

  const handleDragEnd = result => {
    if(!result.destination) return;
    const starIndex = result.source.index
    const endIndex = result.destination.index

    const copyArray = [...todos]
    const [reorderItem] = copyArray.splice(starIndex, 1)

    copyArray.splice(endIndex, 0, reorderItem)
    
    setTodos(copyArray)
   }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>

      <h1>TODO APP</h1>

      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >

            {todos.map((todo, index) => (
              <Draggable
                index={index}
                draggableId={`${todo.id}`}
                key={todo.id}
              >
                {
                  (draggableProvider) => (
                    <li
                      ref={draggableProvider.innerRef}
                      {...draggableProvider.dragHandleProps}
                      {...draggableProvider.draggableProps}
                    >
                      {todo.text}
                    </li>
                  )
                }
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )
        }
      </Droppable>
    </DragDropContext>

  )
}

export default App