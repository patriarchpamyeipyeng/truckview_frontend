// In Hero.tsx
type HeroProps = {
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
};

export default function Hero({ title, description, image, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-12 bg-gray-100 rounded-lg shadow">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
        />
      )}
      <div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-700 mb-6">{description}</p>
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}