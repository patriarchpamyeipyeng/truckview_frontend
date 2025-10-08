type ButtonProps = {
  label: string;
  url: string;
  variant?: "primary" | "secondary" | "whatsapp";
};

export default function Button({ label, url, variant = "primary" }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    whatsapp: "bg-green-500 text-white hover:bg-green-600"
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${variants[variant]}`}>
      {label}
    </a>
  );
}
