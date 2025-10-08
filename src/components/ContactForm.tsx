"use client";
import { useState } from "react";
import { postAPI } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  try {
    await postAPI("contacts", form);
    setSuccess(true);
    setForm({ name: "", phone: "", email: "", message: "" });
  } catch (err) {
    console.error("Contact failed", err);
  } finally {
    setLoading(false);
  }
};

  if (success) {
    return <p className="text-green-600">✅ Message sent successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 shadow-md bg-gray-50 rounded-xl">
      <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required className="w-full p-2 border rounded" />
      <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
