"use client";

import { motion } from "framer-motion";

interface Brand {
  id: number;
  name: string;
  logo?: {
    url?: string;
  };
}

interface BrandsProps {
  brands: Brand[];
}

export default function Brands({ brands }: BrandsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gray-50"
    >
      <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
        Trusted by Leading Vehicle Brands
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-8 px-6">
        {brands.length > 0 ? (
          brands.map((brand) => {
            const logoUrl = brand.logo?.url;
            const name = brand.name;

            return (
              <div
                key={brand.id}
                className="flex flex-col items-center justify-center p-4 transition-all duration-300 bg-white shadow-md w-36 h-36 rounded-2xl hover:shadow-xl"
              >
                {/* Circular background for logos */}
                <div className="flex items-center justify-center w-20 h-20 p-3 rounded-full bg-blue-50">
                  {logoUrl ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logoUrl}`}
                      alt={name}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{name}</div>
                  )}
                </div>
                <p className="mt-3 text-sm font-medium text-center text-gray-700">
                  {name}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No brands available yet.</p>
        )}
      </div>
    </motion.section>
  );
}
