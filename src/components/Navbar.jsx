import React, {useEffect, useState} from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [active, setActive] = useState(0)

  useEffect(() => {
    switch (location.pathname) {
      case "/pokemon":
        setActive(0)
        break;
      case "/types":
        setActive(1)
        break;
      default:
        break;
    }
  }, [location.pathname])

  return (
    <section className='m-7'>
      <nav className='flex flex-row gap-5 justify-center bg-white rounded-lg'>
        <NavLink className={`p-5 font-semibold ${active === 0 ? "border-blue-300 text-blue-300 border-b-2 font-bold" : ""}`} to="/pokemon">Pokemon</NavLink>
        <NavLink className={`p-5 font-semibold ${active === 1 ? "border-blue-300 text-blue-300 border-b-2 font-bold" : ""}`}to="/types">Type</NavLink>
      </nav>
    </section>
  )
}
