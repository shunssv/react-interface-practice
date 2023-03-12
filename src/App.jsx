import { useState } from 'react'
import './App.css'
import { GrNotes } from "react-icons/gr";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline'><GrNotes />My Projects</h1>
      <p className="read-the-docs">
        this is a page for my react practice!
      </p>
    </div>
  )
}

export default App
