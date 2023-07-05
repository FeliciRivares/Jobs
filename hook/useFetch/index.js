import { useEffect, useState } from 'react'
import { RAPID_API_KEY } from '../../key'
import axios from 'axios'

const rapidApiKey = RAPID_API_KEY

export const useFetch = (endpoint, query) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  }
  const fetchData = async () => {
    try {
      const response = await axios.request(options)
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      alert(`Ops we have error ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refreshFetchData = () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refreshFetchData }
}
