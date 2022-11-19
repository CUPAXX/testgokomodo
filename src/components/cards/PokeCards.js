import React from 'react'
import { capitalize } from 'lodash'
import { NavLink } from 'react-router-dom'
import pokeball from "../../assets/pokeball.png"

export default function PokeCards({name}) {
  return (
    <NavLink to={`${name}`} className='bg-white h-32 rounded-lg flex flex-col items-center  hover:animate-pulse hover:cursor-pointer shadow-lg'>
      <img src={pokeball} alt="pke-img" className='w-20 -mt-8 bg-white p-3 rounded-full'/>
      <div className=' mt-3 text-lg font-bold'>{capitalize(name)}</div>
    </NavLink>
  )
}
