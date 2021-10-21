import React from 'react'
import '../styles/components/ItemCard.css'
import classNames from 'classnames'

export default function ItemCard(props: { content: string; selected?: boolean }) {
  const { content, selected } = props

  return <div className={classNames({ 'item-card': true, selected })}>{content}</div>
}
