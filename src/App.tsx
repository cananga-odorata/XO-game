
import { useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [size, setSize] = useState(3);

  const handleSizeChange = (event: any) => {
    const newSize = parseInt(event.target.value);
    setSize(newSize);

  };
  console.log(size)
  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <select className='board3' value={size} onChange={handleSizeChange}>
        {Array.from({ length: 3 }).map((_, i) => (
          <option key={i + 3} value={i + 3}>
            {i + 3}
          </option>
        ))}
      </select>

      <Board size={size} option={size} />
    </div>
  )
}

export default App
