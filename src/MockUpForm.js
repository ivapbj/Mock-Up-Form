// import React, { useState } from "react";

// const MockUpForm = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [companyColors, setCompanyColors] = useState("#000000"); // Default color
//   const [file, setFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("companyName", companyName);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("message", message);
//     formData.append("companyColors", companyColors);
//     if (file) {
//       formData.append("file", file);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/submit-form", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       alert(
//         "Thank you for contacting The Ivana Collective, your results will be emailed within 48 hours."
//       );
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         maxWidth: "400px",
//         margin: "0 auto",
//         padding: "20px",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
//         backgroundColor: "#fff",
//       }}
//     >
//       <label style={{ marginBottom: "10px" }}>
//         Company Name:
//         <input
//           type="text"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "8px",
//             marginTop: "5px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </label>

//       <label style={{ marginBottom: "10px" }}>
//         Email:
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "8px",
//             marginTop: "5px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </label>

//       <label style={{ marginBottom: "10px" }}>
//         Phone:
//         <input
//           type="text"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "8px",
//             marginTop: "5px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </label>

//       <label style={{ marginBottom: "10px" }}>
//         Message:
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           rows="4"
//           style={{
//             width: "100%",
//             padding: "8px",
//             marginTop: "5px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             resize: "none",
//           }}
//         />
//       </label>

//       <label style={{ marginBottom: "10px" }}>
//         Choose Company Colors:
//         <input
//           type="color"
//           value={companyColors}
//           onChange={(e) => setCompanyColors(e.target.value)}
//           style={{
//             width: "100%",
//             height: "40px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         />
//       </label>

//       <label style={{ marginBottom: "10px" }}>
//         Upload a File:
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           style={{
//             width: "100%",
//             padding: "5px",
//             marginTop: "5px",
//           }}
//         />
//       </label>

//       <button
//         type="submit"
//         style={{
//           width: "100%",
//           padding: "10px",
//           backgroundColor: "#007BFF",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default MockUpForm;
import React, { useState } from "react";

const MockUpForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyColors, setCompanyColors] = useState("#000000"); // Default color
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("companyColors", companyColors);
    if (file) {
      formData.append("file", file);
    }

    try {
      // Make sure this URL points to your deployed backend
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header when sending FormData
      });

      const data = await response.json();
      setSubmitMessage(
        "Thank you for contacting The Ivana Collective, your results will be emailed within 48 hours."
      );

      // Reset form
      setCompanyName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCompanyColors("#000000");
      setFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage(
        "There was an error submitting your form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Contact Us</h2>

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
};

export default MockUpForm;
