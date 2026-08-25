import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          name: string;
          brand: string;
          role: string;
          location: string;
          address: string;
          phone: string;
          whatsapp: string;
          hours: string;
          experience_years: number;
          completed_projects: number;
        };
      };
      settings: {
        Row: {
          id: string;
          hero_image: string;
          about_image: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          tagline: string;
          description: string;
          image: string;
          materials: string[];
          applications: string[];
          sort_order: number;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          category: string;
          category_label: string;
          image: string;
          location: string;
          year: string;
          material: string;
          description: string;
          highlight: string;
          sort_order: number;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          location: string;
          comment: string;
          project: string;
          sort_order: number;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort_order: number;
        };
      };
    };
  };
};
