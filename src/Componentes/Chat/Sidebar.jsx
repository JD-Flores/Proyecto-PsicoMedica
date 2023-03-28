import React from 'react'
import { Chats } from './Chats'
import { Search } from './Search'

export function Sidebar() {
  return (
    <div className="flex flex-col w-1/3 bg-black">
        <Search></Search>
        <Chats></Chats>
    </div>
  )
}
