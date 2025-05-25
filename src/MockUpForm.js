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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Do your form submission logic here...

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: companyName,
          email,
          phone,
          message,
          brandColors: companyColors,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitMessage("Form submitted successfully!");
      } else {
        setSubmitMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Free Mock-Ups</h2>

      {submitMessage && (
        <div className="p-3 mb-4 bg-green-100 text-green-800 rounded-md">
          {submitMessage}
        </div>
      )}

      <label className="block mb-4">
        <span className="block text-gray-700 mb-1">Company Name:</span>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-gray-700 mb-1">Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-gray-700 mb-1">Phone:</span>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-gray-700 mb-1">Message:</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-gray-700 mb-1">Choose Company Colors:</span>
        <input
          type="color"
          value={companyColors}
          onChange={(e) => setCompanyColors(e.target.value)}
          className="w-full h-10 p-0 border-0 cursor-pointer"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-gray-700 mb-1">Upload Company Logo:</span>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
