import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeros = ()=>{
  return axios.get("http://localhost:4000/superheroes01")
}

const RQSuperHerosPage = () => {
 const {isLoading, data, isError, error} = useQuery("super-heros", fetchSuperHeros)

  if(isLoading) return <h2>Loading...</h2>
  if(isError) return <h2>{error.message}</h2>
  return (
    <div>
      <h2>RQ superheros page</h2>
      {
        data?.data.map((hero)=>{
          return <div key={hero.name}>{hero.name}</div>
        })
      }
    </div>
  )
}

export default RQSuperHerosPage
