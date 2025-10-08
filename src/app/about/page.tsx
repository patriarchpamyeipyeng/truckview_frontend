"use client";

import { useEffect, useState } from "react";
import { fetchAbout, mediaURL } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { motion, Variants } from "framer-motion";
import { marked } from "marked";

export default function AboutPage() {
  const [about, setAbout] = useState<any>({});
  const [team, setTeam] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

  useEffect(() => {
    async function loadData() {
      const aboutRes = await fetchAbout();
      const aboutData = aboutRes?.data ?? {};
      setAbout(aboutData);
      setTeam(aboutData.team || []);
      setImages(aboutData.images || []);
    }
    loadData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto">
      {/* Hero Banner */}
      <section className="relative h-[400px] flex items-center justify-center text-center bg-gray-900 text-white overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1 }}
          src="/images/wkshp.jpg"
          alt="About Hero"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold"
          >
            {about.title || "About TruckView Logistics"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg"
          >
            Your satisfaction is our clarion call. In God we trust.
          </motion.p>
        </div>
      </section>
      
{/* Company Description (from Strapi + Styled Section) */}
{about.description && (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative px-6 py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
  >
    <div className="max-w-5xl mx-auto text-center">
      {/* Render Strapi description */}
      <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-700">
        {about.description}
      </p>

      {/* Render Strapi rich text if available */}
      {about.about && (
        <div className="mx-auto mt-6 prose prose-lg text-left text-gray-700">
          <BlocksRenderer content={about.about} />
        </div>
      )}

      {/* Extra section for hardcoded details */}
      <div className="mt-16">
        <h2 className="mb-6 text-4xl font-extrabold text-gray-800">
          Who <span className="text-blue-600">We Are</span>
        </h2>

        <p className="max-w-3xl mx-auto mb-10 text-lg leading-relaxed text-gray-700">
          Truck-View Global Enterprise is a top-tier mechanical and vehicle
          service company based in Nigeria. We specialize in car repairs,
          diagnostics, spray painting, panel beating, and conversions — all
          delivered with precision and professionalism.
        </p>

        {/* Mission & What Sets Us Apart */}
        <div className="grid gap-10 mt-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 text-left bg-white shadow-md rounded-2xl"
          >
            <h3 className="flex items-center gap-2 mb-4 text-2xl font-bold text-blue-700">
              🎯 Mission
            </h3>
            <p className="leading-relaxed text-gray-700">
              Our mission is to offer fast, affordable, and professional vehicle
              services with the highest level of customer satisfaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 text-left bg-white shadow-md rounded-2xl"
          >
            <h3 className="flex items-center gap-2 mb-4 text-2xl font-bold text-blue-700">
              🚗 What Sets Us Apart
            </h3>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li>Experienced, certified technicians</li>
              <li>Use of modern diagnostic tools</li>
              <li>Commitment to quality and durability</li>
              <li>Customer-centric approach</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Subtle blurred background accents */}
    <div className="absolute w-64 h-64 bg-blue-300 rounded-full opacity-30 blur-3xl -top-12 -right-12"></div>
    <div className="absolute bg-blue-400 rounded-full w-72 h-72 opacity-30 blur-3xl -bottom-12 -left-12"></div>
  </motion.section>
)}


      {/* Core Values */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-16"
      >
        <h2 className="mb-10 text-3xl font-bold text-center">Our Core Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {["Integrity", "Innovation", "Reliability", "Excellence", "Customer First", "Near Perfection"].map(
            (value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 text-center transition border rounded-lg shadow hover:shadow-md"
              >
                <span className="mb-3 text-4xl">⭐</span>
                <h3 className="text-lg font-semibold">{value}</h3>
              </motion.div>
            )
          )}
        </div>
      </motion.section>

      {/* Team */}
      {team.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="px-6 py-16 bg-gray-50"
        >
          <h2 className="mb-10 text-3xl font-bold text-center">Our Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member: any, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 text-center transition border shadow rounded-xl hover:shadow-lg"
              >
                {member.photo && (
                  <img
                    src={mediaURL(member.photo?.url)}
                    alt={member.name}
                    className="object-cover mb-4 rounded-full shadow w-28 h-28"
                  />
                )}
                <h3 className="text-xl font-semibold">{member.name}</h3>
                {member.role && (
                  <p className="text-sm text-gray-500">{member.role}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Why Choose Us (Stats) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 text-white bg-blue-700"
      >
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { num: "10+", text: "Years Experience" },
            { num: "500+", text: "Vehicles Repaired" },
            { num: "100%", text: "Satisfaction Rate" },
            { num: "24/7", text: "Support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl font-bold">{stat.num}</p>
              <p>{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gallery */}
      {images.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="px-6 py-16"
        >
          <h2 className="mb-6 text-3xl font-bold text-center">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img: any, i) => (
              <motion.img
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                src={mediaURL(img.url)}
                alt={img.name || "About image"}
                className="object-cover w-full h-48 rounded-lg shadow"
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 text-center text-white bg-blue-600"
      >
        <h2 className="text-3xl font-bold">Ready to work with us?</h2>
        <p className="mt-2 mb-6">
          Book a service or get in touch with our team today.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="tel:08036798700"
            className="px-6 py-3 font-semibold text-blue-600 bg-white rounded-lg shadow hover:bg-gray-200"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/2348036798700"
            className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
          >
            💬 WhatsApp
          </a>
        </div>
      </motion.section>
    </main>
  );
}
