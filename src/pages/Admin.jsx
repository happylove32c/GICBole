"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kootbjjmjxurjwkvajdy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb3Riamptanh1cmp3a3ZhamR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjIzNzksImV4cCI6MjA1NzQ5ODM3OX0.iYkkvICXnp7GLw0X7-RuTqJAdsduH2_wxwhmsgQJcwI'
const supabase = createClient(supabaseUrl, supabaseKey)

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error.message);
    } else {
      setBookings(data);
    }
  };

  const handleCompleteBooking = async (id) => {
    // Find the booking to be moved
    const bookingToMove = bookings.find((booking) => booking.id === id);
    if (!bookingToMove) return;
  
    // Insert the booking into the "booked" table
    const { error: insertError } = await supabase.from("booked").insert([
      {
        email: bookingToMove.email,
        phone_number: bookingToMove.phone_number,
        ref_no: bookingToMove.ref_no,
      },
    ]);
  
    if (insertError) {
      console.error("Error transferring booking:", insertError.message);
      return;
    }
  
    // Delete the booking from the "bookings" table
    const { error: deleteError } = await supabase.from("bookings").delete().match({ id });
  
    if (deleteError) {
      console.error("Error deleting booking:", deleteError.message);
    } else {
      toast.success("Booking completed!");
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };
  

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.ref_no.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Admin Panel - Bookings
        </h1>
        <input
          type="text"
          placeholder="Search by email or ref no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring focus:ring-purple-500"
        />
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-white rounded-lg shadow-md border"
              >
                <p className="text-lg font-semibold">{booking.email}</p>
                <p className="text-gray-600">{booking.phone_number}</p>
                <p className="text-sm text-gray-500">Ref: {booking.ref_no}</p>
                <button
                  className="mt-2 p-2 w-full bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => handleCompleteBooking(booking.id)}
                >
                  Mark as Complete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
