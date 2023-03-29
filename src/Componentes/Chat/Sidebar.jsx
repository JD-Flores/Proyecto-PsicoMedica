import React from 'react'
import { Chats } from './Chats'
// import { Search } from './Search'

export function Sidebar() {
  return (
    <div className="flex flex-col w-1/3 bg-blue-900">
        {/* <Search></Search> */}
        <h1 className='flex items-center w-full text-3xl p-2 bg-blue-900 text-white h-[61px]'>Chats:</h1>
        <Chats></Chats>
    </div>
  )
}
