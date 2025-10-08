import Navbar from "@/components/Navbar"; // ⬅️ use your new responsive Navbar
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Truck-View Global Enterprise",
  description: "We fix all vehicle types! Reliable and expert mechanical services.",
  icons: {
    icon: "/truck-logo-removebg-preview.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 bg-gray-50">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
