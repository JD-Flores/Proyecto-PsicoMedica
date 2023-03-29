import React from 'react'
import { Chats } from './Chats'
// import { Search } from './Search'

export function Sidebar() {
  return (
    <div className="flex flex-col    bg-white">
        {/* <Search></Search> */}
        <h1 className='flex items-center w-full text-3xl p-2 bg-white text-black h-[61px]'>Chats:</h1>
        <Chats></Chats>
    </div>
  )
}
