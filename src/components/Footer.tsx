export default function Footer() {
  const year = new Date().getFullYear();
  return (
     <div>
      <footer className="py-8 mt-16 text-center text-gray-500 border-t">
        <p>© {new Date().getFullYear()} Truck-View Global Enterprise. All rights reserved.</p>
        <p className="mt-2">Your satisfaction is our clarion call · In God we trust</p>
      </footer>

    </div>
  );
}