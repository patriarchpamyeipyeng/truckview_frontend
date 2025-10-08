import { fetchServices } from "@/lib/api";
import ServicesClient from "../services/ServicesClient";

export default async function ServicesPage() {
  const servicesRes = await fetchServices();
  const services = servicesRes?.data || [];

  const allServices = [
    ...services,
  ];

  return <ServicesClient services={allServices} />;
}
