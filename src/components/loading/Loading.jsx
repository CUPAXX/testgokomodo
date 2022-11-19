import React from 'react'
import "./style.css"

export default function Loading() {
  return (
    <div className='flex flex-col items-center my-20 gap-10'>
      <span className="loader"></span>
      <div className=' font-semibold text-lg'>Loading...</div>
    </div>
  )
}
