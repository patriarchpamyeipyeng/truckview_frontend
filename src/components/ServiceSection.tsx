"use client";

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import { mediaURL } from "@/lib/api";

export default function ServiceSection({ services }: { services: any[] }) {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <>
      <div className={`${selectedService ? "blur-sm" : ""} grid gap-6 sm:grid-cols-2 md:grid-cols-3`}>
{services
  ?.filter((s: any) => s && (s.attributes || s.name)) // filter out undefined or empty ones
  .map((service: any) => {
    const attrs = service.attributes ?? service;

    const iconUrl =
      attrs?.icon?.data?.attributes?.url
        ? mediaURL(attrs.icon.data.attributes.url)
        : attrs?.icon?.url
        ? mediaURL(attrs.icon.url)
        : undefined;

    if (!attrs?.name) {
      console.warn("Skipping service with missing name:", attrs);
      return null;
    }

    return (
      <ServiceCard
        key={service.id ?? attrs.name}
        service={{ ...attrs, icon: iconUrl }}
      />
    );
  })}

      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
