// app/contact/page.tsx
import { fetchContactInfo } from "@/lib/api";
import ContactForm from "@/components/ContactForm";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default async function ContactPage() {
  const contactInfo = await fetchContactInfo();
  const attrs = contactInfo?.data?.attributes || {};

  return (
    
    <main className="max-w-6xl px-6 py-12 mx-auto">
      {/* Page Title */}
      <h1 className="mb-10 text-4xl font-extrabold text-center text-gray-800">
        Get in <span className="text-blue-600">Touch</span> with Us
      </h1>

      {/* Info + Form Section */}
      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p className="text-gray-600">
            We’re here to help! Reach out to us via phone, email, or WhatsApp.
          </p>

          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <FaPhone className="text-blue-600" />
          <a
            href="tel:08036798700"
            className="px-6 py-3 font-semibold text-blue-700 bg-white rounded-lg shadow hover:bg-gray-200"
          >
             Call Now
          </a>
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
  <a
    href="mailto:truckviewent@gmail.com"
    className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
  >
     Email Us
  </a>
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" />
               <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attrs.address || "TruckView Enterprise")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 font-semibold text-white bg-red-600 rounded-lg shadow hover:bg-red-700"
  >
    Find Us
  </a>
  <span className="ml-2">{attrs.address}</span>
            </p>
            <p className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500" />
                        <a
            href="https://wa.me/2348036798700"
            className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
          >
          WhatsApp
          </a>

      
            </p>
          </div>

          {/* Business Hours */}
          <div className="mt-8">
            <h3 className="mb-2 text-xl font-semibold">Business Hours</h3>
            <ul className="text-gray-600">
              <li>Mon – Sat: 8:00am – 6:00pm</li>
              <li>Sunday: Closed (Except for Emergencies)</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl text-blue-700 hover:scale-110" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl text-pink-500 hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="mb-4 text-2xl font-semibold">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold text-center">Find Us Here</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7932252132723!2d7.495087314747276!3d9.072264193489825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104c7914b7c2325b%3A0x2d9c7e2f3df41d11!2sTruckView%20Enterprise!5e0!3m2!1sen!2sng!4v1694447770000!5m2!1sen!2sng"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Closing CTA */}
      <div className="p-6 mt-16 text-center text-white shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
        <h2 className="mb-2 text-2xl font-bold">
          Your Satisfaction is Our Clarion Call 🚚
        </h2>
        <p>We’re always ready to serve you. Book a service today!</p>
      </div>
    </main>
  );
}
