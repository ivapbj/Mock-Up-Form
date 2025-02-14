import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

export default function CompanyForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  // Open back camera
  const initializeMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraOpen(true);
      }
    } catch (error) {
      alert("Error accessing the camera. Please check permissions.");
      console.error("Camera Error:", error);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");
    setImagePreview(imageUrl);
    setValue("companyLogo", imageUrl);
    stopCamera();
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
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

          {/* Buttons: Open Camera, Capture, Close */}
          <div className="mt-4 space-x-2 flex">
            <button
              type="button"
              onClick={initializeMedia}
              className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              Open Camera
            </button>
            {isCameraOpen && (
              <>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                  Capture
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                >
                  Close Camera
                </button>
              </>
            )}
          </div>
        </div>

        {/* Video Preview (Camera View) */}
        {isCameraOpen && (
          <div className="mt-4 border-2 border-black rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay className="w-full"></video>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#587B6A] text-black font-semibold p-3 rounded-lg hover:bg-[#486656] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
