import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}
