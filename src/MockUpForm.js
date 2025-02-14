import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

export default function CompanyForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("companyLogo", file);
    }
  };

  // Open back camera
  const initializeMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }, // Use back camera
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraOpen(true);
      }
    } catch (error) {
      alert("Camera access denied. Please enable permissions.");
      console.error("Error accessing camera:", error);
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
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Company Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            {...register("companyName")}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Company Colors */}
        <div>
          <label className="block font-medium">Company Colors</label>
          <input
            type="color"
            {...register("companyColors")}
            className="w-full border p-3 h-12 rounded"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block font-medium">Email Address</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Company Logo Upload */}
        <div>
          <label className="block font-medium">Company Logo</label>

          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            {...register("companyLogo")}
            className="w-full border p-2 rounded mt-2"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {/* Camera Buttons */}
          <div className="mt-2 space-x-2">
            <button
              type="button"
              onClick={initializeMedia}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Open Camera
            </button>
            {isCameraOpen && (
              <>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Capture
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Close Camera
                </button>
              </>
            )}
          </div>
        </div>

        {/* Camera Preview */}
        {isCameraOpen && (
          <div className="mt-4">
            <video
              ref={videoRef}
              autoPlay
              className="w-full border rounded"
            ></video>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
