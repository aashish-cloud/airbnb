import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setAllPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="bg-primary py-2 px-6 text-white rounded-full inline-flex gap-2"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 p-4 m-auto md:w-3/4">
        {allPlaces.map((place) => {
          return (
            <Link
              to={`/account/places/${place._id}`}
              className="flex rounded-md gap-4 p-4 bg-gray-200"
              key={place._id}
            >
              <div className="w-32 h-32 shrink-0 rounded-md overflow-hidden">
                <img
                  src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`}
                  alt=""
                  className="h-full object-cover"
                />
              </div>
              <div className="shrink grow-0">
                <h2 className="font-bold">{place.title}</h2>
                <p className="text-sm mt-2">{place.about}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesPage;
