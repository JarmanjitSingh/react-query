import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import axios from "axios";
    
const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
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

export const useAddSuperHeroData = ()=>{
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: ()=>{
      queryClient.invalidateQueries('super-heros')
    }
  })
}
