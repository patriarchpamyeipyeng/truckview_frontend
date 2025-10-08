// components/BookingForm.tsx
"use client";
import { useState, useEffect } from "react";
import { postAPI, fetchServices } from "@/lib/api";

type ServiceItem = {
  id: number | string;
  attributes?: { title?: string; name?: string };
};

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    services: [] as number[], // store numeric ids
    email: "",
    phone: "",
    date: "",
    vehicleType: "",
    location: "",
    notes: "",
    status: "pending",
  });

  const [availableServices, setAvailableServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load services (returns array)
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServices(); // now returns array
        setAvailableServices(data);
      } catch (err: any) {
        console.error("Failed to load services:", err);
        setError("Failed to load services");
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleServiceToggle = (id: number | string) => {
    const numId = Number(id);
    setForm((p) => {
      const exists = p.services.includes(numId);
      return {
        ...p,
        services: exists ? p.services.filter((s) => s !== numId) : [...p.services, numId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Build payload matching what Strapi expects.
      // IMPORTANT: replace "service" with the exact relation field name from your Booking content type if different.
      // Many Strapi setups name the relation field "service" even if it's a many-to-many. If your field is "services",
      // change the payload key accordingly.
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        vehicleType: form.vehicleType,
        location: form.location,
        notes: form.notes,
        status: form.status,
        // include both keys to increase chance of matching user's schema (Strapi ignores unknown fields)
        service: form.services,
       
      };

      const res = await postAPI("bookings", payload);
      console.log("Booking response:", res);
      setSuccess(true);
      setForm({
        name: "",
        services: [],
        email: "",
        phone: "",
        date: "",
        vehicleType: "",
        location: "",
        notes: "",
        status: "pending",
      });
    } catch (err: any) {
      console.error("Booking failed:", err);
      setError(err?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <p className="text-green-600">✅ Booking submitted successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 shadow-md bg-gray-50 rounded-xl">
      {error && <div className="p-2 text-sm text-red-700 bg-red-100 rounded">{error}</div>}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="vehicleType"
        placeholder="Vehicle Type"
        value={form.vehicleType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <div>
        <p className="mb-2 font-semibold">Select Services:</p>
        {availableServices.length === 0 ? (
          <p className="text-sm text-gray-500">Loading services...</p>
        ) : (
          availableServices.map((srv) => {
            const id = Number(srv.id);
            const label = srv.attributes?.title ?? srv.attributes?.name ?? "Service";
            return (
              <label key={srv.id} className="block mb-1">
                <input
                  type="checkbox"
                  checked={form.services.includes(id)}
                  onChange={() => handleServiceToggle(id)}
                  className="mr-2"
                />
                {label}
              </label>
            );
          })
        )}
      </div>

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded">
        {loading ? "Submitting..." : "Book Now"}
      </button>
    </form>
  );
}
