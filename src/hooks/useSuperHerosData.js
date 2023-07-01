import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
// import axios from "axios";
import { request } from "../utils/axios-utils";
    
const fetchSuperHeros = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({url: "/superheroes"})
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({url: "/superheroes", method: "post", data: hero})
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
    // onSuccess: (data)=>{
    //   // queryClient.invalidateQueries('super-heros')
    //   queryClient.setQueryData("super-heros", (oldQueryData)=>{
    //     return{
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // }

    onMutate: async(newHero)=>{
      await queryClient.cancelQueries('super-heros');
      const previousData = queryClient.getQueryData('super-heros')
      queryClient.setQueryData("super-heros", (oldQueryData)=>{
            return{
              ...oldQueryData,
              data: [...oldQueryData.data, {id: oldQueryData?.data?.length + 1, ...newHero}]
            }
          })
          return {
            previousData
          }
    },
    onError: (_error, _hero, context)=>{
      queryClient.setQueryData("super-heros", context.previousData)
    },
    onSettled: ()=>{
      queryClient.invalidateQueries("super-heros")
    }
  })
}
