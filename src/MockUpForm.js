import React, { useState } from "react";

const MockUpForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyColors, setCompanyColors] = useState("#000000"); // Default color
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch("http://localhost:5000/api/submit-form", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(
        "Thank you for contacting The Ivana Collective, your results will be emailed within 48 hours."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <label style={{ marginBottom: "10px" }}>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </label>

      <label style={{ marginBottom: "10px" }}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </label>

      <label style={{ marginBottom: "10px" }}>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </label>

      <label style={{ marginBottom: "10px" }}>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
      </label>

      <label style={{ marginBottom: "10px" }}>
        Choose Company Colors:
        <input
          type="color"
          value={companyColors}
          onChange={(e) => setCompanyColors(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            border: "none",
            cursor: "pointer",
          }}
        />
      </label>

      <label style={{ marginBottom: "10px" }}>
        Upload a File:
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            width: "100%",
            padding: "5px",
            marginTop: "5px",
          }}
        />
      </label>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default MockUpForm;
