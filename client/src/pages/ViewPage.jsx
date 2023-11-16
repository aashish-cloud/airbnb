import axios from "axios";
import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate, useParams } from "react-router-dom";

const ViewPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [redirect, setRedirect] = useState("");

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  useEffect(() => {
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, []);

  const perksClass = (name) => {
    let style = "flex gap-2 ";
    if (!place.perks?.includes(name)) style += "line-through";
    return style;
  };

  const bookThisPlace = async () => {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      guests,
      price: numberOfNights * place.price,
      place: place._id,
    });

    setRedirect("/account/bookings/");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (showMorePhotos) {
    return (
      <div className="bg-black p-8 absolute text-white min-h-screen min-w-full">
        <div className="mb-4 font-semibold text-2xl flex justify-between items-center">
          <p>Gallery</p>
          <button
            onClick={() => {
              setShowMorePhotos(false);
            }}
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {place.addedPhotos.map((photo, index) => {
            return (
              <img
                key={index}
                className=""
                src={`http://localhost:4000/uploads/${photo}`}
                alt=""
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        target="_blank"
        className="flex items-center gap-1 underline mt-2 mb-6 font-semibold"
        href={`https://maps.google.com/?q=${place.city + ", " + place.country}`}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.city}, {place.country}
      </a>
      <div className="relative rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr] gap-2">
          <div className="h-full flex">
            {place.addedPhotos?.[0] && (
              <img
                className="aspect-square object-cover"
                src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`}
                alt=""
              />
            )}
          </div>
          <div className="grid grid-flow-row grid-rows-[1fr_1fr]">
            {place.addedPhotos?.[1] && (
              <img
                className="object-cover aspect-square"
                src={`http://localhost:4000/uploads/${place.addedPhotos[1]}`}
                alt=""
              />
            )}

            <div className="relative overflow-hidden">
              {place.addedPhotos?.[1] && (
                <img
                  className="object-cover aspect-square absolute top-2"
                  src={`http://localhost:4000/uploads/${place.addedPhotos[1]}`}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setShowMorePhotos(true);
          }}
          className="flex bg-white absolute bottom-3 right-3 text-xs p-2 gap-1 rounded-lg shadow-md shadow-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
          Show more photos
        </button>
      </div>
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-[3fr_2fr]">
        <div className="">
          <h2 className="text-xl mb-2 font-semibold">Description</h2>
          <p className="">{place.about}</p>

          <div className="grid gap-4 border-y my-4 py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-400 p-2 text-center">
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
                    d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Check In</p>
                <i>{place.inTime}hrs</i>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-400 p-2 text-center">
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
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Check Out</p>
                <i>{place.outTime}hrs</i>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-400 p-2 text-center">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Max Guests</p>
                <i>{place.guestCount} guests</i>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <h2 className="text-xl mb-2 font-semibold">
              What this place offers
            </h2>
            <div className={perksClass("parking")}>
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
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <p>Free parking</p>
            </div>

            <div className={perksClass("pets")}>
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
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <p>Pets</p>
            </div>

            <div className={perksClass("tv")}>
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
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              <p>TV</p>
            </div>

            <div className={perksClass("wifi")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M.676 6.941A12.964 12.964 0 0110 3c3.657 0 6.963 1.511 9.324 3.941a.75.75 0 01-.008 1.053l-.353.354a.75.75 0 01-1.069-.008C15.894 6.28 13.097 5 10 5 6.903 5 4.106 6.28 2.106 8.34a.75.75 0 01-1.069.008l-.353-.354a.75.75 0 01-.008-1.053zm2.825 2.833A8.976 8.976 0 0110 7a8.976 8.976 0 016.499 2.774.75.75 0 01-.011 1.049l-.354.354a.75.75 0 01-1.072-.012A6.978 6.978 0 0010 9c-1.99 0-3.786.83-5.061 2.165a.75.75 0 01-1.073.012l-.354-.354a.75.75 0 01-.01-1.05zm2.82 2.84A4.989 4.989 0 0110 11c1.456 0 2.767.623 3.68 1.614a.75.75 0 01-.022 1.039l-.354.354a.75.75 0 01-1.085-.026A2.99 2.99 0 0010 13c-.88 0-1.67.377-2.22.981a.75.75 0 01-1.084.026l-.354-.354a.75.75 0 01-.021-1.039zm2.795 2.752a1.248 1.248 0 011.768 0 .75.75 0 010 1.06l-.354.354a.75.75 0 01-1.06 0l-.354-.353a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Wifi</p>
            </div>

            <div className={perksClass("pvt-entrance")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Private entrance</p>
            </div>

            <div className={perksClass("radio")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17.45 3.473a.75.75 0 10-.4-1.446L5.313 5.265c-.84.096-1.671.217-2.495.362A2.212 2.212 0 001 7.817v7.933A2.25 2.25 0 003.25 18h13.5A2.25 2.25 0 0019 15.75V7.816c0-1.06-.745-2-1.817-2.189a41.124 41.124 0 00-5.406-.589l5.673-1.565zM16 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM14.5 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9.26-5a.75.75 0 01.75-.75H6a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V11zm2.75-.75a.75.75 0 00-.75.75v.01c0 .415.336.75.75.75H8a.75.75 0 00.75-.75V11a.75.75 0 00-.75-.75h-.01zm-1.75-1.5A.75.75 0 016.99 8H7a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm3.583.42a.75.75 0 00-1.06 0l-.007.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.06 0l.007-.007a.75.75 0 000-1.061l-.007-.007zm.427 2.08A.75.75 0 0111 12v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75h.01zm-.42 3.584a.75.75 0 000-1.061l-.007-.007a.75.75 0 00-1.06 0l-.007.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.06 0l.008-.007zm-3.59.416a.75.75 0 01.75-.75H7a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm-1.013-1.484a.75.75 0 00-1.06 0l-.008.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.061 0l.007-.007a.75.75 0 000-1.061l-.007-.007zM3.75 11.25a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75h.01zm1.484-1.012a.75.75 0 000-1.061l-.007-.007a.75.75 0 00-1.06 0l-.007.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.06 0l.007-.007zM7.24 13a.75.75 0 01.75-.75H8a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V13zm-1.25-.75a.75.75 0 00-.75.75v.01c0 .415.336.75.75.75H6a.75.75 0 00.75-.75V13a.75.75 0 00-.75-.75h-.01z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Radio</p>
            </div>
          </div>
        </div>

        <div>
          <div className="auto-rows-min border grid bg-white rounded-lg p-4">
            <h2 className="text-center text-lg">
              <span className="font-semibold">${place.price}</span> / per night
            </h2>

            {/* check-in/check-out/guest */}
            <div className="border my-4 rounded-lg">
              <div className="flex">
                <div className="text-sm py-2 px-2">
                  Check in:
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                    name=""
                    id=""
                  />
                </div>
                <div className="text-sm border-l py-2 px-2">
                  Check out:
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="text-sm flex border-t flex-col p-2">
                <label className="block" htmlFor="guests">
                  No. of Guests
                </label>
                <input
                  className="block border py-1 px-2 rounded-lg mt-2"
                  type="number"
                  min={1}
                  max={place.guestCount}
                  value={guests}
                  onChange={(ev) => setGuests(ev.target.value)}
                  name="guests"
                  id="guests"
                />
              </div>
            </div>

            {/* reserve  */}
            <button onClick={bookThisPlace} className="bg-primary text-white py-2 rounded-lg">
              Reserve
              {numberOfNights > 0 && (
                <span> ${numberOfNights * place.price}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
