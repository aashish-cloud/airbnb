import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/view").then((response) => {
      setPlaces([...response.data, ...response.data, ...response.data, ...response.data]);
    });
  }, []);

  return (
    <div className="px-6 mt-8 grid gap-x-4 gap-y-6 grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map((place, index) => {
        return (
          <Link to={`/view/${place._id}`} key={index}>
            <div className="bg-gray-500 rounded-lg mb-2 flex">
              {place.addedPhotos?.[0] && 
                <img className="rounded-lg aspect-square object-cover" src={`http://localhost:4000/uploads/${place.addedPhotos?.[0]}`} alt="" />              
              }
            </div>
            <h2 className="font-bold">{place.city}, {place.country}</h2>
            <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
            <p className="mt-2"><span className="font-bold">${place.price}</span> per night</p>
          </Link>
        );
      })}
    </div>
  );
};

export default IndexPage;
