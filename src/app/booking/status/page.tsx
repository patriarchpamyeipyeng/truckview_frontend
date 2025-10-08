"use client";
import { useState } from "react";

export default function BookingStatusPage() {
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBooking(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings?filters[email][$eq]=${encodeURIComponent(
          email
        )}&populate=services`
      );
      const data = await res.json();
      console.log("Booking API response:", data); // Debug line
      if (data.data && data.data.length > 0) {
        setBooking(data.data[0]);
      } else {
        setError("No booking found for this email.");
      }
    } catch {
      setError("Error fetching booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md p-8 mx-auto mt-10 bg-white shadow rounded-xl">
      <h1 className="mb-4 text-2xl font-bold text-center text-blue-700">
        Check Booking Status
      </h1>
      <form onSubmit={handleCheck} className="mb-6">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your booking email"
          className="w-full p-3 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </form>
      {error && <div className="text-center text-red-600">{error}</div>}
      {booking && (
        <div className="mt-6 text-center">
          <div>
  <strong>Name:</strong> {booking.name || "N/A"}
</div>
<div>
  <strong>Status:</strong> {booking.stati || "N/A"}
</div>
<div>
  <strong>Notes:</strong>{" "}
  {Array.isArray(booking.notes)
    ? booking.notes.map((block: any, i: number) =>
        block.children?.map((child: any) => child.text).join(" ")
      ).join(" ")
    : booking.notes || "None"}
</div>
<div>
  <strong>Services:</strong>{" "}
  {Array.isArray(booking.services) && booking.services.length > 0
    ? booking.services.map((svc: any) => svc.name || svc.title || "Service").join(", ")
    : "None"}
</div>
       
        </div>
      )}

    </main>
  );
}