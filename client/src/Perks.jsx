import React from "react";

const Perks = ({ perks, setPerks }) => {
  const handlePerks = (ev) => {
    const { checked, name } = ev.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((cbname) => cbname !== name)]);
    }
  };

  return (
    <div className="mt-6 grid gap-2 grid-cols-2 sm:grid-cols-3">
      <input
        type="checkbox"
        name="parking"
        id="parking"
        checked={perks.includes("parking")}
        onChange={handlePerks}
        className="hidden peer/parking"
      />
      <label
        htmlFor="parking"
        className="border-2 p-4 w-full rounded-lg cursor-pointer peer-checked/parking:border-primary"
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
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>

        <p className="mt-1">Free parking</p>
      </label>
      <input
        type="checkbox"
        name="pets"
        id="pets"
        checked={perks.includes("pets")}
        onChange={handlePerks}
        className="peer/pets hidden"
      />
      <label
        htmlFor="pets"
        className="border-2 p-4 rounded-lg cursor-pointer peer-checked/pets:border-primary"
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
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>

        <p className="mt-1">Pets</p>
      </label>
      <input
        type="checkbox"
        name="tv"
        id="tv"
        checked={perks.includes("tv")}
        onChange={handlePerks}
        className="hidden peer/tv"
      />
      <label
        htmlFor="tv"
        className="border-2 p-4 rounded-lg cursor-pointer peer-checked/tv:border-primary"
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
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>

        <p className="mt-1">TV</p>
      </label>

      <input
        type="checkbox"
        name="wifi"
        id="wifi"
        checked={perks.includes("wifi")}
        onChange={handlePerks}
        className="hidden peer/wifi"
      />
      <label
        htmlFor="wifi"
        className="border-2 p-4 rounded-lg cursor-pointer peer-checked/wifi:border-primary"
      >
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

        <p className="mt-1">Wifi</p>
      </label>

      <input
        type="checkbox"
        name="pvt-entrance"
        id="pvt-entrance"
        checked={perks.includes("pvt-entrance")}
        onChange={handlePerks}
        className="hidden peer/pvt-entrance"
      />
      <label
        htmlFor="pvt-entrance"
        className="border-2 p-4 rounded-lg cursor-pointer peer-checked/pvt-entrance:border-primary"
      >
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

        <p className="mt-1">Private entrance</p>
      </label>

      <input
        type="checkbox"
        name="radio"
        id="radio"
        checked={perks.includes("radio")}
        onChange={handlePerks}
        className="hidden peer/radio"
      />
      <label
        htmlFor="radio"
        className="border-2 p-4 rounded-lg cursor-pointer peer-checked/radio:border-primary"
      >
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

        <p className="mt-1">Radio</p>
      </label>
    </div>
  );
};

export default Perks;
