"use client";
import Link from "next/link";
import { mediaURL } from "@/lib/api";

type Props = {
  service: any | null;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: Props) {
  if (!service) return null;

  const name = service.name ?? service.title ?? "Service";
  const description = service.description ?? service.summary ?? "";

  // Build image URL safely
  const iconUrl = service.icon
    ? mediaURL(
        service.icon?.data?.attributes?.url ??
        service.icon?.url ??
        service.icon
      )
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl">
        <button
          onClick={onClose}
          className="absolute text-xl text-gray-500 top-3 right-3 hover:text-gray-700"
        >
          ×
        </button>

        {iconUrl && (
          <img
            src={iconUrl}
            alt={name}
            className="object-contain w-24 h-24 mx-auto mb-4"
          />
        )}

        <h2 className="mb-4 text-2xl font-bold text-center">{name}</h2>
        <p className="mb-6 text-center text-gray-600">{description}</p>

        {/* Book Now button */}
        <div className="flex justify-center">
          <Link
            href={`/booking?service=${encodeURIComponent(name)}`}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
