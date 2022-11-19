/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { capitalize, isEmpty } from 'lodash'
import React, {useState, useEffect} from 'react'
import PokeCards from '../../components/cards/PokeCards'
import { http } from '../../helpers/http'
import Loading from '../../components/loading/Loading'
import TypePoke from "../../assets/TypePoke"
import { Link } from 'react-router-dom'

export default function Type() {
  const [limit, setLimit] = useState(8)
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [count, setCount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    LoadData(offset)
  }, [offset])

  const LoadData = async (off) => {
    setIsLoading(true)
    await http().get(`${process.env.REACT_APP_URL_API}/type?offset=${off}&limit=${limit}`).then(res => {
      const fetchData = res.data.results
      const newData = []
      fetchData.map(res => {
        const addImage = res.name === "normal" ? TypePoke.normal : res.name === "fighting" ? TypePoke.fighting : res.name === "flying" ? TypePoke.flying : res.name === "poison" ? TypePoke.poison : res.name === "ground" ? TypePoke.ground : res.name === "rock" ? TypePoke.rock : res.name === "bug" ? TypePoke.bug : res.name === "ghost" ? TypePoke.ghost : res.name === "steel" ? TypePoke.steel : res.name === "fire" ? TypePoke.fire : res.name === "water" ? TypePoke.water : res.name === "grass" ? TypePoke.grass : res.name === "electric" ? TypePoke.electric : res.name === "psychic" ? TypePoke.physic : res.name === "ice" ? TypePoke.ice : res.name === "dragon" ? TypePoke.dragon : res.name === "dark" ? TypePoke.dark : res.name === "fairy" ? TypePoke.fairy : TypePoke.normal  
        let arr = {
          name: res.name,
          image: addImage
        }
        newData.push(arr)
      })
      setData(newData)
      setCount(res.data.count)
      setIsLoading(false)
    })
  }

  const NextPage = () => {
    if (offset < count) {
      setOffset(offset + limit)
    }
  }

  const PrevPage = () => {
    if (offset >= 8) {
      setOffset(offset - limit)
    }
  }

  return (
    <div className='mx-7 mb-7'>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 py-5'>
        {!isEmpty(data) ? (
          data.map((res, i) => (
            <div className='flex flex-col items-center bg-white p-4 rounded-3xl shadow-lg hover:opacity-70' key={i}>
              <img className='w-20 h-20' src={res.image} alt={"type images"} />
              <div className=' font-semibold text-lg pt-2'>{capitalize(res.name)}</div>
            </div>
          ))
        ) : (
          <div>No Data !</div>
        )}
      </div>
      )}
      <div className='flex flex-row justify-center mt-10 gap-4'>
        <button onClick={PrevPage} disabled={offset <= 0} className='bg-blue-300 py-2 px-8 rounded-md font-semibold text-sm text-white shadow-md disabled:opacity-75 disabled:cursor-not-allowed'>Prev!</button>
        <button onClick={NextPage} disabled={data.length < 8} className='bg-blue-300 py-2 px-8 rounded-md font-semibold text-sm text-white shadow-md disabled:opacity-75 disabled:cursor-not-allowed'>Next!</button>
      </div>
    </div>
  )
}

