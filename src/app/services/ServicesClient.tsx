"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceSection from "@/components/ServiceSection";

type Service = {
  // Define the properties of a service object here
  // Example:
  id: string;
  name: string;
  description: string;
  // Add other fields as needed
};

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 text-center text-white bg-gradient-to-r from-blue-600 to-blue-800"
      >
        <h1 className="mb-4 text-4xl font-bold">Our Professional Services</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          At TruckView Global Enterprise, we combine experience, innovation, and integrity
          to keep your vehicles in peak condition — from diagnostics to full repairs.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl px-6 py-16 mx-auto"
      >
        <h2 className="mb-12 text-3xl font-extrabold text-center text-gray-800">
          Explore Our <span className="text-blue-600">Expert Services</span>
        </h2>
        <ServiceSection services={services} />
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl font-extrabold text-gray-800"
          >
            What Our Clients Say
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "TruckView fixed my delivery truck within 24 hours. They truly live up to their promise — reliable and professional.",
                name: "Chinedu I.",
                role: "Logistics Manager",
              },
              {
                quote:
                  "Their diagnostic service saved me thousands. Very skilled team and friendly staff.",
                name: "Titus Ikeh.",
                role: "Private Car Owner",
              },
              {
                quote:
                  "Paul attends to all my cars' needs whenever I call which is a good relationship if you want to keep customers.",
                name: "Sarkin Mota.",
                role: "Private Car Owner",
              },
              {
                quote:
                  "We maintain our fleet with TruckView and haven’t had a breakdown in months. Excellent maintenance support.",
                name: "Yusuf T.",
                role: "Fleet Supervisor",
              },
              {
                quote:
                  "TruckView has become our trusted partner for all company vehicles. They deliver quality, every single time.",
                name: "DON AA.",
                role: "Company Representative",
              },
              {
                quote:
                  "All our cars are brought for repair here — we trust their hands completely.",
                name: "Credlanche Ltd.",
                role: "Fleet Owner",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 transition bg-gray-100 shadow rounded-2xl hover:shadow-lg"
              >
                <p className="italic text-gray-700">“{t.quote}”</p>
                <h4 className="mt-4 font-semibold text-blue-700">
                  – {t.name}, {t.role}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 text-center text-white bg-gradient-to-r from-blue-700 to-blue-900"
      >
        <h2 className="mb-4 text-3xl font-bold">
          Need a quick or advanced service?
        </h2>
        <p className="mb-8 opacity-90">
          Book a professional service with TruckView today and experience premium care.
        </p>
        <Link
          href="/booking"
          className="inline-block px-8 py-3 font-semibold text-blue-700 transition bg-white rounded-full shadow hover:scale-105 hover:bg-gray-100"
        >
          Book a Service
        </Link>
      </motion.section>
    </main>
  );
}
