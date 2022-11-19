/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from 'lodash'
import React, {useState, useEffect} from 'react'
import PokeCards from '../../components/cards/PokeCards'
import { http } from '../../helpers/http'
import Loading from '../../components/loading/Loading'

export default function Home() {
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
    await http().get(`${process.env.REACT_APP_URL_API}/pokemon?offset=${off}&limit=${limit}`).then(res => {
      setData(res.data.results)
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
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 py-5'>
        {!isEmpty(data) ? (
          data.map((res, i) => (
            <PokeCards key={i} name={res.name} />
          ))
        ) : (
          <div>No Data !</div>
        )}
      </div>
      )}
      <div className='flex flex-row justify-center mt-10 gap-4'>
        <button onClick={PrevPage} disabled={offset <= 0} className='bg-blue-300 py-2 px-8 rounded-md font-semibold text-sm text-white shadow-md disabled:opacity-75 disabled:cursor-not-allowed'>Prev Pokemon!</button>
        <button onClick={NextPage} disabled={data.length < 8} className='bg-blue-300 py-2 px-8 rounded-md font-semibold text-sm text-white shadow-md disabled:opacity-75 disabled:cursor-not-allowed'>Next Pokemon!</button>
      </div>
    </div>
  )
}

