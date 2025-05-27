import React, { useState } from "react";
import "./index.css";

export default function ContactForm() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyColors, setCompanyColors] = useState("#3b82f6");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // "success" or "error"

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        e.target.value = "";
        return;
      }
      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload an image file");
        e.target.value = "";
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Basic validation
    if (!companyName || !email || !phone) {
      setSubmitMessage("Please fill in all required fields");
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", companyName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);
      formData.append("brandColors", companyColors);

      if (file) {
        formData.append("logo", file);
      }

      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitMessage(
        "Thank you! Your mockup request has been submitted. We'll get back to you within 48 hours!"
      );
      setSubmitStatus("success");
      // Reset form on successful submission
      setCompanyName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCompanyColors("#3b82f6");
      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4 relative overflow-hidden">
      {/* Subtle Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full opacity-25 blur-2xl animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header Section */}

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6 tracking-tight">
            Premium <span className="font-normal text-green-600">Mock-Ups</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed font-light">
            Elegant, custom designs crafted to elevate your brand vision
          </p>
          <div className="flex items-center justify-center mt-8 space-x-12 text-slate-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-sm font-light">Premium Quality</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-sm font-light">48hr Delivery</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-sm font-light">Complimentary</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-10 md:p-12">
            {submitMessage && (
              <div
                className={`p-5 mb-10 rounded-2xl ${
                  submitStatus === "success"
                    ? "bg-green-50/80 text-green-700 border border-green-200/50"
                    : "bg-red-50/80 text-red-700 border border-red-200/50"
                }`}
              >
                <div className="flex items-center">
                  {submitStatus === "success" ? (
                    <svg
                      className="w-5 h-5 mr-3 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 mr-3 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  )}
                  <span className="font-light">{submitMessage}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Company Name */}
              <div className="group">
                <label className="block text-slate-700 font-light mb-3 text-base">
                  Company Name <span className="text-blue-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  placeholder="Enter your company name"
                  className="w-full px-5 py-4 bg-white/60 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md hover:bg-white/80"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-slate-700 font-light mb-3 text-base">
                  Email Address <span className="text-blue-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 bg-white/60 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md hover:bg-white/80"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Phone */}
              <div className="group">
                <label className="block text-slate-700 font-light mb-3 text-base">
                  Phone Number <span className="text-blue-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="(555) 123-4567"
                  className="w-full px-5 py-4 bg-white/60 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md hover:bg-white/80"
                />
              </div>

              {/* Brand Colors */}
              <div className="group">
                <label className="block text-slate-700 font-light mb-3 text-base">
                  Brand Colors
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="color"
                      value={companyColors}
                      onChange={(e) => setCompanyColors(e.target.value)}
                      className="w-14 h-14 border-2 border-white rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                    />
                  </div>
                  <div className="flex-1 px-4 py-3 bg-slate-50/80 border border-slate-200/60 rounded-xl font-mono text-slate-600 text-sm font-light">
                    {companyColors.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="group mb-8">
              <label className="block text-slate-700 font-light mb-3 text-base">
                Project Details
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                placeholder="Share your vision, style preferences, or specific requirements..."
                className="w-full px-5 py-4 bg-white/60 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60 resize-none transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md hover:bg-white/80"
              />
            </div>

            {/* File Upload */}
            <div className="group mb-10">
              <label className="block text-slate-700 font-light mb-3 text-base">
                Company Logo
              </label>
              <div className="relative border-2 border-dashed border-slate-200/80 rounded-xl p-8 bg-white/40 hover:border-blue-300/60 hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100/60 rounded-xl mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                  </div>

                  {file ? (
                    <div>
                      <p className="text-base font-light text-green-600 mb-1">
                        {file.name}
                      </p>
                      <p className="text-sm text-slate-500 font-light">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-base font-light text-slate-600 mb-1">
                        <span className="text-blue-600">Choose file</span> or
                        drop here
                      </p>
                      <p className="text-sm text-slate-400 font-light">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`inline-flex items-center px-10 py-4 text-base font-light rounded-2xl shadow-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-slate-300 cursor-not-allowed text-slate-500"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-white-600 hover:to-green-700 text-white hover:shadow-xl hover:-translate-y-0.5"
                } border border-white/20`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
                    Preparing your mockups...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    Request Premium Mock-Ups
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-slate-200/50">
              <p className="text-sm text-slate-500 font-light">
                <span className="text-blue-500">*</span> Required fields •
                <span className="text-slate-600">
                  {" "}
                  Delivered within 48 hours
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-slate-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-blue-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-sm font-light">Secure & Private</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-blue-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span className="text-sm font-light">No Spam Promise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
