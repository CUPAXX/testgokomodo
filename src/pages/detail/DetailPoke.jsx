/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import pokeball from "../../assets/pokeball.png"
import { http } from '../../helpers/http'
import { useParams } from 'react-router-dom'
import { capitalize, isEmpty } from 'lodash'
import Loading from '../../components/loading/Loading'

export default function DetailPoke() {
  const {id} = useParams()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    LoadData(id)
  }, [])

  const LoadData = async (id) => {
    setIsLoading(true)
    await http().get(`${process.env.REACT_APP_URL_API}/pokemon/${id}`).then(res => {
      const fetchData = res.data
      const newData = {
        name: fetchData.name,
        weight: fetchData.weight,
        height: fetchData.height,
        abilities: fetchData.abilities[0].ability.name,
        image: fetchData.sprites.other.dream_world.front_default,
        stats: fetchData.stats
      }
      setData(newData)
      setIsLoading(false)
    })
  }

  console.log(data)


  return (
    <div className='mx-7 lg:mx-40 py-5'>
      {!isLoading ? (
      <div className='flex flex-col bg-white p-7 rounded-lg'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 items-center'>
          <img src={data.image} className=" md:w-80 w-64 h-64 md:h-80 bg-slate-100 p-5 rounded-xl" alt="poke-profile" />
          <div className='flex flex-col w-full'>
            <div className=' text-center font-bold text-2xl pb-4'>{capitalize(data.name)}</div>
            <div className=' bg-red-100 grid grid-cols-2 gap-3 md:gap-8 p-3 w-full rounded-lg'>
              <div className='flex flex-col'>
                <div className=' font-semibold text-red-800'>Weight</div>
                <div className=' text-sm font-semibold'>{`${data.weight} KG`}</div>
              </div>
              <div className='flex flex-col'>
                <div className=' font-semibold text-red-800'>Height</div>
                <div className=' text-sm font-semibold'>{`${data.height}"`}</div>
              </div>
              <div className='flex flex-col'>
                <div className=' font-semibold text-red-800'>Abilities</div>
                <div className=' text-sm font-semibold'>{data.abilities}</div>
              </div>
              <div className='flex flex-col'>
                <div className=' font-semibold text-red-800'>Gender</div>
                <div className=' text-sm font-semibold'>{`Male & Female`}</div>
              </div>
            </div>
            <div className='flex flex-col my-3'>
              {!isEmpty(data) && data.stats.map((res, i) => (
                <div key={i} className=' grid grid-cols-3 w-full items-center justify-center'>
                  <div>
                    <div className=' text-xs md:text-sm font-semibold'>{capitalize(res.stat.name)}</div>
                  </div>
                  <div className=' bg-gray-200 w-full col-span-2 rounded-full h-2 md:h-3flex flex-col justify-center'>
                    <div className=' bg-green-400 h-2 md:h-3 rounded-full' style={{width: `${res.base_stat > 100 ? 100 : res.base_stat}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ) : (
        <Loading/>
      )}
    </div>
  )
}
