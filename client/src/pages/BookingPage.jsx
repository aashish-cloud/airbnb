import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import {format} from "date-fns"

const BookingPage = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => setBooking(response.data));
  }, []);

  return (
    <div>
      <AccountNav />
      {booking.length > 0 && booking.map(booked => {
        return <div>
            <img src={`http://localhost:4000/uploads/${booked.place.addedPhotos[0]}`} alt="" />
            {format(new Date(booked.checkIn), 'yyyy-MM-dd')}  {format(new Date(booked.checkOut), 'yyyy-MM-dd')}
        </div>
      })}
    </div>
  );
};

export default BookingPage;
