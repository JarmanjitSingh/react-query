import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};
export const useHeroDetail = (id) => {
  return useQuery(["super-heros", id], () => fetchSuperHero(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
