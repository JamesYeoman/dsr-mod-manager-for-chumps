import React from 'react'
import ItemList from './components/ItemList'
import './styles/App.css'

export default function App() {
  return (
    <div className='root-grid'>
      <ItemList />
      <div className='flex flex-1 flex-col h-full'></div>
    </div>
  )
}
