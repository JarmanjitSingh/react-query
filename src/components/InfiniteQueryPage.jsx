import axios from "axios";
import React from "react";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({pageParam = 1}) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};
const InfiniteQueryPage = () => {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    ["colors"],
     fetchColors,
    {
      getNextPageParam: (_lastPage, pages)=>{
        if(pages.length < 4){
            return pages.length + 1 
        }else{
            return undefined //this will set hasNextPage to false
        }
      }
    }
  );

  if (isLoading) return <h2>Loading ....</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <div key={i}>
              {
                group.data.map((color)=>(
                    <h2 key={color.id}>{color.id}. {color.label}</h2>
                ))
              }
            </div>
          );
        })}
      </div>

      <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More</button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default InfiniteQueryPage;
