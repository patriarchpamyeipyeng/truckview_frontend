// src/lib/types.ts
export interface Homepage {
  title: string;
  description?: string;
  heroImage?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
}
