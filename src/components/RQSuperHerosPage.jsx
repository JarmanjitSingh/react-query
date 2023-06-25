import React from "react";
import { useSuperHerosData } from "../hooks/useSuperHerosData";
import { Link } from "react-router-dom";

const RQSuperHerosPage = () => {
  const successCallback = (data) => {
    console.log("Data has been fetched successfully", data);
  };
  const errorCallback = (error) => {
    console.log("There are some error in fetching", error);
  };
  const { isLoading, data, isError, error, isFetching } = useSuperHerosData(
    successCallback,
    errorCallback
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div>
      <h2>RQ superheros page</h2>
      {
        data?.data.map((hero) => {
          return (
            <div key={hero.id}>
              <Link to={`/hero-detail/${hero.id}`}>{hero.name}</Link>
            </div>
          );
        })

        // # data Transformation
        // data.map((hero) => {
        //   return <div key={hero}>{hero}</div>;
        // })
      }
    </div>
  );
};

export default RQSuperHerosPage;
