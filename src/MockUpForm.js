import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

export default function CompanyForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [thankYouMessage, setThankYouMessage] = useState(null);

  // Form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // Prepare the form data
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("companyColors", data.companyColors);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("companyLogo", data.companyLogo[0]);

    try {
      // POST request to your backend
      const response = await fetch(
        "https://theivanacollective.com/api/submit-form",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Show thank you message
        setThankYouMessage(
          "Thank you for contacting The Ivana Collective. Your results will be emailed within 48 hours."
        );
      } else {
        // Handle error
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-black mb-4 text-center">
        Company Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Company Name Field */}
        <div>
          <label className="block font-semibold text-black">Company Name</label>
          <input
            type="text"
            {...register("companyName")}
            className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-black"
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Company Colors */}
        <div>
          <label className="block font-semibold text-black">
            Company Colors
          </label>
          <input
            type="color"
            {...register("companyColors")}
            className="w-full border-2 border-black p-2 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block font-semibold text-black">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-black"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold text-black">Phone Number</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-black"
            required
          />
        </div>

        {/* Company Logo Upload */}
        <div>
          <label className="block font-semibold text-black">Company Logo</label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mt-2 border-2 border-black"
            />
          )}

          <input
            type="file"
            accept="image/*"
            {...register("companyLogo")}
            className="w-full border-2 border-black p-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-black transition text-black"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
                setValue("companyLogo", file);
              }
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#587B6A] text-black font-semibold p-3 rounded-lg hover:bg-[#486656] transition"
        >
          Submit
        </button>
      </form>

      {/* Thank You Message */}
      {thankYouMessage && (
        <div className="mt-4 text-center text-black font-semibold">
          {thankYouMessage}
        </div>
      )}
    </div>
  );
}
