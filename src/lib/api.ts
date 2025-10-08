// src/lib/api.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Build absolute URL for media returned by Strapi
 */
export function mediaURL(path?: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}


async function request(endpoint: string, opts: RequestInit = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${STRAPI_URL}/api/${endpoint}`;
  const headers = {
    ...(opts.headers || {}),
    // add content-type only when body is present
  } as Record<string, string>;

  const options: RequestInit = {
    ...opts,
    headers,
    cache: "no-store",
  };

  const res = await fetch(url, options);
  const text = await res.text();
  let json: any;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }

  if (!res.ok) {
    console.error(`API ${url} failed (${res.status})`, json ?? text);
    // If Strapi returns an error object, try to surface it
    const msg = json?.error?.message || json?.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return json;
}

/** Homepage (single type) */
export async function fetchHome() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) throw new Error("❌ Missing NEXT_PUBLIC_API_URL in .env file");

  const res = await fetch(`${apiUrl}/api/homepage?populate=*`);

  if (!res.ok) throw new Error("Failed to fetch homepage data");

  const data = await res.json();
  return data;
}



/** About (single type) */
export async function fetchAbout() {
  return request("about?populate=*");
}

/** ContactInfo (single type) */
export async function fetchContactInfo() {
  return request("contact-info?populate=*");
}

/** Services (collection) */
export async function fetchServices() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("❌ Missing NEXT_PUBLIC_API_URL in .env file");
  }

  const res = await fetch(`${baseUrl}/api/services?populate=*`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch services: ${res.statusText}`);
  }

  return await res.json();
}


/** Testimonials (collection) */
export async function fetchTestimonials() {
  return request("testimonials?populate=*");
}

/** Brands (collection) */
export async function fetchBrands() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/brands?populate=*`);
  const data = await res.json();
  console.log("Brands response:", data.data); // <-- must log the array
  return data.data;
}






/* ---------- POST helpers ---------- */

/** Generic POST to Strapi (wraps payload as { data }) */
export async function postAPI(endpoint: string, data: any) {
  return request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
}

/** Convenience wrappers */
export async function createBooking(payload: any) {
  return postAPI("bookings", payload);
}
export async function sendContact(payload: any) {
  return postAPI("contacts", payload);
}
