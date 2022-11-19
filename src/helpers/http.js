import axios from 'axios'

export const http = () => {
  const headers = {}
  return axios.create({
    headers
  })
}