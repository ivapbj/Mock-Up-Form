import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", brandColors: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (err) {
      console.error(err);
      setStatus("Failed to send.");
    }
  };

  return (
    <div className="App">
      <h1>Client Info Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="brandColors"
          placeholder="Brand Colors"
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
