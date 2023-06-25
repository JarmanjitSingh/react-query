import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const multipleSuperHerosFetch = () => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};
const DynamicParallelQueriesPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((Id) => {
      return {
        queryKey: ["super-hero", Id],
        queryFn: () => multipleSuperHerosFetch(Id),
      };
    })
  );

  console.log({ queryResults });
  return <div>dynamic parallel queries page</div>;
};

export default DynamicParallelQueriesPage;
