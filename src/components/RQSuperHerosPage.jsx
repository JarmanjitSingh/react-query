import React, { useState } from "react";
import {
  useAddSuperHeroData,
  useSuperHerosData,
} from "../hooks/useSuperHerosData";
import { Link } from "react-router-dom";

const RQSuperHerosPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

    const successCallback = (data) => {
    console.log("Data has been fetched successfully", data);
  };
  const errorCallback = (error) => {
    console.log("There are some error in fetching", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHerosData(
    successCallback,
    errorCallback
  );

  const { mutate } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = {name, alterEgo}
    mutate(hero)
  };

  // console.log({ isLoading, isFetching });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div>
      <h2>RQ superheros page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Data</button>
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
