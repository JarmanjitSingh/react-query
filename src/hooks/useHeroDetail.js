import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};
export const useHeroDetail = (id) => {
  const queryClient = useQueryClient();

  return useQuery(["super-heros", id], () => fetchSuperHero(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heros")
        ?.data?.find((hero) => hero.id === parseInt(id));

      if (hero) {
        return { data: hero };
      } else {
        return undefined; 
      }
    },
  });
};
