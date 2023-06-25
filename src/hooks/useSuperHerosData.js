import { useQuery } from "react-query";
import axios from "axios";
    
const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHerosData = (successCallback, errorCallback) => {
  return useQuery("super-heros", fetchSuperHeros, {
    cacheTime: 600000,
    //staleTime:600000, //10mins
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: successCallback,
    onError: errorCallback,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};
