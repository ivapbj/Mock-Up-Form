import React, { useState } from "react";

export default function ContactForm() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyColors, setCompanyColors] = useState("#000000");
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
      formData.append("companyName", companyName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);
      formData.append("companyColors", companyColors);

      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData, // Don't set Content-Type header when using FormData
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitMessage(data.message || "Form submitted successfully!");
        setSubmitStatus("success");
        // Reset form on successful submission
        setCompanyName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setCompanyColors("#000000");
        setFile(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setSubmitMessage(data.message || "Something went wrong");
        setSubmitStatus("error");
      }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="flex flex-col max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Free Mock-Ups
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Tell us about your company and we'll create custom mockups for you
        </p>

        {submitMessage && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              submitStatus === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <label className="block mb-5">
          <span className="block text-gray-700 font-medium mb-2">
            Company Name *
          </span>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Enter your company name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </label>

        <label className="block mb-5">
          <span className="block text-gray-700 font-medium mb-2">Email *</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </label>

        <label className="block mb-5">
          <span className="block text-gray-700 font-medium mb-2">Phone *</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </label>

        <label className="block mb-5">
          <span className="block text-gray-700 font-medium mb-2">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Tell us about your project, style preferences, or any specific requirements..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          />
        </label>

        <label className="block mb-5">
          <span className="block text-gray-700 font-medium mb-2">
            Company Brand Colors
          </span>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={companyColors}
              onChange={(e) => setCompanyColors(e.target.value)}
              className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
            />
            <span className="text-gray-600 font-mono text-sm">
              {companyColors}
            </span>
          </div>
        </label>

        <label className="block mb-8">
          <span className="block text-gray-700 font-medium mb-2">
            Upload Company Logo
          </span>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, GIF up to 5MB
            </p>
            {file && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>
        </label>

        <div
          onClick={handleSubmit}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all cursor-pointer text-center ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            "Get My Free Mock-Up"
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          * Required fields
        </p>
      </div>
    </div>
  );
}
