import React from 'react'
import ItemCard from './ItemCard'
import '../styles/components/ItemList.css'

export default function ItemList() {
  return (
    <div className='item-list'>
      <ItemCard content='This is an item' key='card-1' />
      <ItemCard content='This is another item' key='card-2' />
      <ItemCard content='This is another item' key='card-3' />
      <ItemCard content='This is another item' key='card-4' />
      <ItemCard content='This is another item' key='card-5' />
      <ItemCard content='This is another item' key='card-6' selected />
      <ItemCard content='This is another item' key='card-7' />
      <ItemCard content='This is another item' key='card-8' />
    </div>
  )
}
