import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import Brands from "@/components/Brands"; // <-- client component
import { fetchHome, fetchServices, fetchTestimonials, fetchBrands, mediaURL } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { motion } from "framer-motion";

// Helper for media URLs
function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return mediaURL(media);
  if (media?.data?.attributes?.url) return mediaURL(media.data.attributes.url);
  if (media?.attributes?.url) return mediaURL(media.attributes.url);
  if (media?.url) return mediaURL(media.url);
  return undefined;
}

export default async function HomePage() {
  // Fetch all server-side data
  const [homepageRes, servicesRes, testimonialsRes, brandsRes] = await Promise.all([
    fetchHome(),
    fetchServices(),
    fetchTestimonials(),
    fetchBrands(),
  ]);

  const hpAttrs = homepageRes?.data?.attributes ?? homepageRes?.data ?? {};
  const svc = servicesRes?.data ?? [];
  const tms = testimonialsRes?.data ?? [];
  const brands = await fetchBrands();;

  // console.log("Brands response:", brandsRes);


  return (
    <main className="max-w-6xl p-8 mx-auto">
      {/* Hero Section */}
      {hpAttrs.heroImage?.url && (
        <section className="relative h-[500px] flex items-center justify-center text-center bg-gray-900 text-white">
          <img
            src={mediaURL(hpAttrs.heroImage.url)}
            alt="Hero"
            className="absolute inset-0 object-cover w-full h-full opacity-60"
          />
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl font-bold">{hpAttrs.title}</h1>
            <p className="mt-4 text-lg">{hpAttrs.description}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {hpAttrs.button?.map((btn: any) => (
                <a
                  key={btn.id}
                  href={btn.url}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    btn.variant === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-blue-600 border hover:bg-gray-100"
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {hpAttrs.about && (
        <section className="relative max-w-6xl px-6 py-20 mx-auto mt-16 overflow-hidden shadow-lg bg-gray-50 rounded-2xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-4xl font-extrabold text-blue-700">About Us</h2>
              <div className="text-lg leading-relaxed text-gray-700">
                <BlocksRenderer content={hpAttrs.about} />
              </div>
              <a
                href="/about"
                className="inline-block px-6 py-3 mt-6 font-semibold text-white bg-blue-700 rounded-lg shadow hover:bg-blue-800"
              >
                Learn More
              </a>
            </div>
            <div className="hidden md:block">
              <img
                src="/images/pic.jpg"
                alt="TruckView Workshop"
                className="object-cover w-full shadow-md h-80 rounded-xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {svc.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Our Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {svc.slice(0, 4).map((s: any) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <a
              href="/services"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              View All Services
            </a>
          </div>
        </section>
      )}

 {/* QUICK STATS */}
      <section className="py-12 mt-16 text-white bg-blue-700">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <p className="text-3xl font-bold">10+</p>
            <p>Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p>Vehicles Repaired</p>
          </div>
          <div>
            <p className="text-3xl font-bold">100%</p>
            <p>Customer Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {tms.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Testimonials & Reviews</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {tms.map((t: any) => {
              const at = t.attributes ?? t;
              const avatar = at.avatar?.data?.attributes?.url ?? at.avatar?.url;
              return (
                <TestimonialCard
                  key={t.id}
                  name={at.name ?? "Anonymous"}
                  role={at.role ?? "Client"}
                  message={<BlocksRenderer content={at.message || []} />}
                  avatar={getMediaUrl(avatar)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Gallery */}
 {/* GALLERY */}
{hpAttrs.images && hpAttrs.images.length > 0 && (
  <section className="mt-16">
    <h2 className="mb-6 text-3xl font-bold text-center">Gallery</h2>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {hpAttrs.images.slice(0, 5).map((img: any) => {
        const url =
          img?.url ||
          img?.data?.attributes?.url ||
          img?.attributes?.url; // handle nested Strapi formats
        if (!url) return null;

        return (
          <img
            key={img.id}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
            alt={img.name ?? "gallery"}
            className="object-cover w-full h-48 transition-transform duration-300 shadow rounded-xl hover:scale-105"
          />
        );
      })}
    </div>
  </section> 
)}


 {/* BRANDS */}
  
      <Brands brands={brands} /> {/* all motion inside Brands.tsx */}

      {/* FAQ */}
{/* FAQ Section */}
<section className="py-12 mt-16">
  <h2 className="mb-6 text-3xl font-bold text-center">Frequently Asked Questions</h2>
  <div className="max-w-3xl mx-auto space-y-4">

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">How long does a repair take?</summary>
      <p className="mt-2 text-gray-600">
        It depends on the service, but most repairs are completed within 24–48 hours.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Do you offer emergency services?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we provide 24/7 roadside assistance for urgent breakdowns.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Do you offer home or roadside repairs?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we provide mobile mechanic services within Abuja and nearby locations for minor repairs and diagnostics.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Do you offer a warranty on your repairs?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we give a 30-day warranty on all major repairs and parts replacement.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">How do I book an appointment?</summary>
      <p className="mt-2 text-gray-600">
        You can use the booking form on our website or contact us directly via phone or WhatsApp.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">What types of vehicles do you repair?</summary>
      <p className="mt-2 text-gray-600">
        We fix all vehicle types — trucks, cars, buses, and heavy-duty machines.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">What payment methods do you accept?</summary>
      <p className="mt-2 text-gray-600">
        We accept **cash, bank transfer, and mobile payment options** like Paystack and Flutterwave.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Can I get a free estimate before repair?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we provide a **free diagnostic and repair estimate** before starting any work.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Do you provide spare parts?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we supply **high-quality spare parts** and replacements. We also source specific parts on request.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Do you handle insurance claims?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we assist with **insurance claim repairs** and provide the necessary documentation.
      </p>
    </details>

    <details className="p-4 bg-gray-100 rounded-lg">
      <summary className="font-semibold">Do you offer vehicle maintenance packages?</summary>
      <p className="mt-2 text-gray-600">
        Yes, we have **regular maintenance packages** to keep your vehicle in top condition and prevent costly repairs.
      </p>
    </details>

  </div>
</section>


      {/* CONTACT CTA */}
      <section className="py-12 mt-16 text-center text-white bg-blue-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Need Immediate Assistance?</h2>
        <p className="mt-2">Call us now or book a service online.</p>
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="tel:08036798700"
            className="px-6 py-3 font-semibold text-blue-700 bg-white rounded-lg shadow hover:bg-gray-200"
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
      </section>

    </main>
  );
}
