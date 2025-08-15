/**
 * @file types.ts
 * @description Archivo para definir tipos y interfaces compartidos en la aplicación.
 */

// Define la estructura de un objeto Tour.
export interface Tour {
  id: string;
  category: string;
  image: string;
  title: string;
  legend: string;
  details: {
    includes: string[];
    not_included: string[];
    pickup: string;
    additional_info?: string[]; // Opcional, para las estadías
  };
}
