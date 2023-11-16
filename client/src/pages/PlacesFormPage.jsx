import React, { useEffect, useState } from "react";
import PhotoUploader from "../PhotoUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [place, setPlace] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(({ data }) => {
      setPlace(data);
      setAddedPhotos(data.addedPhotos);
      setPerks(data.perks);
    });
  }, [id]);

  const handleChange = (ev) => {
    setPlace((prev) => {
      // console.log({...prev, [ev.target.name] : ev.target.value});
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  };

  console.log("place", place);

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    const data = {
      ...place,
      addedPhotos,
      perks,
    };

    if (id === undefined) await axios.post("/places", data);
    else await axios.put(`/places/${id}`, data);

    setRedirect(true);
  };

  if (redirect) {
    setRedirect(false);
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form className="m-8" onSubmit={addNewPlace}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={place?.title}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 p-2 focus:outline-none sm:text-sm sm:leading-6"
                      placeholder="Ashiyana"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    value={place?.about}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary p-2 focus:outline-none sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your ashiyana.
                </p>
              </div>

              <PhotoUploader
                setAddedPhotos={setAddedPhotos}
                addedPhotos={addedPhotos}
              />
            </div>
          </div>

          {/* Address information */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address for your ashiyana.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    onChange={handleChange}
                    value={place?.country}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>India</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="streetAddr"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="streetAddr"
                    id="streetAddr"
                    value={place?.streetAddr}
                    onChange={handleChange}
                    autoComplete="streetAddr"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={place?.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    value={place?.region}
                    onChange={handleChange}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={place?.postalCode}
                    onChange={handleChange}
                    autoComplete="postalCode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Perks information */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Perks
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              List the perks for your ashiyana.
            </p>

            {/* Perks */}
            <Perks perks={perks} setPerks={setPerks} />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8">
              <div>
                <label
                  htmlFor="inTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Check in time
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="inTime"
                    id="inTime"
                    value={place?.inTime}
                    placeholder="1300hrs"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="outTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Check out time
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="outTime"
                    id="outTime"
                    value={place?.outTime}
                    placeholder="1900hrs"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="guestCount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Max No. of Guests
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="guestCount"
                    id="guestCount"
                    value={place?.guestCount}
                    min={1}
                    defaultValue={1}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={place?.price}
                    min={1}
                    defaultValue={100}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 rounded-md text-gray-900 px-3 py-2 bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
