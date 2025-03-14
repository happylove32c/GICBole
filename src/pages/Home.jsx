import React, { useState } from "react";
import GenerateRef from "../components/GenerateRef";
import { Toaster, toast } from "react-hot-toast";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kootbjjmjxurjwkvajdy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb3Riamptanh1cmp3a3ZhamR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjIzNzksImV4cCI6MjA1NzQ5ODM3OX0.iYkkvICXnp7GLw0X7-RuTqJAdsduH2_wxwhmsgQJcwI'
const supabase = createClient(supabaseUrl, supabaseKey)

const Home = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [refNumber, setRefNumber] = useState("");

  const handleBookNow = async () => {
    // console.log("Ref Number:", refNumber);
    if (!phone || !refNumber) {
      toast.error("Phone number and reference number are required");
      return;
    }
  
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ email, phone_number: phone, ref_no: refNumber }]);
  
    if (error) {
      toast.error("Error booking service");
      console.error(error);
    } else {
      toast.success("Service booked successfully");
  
      // Reset form fields
      setEmail("");
      setPhone("");
      setRefNumber("");
    }
  };
  

  return (
    <div className="relative h-screen w-full p-6 flex items-center justify-center bg-gray-100">
      <Toaster />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/ddxcd04ok/image/upload/v1741921230/WhatsApp_Image_2025-03-14_at_3.59.53_AM_cauh4u.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://res.cloudinary.com/ddxcd04ok/image/upload/v1741920670/gic_log_jqavhr.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-lg"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center">Hey there</h2>
        <p className="text-gray-500 text-center">Book for shop4free here</p>

        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter number..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Ref Number</label>
          <GenerateRef value={refNumber} onGenerate={setRefNumber} />
        </div>

        <button
          onClick={handleBookNow}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Home;
