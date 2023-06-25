import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const SecondSameQuery = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heros",
    fetchSuperHeros,
    {
      cacheTime: 6000,
      //staleTime:600000, //10mins
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div>
      <h2>
        Ok! so what we find if we fetching same data on multiple pages then make
        a unique key same on both pages then it will not refetcing the data for
        second page it will only mount the cached data.
        <br />
        BUT! BUT! BUT! it is not the preferred way. the preffered way is custom
        query hook
      </h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
};

export default SecondSameQuery;
