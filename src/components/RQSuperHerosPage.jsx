import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeros = ()=>{
  return axios.get("http://localhost:4000/superheroes")
}

const RQSuperHerosPage = () => {

  const successCallback = (data)=>{
    console.log("Data has been fetched successfully", data)
  }
  const errorCallback = (error)=>{
    console.log("There are some error in fetching", error)
  }
 const {isLoading, data, isError, error, isFetching} = useQuery("super-heros", fetchSuperHeros, {
  cacheTime: 6000,
  //staleTime:600000, //10mins    
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  onSuccess: successCallback,
  onError: errorCallback,
  select: (data) => {
    const superHeroNames = data.data.map((hero)=> hero.name);
    return superHeroNames
  }
 })


 console.log({isLoading, isFetching});

  if(isLoading) return <h2>Loading...</h2>
  if(isError) return <h2>{error.message}</h2>
  return (
    <div>
      <h2>RQ superheros page</h2>
      {
        // data?.data.map((hero)=>{
        //   return <div key={hero.name}>{hero.name}</div>
        // })

        // # data Transformation
        data.map((hero)=>{
          return <div key={hero}>{hero}</div>
        })
        
      }
    </div>
  )
}

export default RQSuperHerosPage
