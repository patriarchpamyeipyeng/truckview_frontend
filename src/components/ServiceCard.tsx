"use client";

type Service = {
  name?: string;
  description?: string;
  icon?: { data?: { attributes?: { url?: string } } } | string | null;
};

export default function ServiceCard({ service }: { service: Service }) {
  if (!service) {
    console.warn("⚠️ ServiceCard received undefined service");
    return null; // prevents the crash
  }

  const { name, description, icon } = service;
  const iconUrl =
    typeof icon === "string" ? icon : icon?.data?.attributes?.url || null;

  return (
    <div
      role="button"
      className="flex flex-col items-center p-6 text-center transition transform bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name || "Service"}
          className="object-contain w-20 h-20 mb-4"
        />
      )}
      <h2 className="mb-2 text-xl font-semibold text-gray-800">{name || "Unnamed Service"}</h2>
      <p className="text-sm text-gray-600">
        {description || "No description available."}
      </p>
    </div>
  );
}
