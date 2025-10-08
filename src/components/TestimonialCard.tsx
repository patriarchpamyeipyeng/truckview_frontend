type TestimonialCardProps = {
  name: string;
  role: string;
  message: React.ReactNode; // Accepts JSX, not just string
  avatar?: string;
};

export default function TestimonialCard({ name, role, message, avatar }: TestimonialCardProps) {
  return (
    <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
      {avatar && (
        <img
          src={avatar}
          alt={name}
          className="object-cover w-20 h-20 mb-4 rounded-full"
        />
      )}
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="mb-2 text-blue-700">{role}</p>
      <div className="text-gray-700">{message}</div>
    </div>
  );
}