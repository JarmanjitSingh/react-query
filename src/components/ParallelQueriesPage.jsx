import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const freindsFetch = ()=>{
    return axios.get(`http://localhost:4000/freinds`)
}
const superHerosFetch = ()=>{
    return axios.get(`http://localhost:4000/superheroes`)
}
const ParallelQueriesPage = () => {
  const {data: freinds} = useQuery("freinds", freindsFetch)
  const {data: superheroes} = useQuery("superheros", superHerosFetch)
  return (
    <div>
      parallel query page. we dont showing here because this is very common so
      check RQ devtools
    </div>
  );
};

export default ParallelQueriesPage;
