"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

export type ProfileData = {
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

export type SettingsData = {
  hero_image: string;
  about_image: string;
  hero_brightness: number;
  hero_gradient: number;
  hero_brightness_mobile: number;
  hero_gradient_mobile: number;
};

export type ServiceData = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  materials: string[];
  applications: string[];
  sort_order: number;
};

export type ProjectData = {
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

export type TestimonialData = {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  project: string;
  sort_order: number;
};

export type FaqData = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

// Default fallbacks from welderData.ts
const DEFAULT_PROFILE: ProfileData = {
  name: "Danang",
  brand: "Andal Las",
  role: "Melayani Berbagai Pengelasan, Custom Kendaraan, Pengecatan & Lainnya",
  location: "Kaliwungu, Kab. Semarang & Melayani Panggilan Sekitarnya",
  address: "Jl. Kebatan, RT.02/RW.09, Gender Kidul, Kradenan, Kec. Kaliwungu, Kabupaten Semarang, Jawa Tengah 50578",
  phone: "+62 858-8589-5321",
  whatsapp: "6285885895321",
  hours: "Senin – Sabtu · 08.00 – 17.30 WIB",
  experience_years: 12,
  completed_projects: 850,
};

const DEFAULT_SETTINGS: SettingsData = {
  hero_image: PLACEHOLDER_IMAGES.hero,
  about_image: PLACEHOLDER_IMAGES.about,
  hero_brightness: 35,
  hero_gradient: 70,
  hero_brightness_mobile: 25,
  hero_gradient_mobile: 80,
};

const DEFAULT_SERVICES: ServiceData[] = [
  {
    id: "kanopi-atap",
    title: "Kanopi & Atap Besi Custom",
    tagline: "Rangka kokoh, tidak berisik saat hujan, dan anti bocor.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
    description: "Pembuatan kanopi carport, teras, dan atap tambahan dengan rangka besi hollow atau baja ringan.",
    materials: ["Besi Hollow Galvanis", "Baja Ringan / Baja WF", "Atap Spandek, Alderon, atau Solarflat"],
    applications: ["Kanopi Carport Rumah", "Atap Teras & Gudang", "Kanopi Depan Toko"],
    sort_order: 1,
  },
  {
    id: "pagar-teralis",
    title: "Pagar, Teralis & Jendela Besi",
    tagline: "Keamanan ekstra tanpa bikin rumah terasa sempit.",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80",
    description: "Pagar halaman, teralis jendela, dan pintu besi dengan desain klasik maupun minimalis.",
    materials: ["Besi Hollow & Besi Kotak", "Pipa Baja", "Cat Besi Anti Karat / Cat Duco"],
    applications: ["Pagar Halaman Rumah", "Teralis Jendela & Pintu", "Sekat & Kanopi Toko"],
    sort_order: 2,
  },
  {
    id: "gerbang-pintu-lipat",
    title: "Gerbang & Pintu Lipat Besi",
    tagline: "Gerakannya halus, kokoh, dan mudah dirawat.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    description: "Fabrikasi gerbang pagar utama, pintu lipat garasi, dan pintu geser besi.",
    materials: ["Hollow Galvanis Tebal", "Plat Besi", "Rel & Roda Bearing Heavy Duty"],
    applications: ["Gerbang Halaman & Gang", "Pintu Lipat Garasi/Ruko", "Pintu Geser Otomatis/Manual"],
    sort_order: 3,
  },
  {
    id: "rak-besi",
    title: "Rak Besi & Furniture Besi Custom",
    tagline: "Ukuran sesuai kebutuhan, beban dijamin kuat.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    description: "Rak toko dan gudang, meja kerja besi, frame meja kayu solid, hingga kusen dan kanopi mini.",
    materials: ["Besi Hollow Galvanis", "Besi Siku / Unikoma", "Multiplex & Plat Bordes"],
    applications: ["Rak Toko & Gudang", "Meja Kerja Bengkel/Dapur", "Frame Meja & Kursi Besi"],
    sort_order: 4,
  },
  {
    id: "custom-kendaraan",
    title: "Custom Motor & Kendaraan",
    tagline: "Knalpot, sasis, bumper dikerjakan presisi.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
    description: "Modifikasi rangka motor custom (chopper, cafe racer, vespa), knalpot custom, bumper dan rollbar mobil/pickup.",
    materials: ["Pipa Besi & Stainless", "Hollow Tipis 0.8-1.2mm", "Plat Baja"],
    applications: ["Knalpot Custom Motor", "Sasis & Rangka Motor Custom", "Bumper / Rollbar Mobil"],
    sort_order: 5,
  },
  {
    id: "pengecatan",
    title: "Pengecatan & Finishing Besi",
    tagline: "Cat rapi menempel kuat, tidak mudah mengelupas.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80",
    description: "Jasa pengecatan besi baru maupun repaint pagar/gerbang lama: pembersihan karat, cat dasar anti karat, hingga cat akhir.",
    materials: ["Cat Dasar Anti Karat", "Cat Duco / Cat Semprot", "Powder Coating"],
    applications: ["Repaint Pagar & Teralis Lama", "Finishing Hasil Las Baru", "Cat Kanopi & Rak Besi"],
    sort_order: 6,
  },
];

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: "p1",
    title: "Kanopi Carport Rangka Hollow",
    category: "architectural",
    category_label: "Kanopi & Atap",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    location: "Kaliwungu, Semarang",
    year: "2025",
    material: "Hollow Galvanis 4x4 + Atap Alderon",
    description: "Kanopi carport 3x5 meter dengan rangka hollow galvanis dan kaki yang ditanam ke cor beton.",
    highlight: "Rangka dicat dasar anti karat sebelum pemasangan atap.",
    sort_order: 1,
  },
  {
    id: "p2",
    title: "Gerbang Pagar Utama & Pintu Lipat",
    category: "architectural",
    category_label: "Gerbang & Pintu",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    location: "Kota Semarang",
    year: "2025",
    material: "Hollow Galvanis + Plat Besi + Rel Bearing",
    description: "Gerbang halaman satu pintu plus pintu lipat garasi. Roda bearing heavy duty membuat gerbang besar tetap ringan digeser.",
    highlight: "Finishing cat duco warna hitam doff, tahan cuaca.",
    sort_order: 2,
  },
  {
    id: "p3",
    title: "Teralis Jendela & Pagar Rumah Minimalis",
    category: "architectural",
    category_label: "Pagar & Teralis",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80",
    location: "Kendal, Jawa Tengah",
    year: "2024",
    material: "Besi Hollow & Besi Kotak Solid",
    description: "Teralis jendela motif garis minimalis untuk rumah tinggal 2 lantai, termasuk pagar samping halaman.",
    highlight: "Tidak ada ujung las kasar, aman untuk anak kecil.",
    sort_order: 3,
  },
  {
    id: "p4",
    title: "Rak Display Toko Bangunan",
    category: "structural",
    category_label: "Rak Besi",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    location: "Semarang",
    year: "2024",
    material: "Hollow Galvanis 4x4 + Multiplex 18mm",
    description: "Rak display 3 tingkat sepanjang 6 meter untuk toko bangunan. Rangka dirancang kuat menahan beban.",
    highlight: "Uji beban manual sebelum serah terima.",
    sort_order: 4,
  },
  {
    id: "p5",
    title: "Knalpot Custom & Rangka Motor Chopper",
    category: "automotive",
    category_label: "Custom Kendaraan",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
    location: "Ungaran, Semarang",
    year: "2024",
    material: "Pipa Baja Seamless 1.2mm",
    description: "Fabrikasi knalpot custom dan modifikasi rangka motor chopper. Sambungan dilas penuh lalu diasah halus.",
    highlight: "Suarakan mantap tanpa bocor di sambungan.",
    sort_order: 5,
  },
  {
    id: "p6",
    title: "Truss Atap Gudang Bengkel",
    category: "structural",
    category_label: "Struktur Baja",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    location: "Kaliwungu, Semarang",
    year: "2023",
    material: "Baja WF & Hollow Galvanis",
    description: "Rangka atap gudang bentang lebar dengan truss baja. Fabrikasi di workshop lalu dirakit langsung di lokasi.",
    highlight: "Selesai dalam 20 hari kerja termasuk pengecatan.",
    sort_order: 6,
  },
];

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
  {
    id: "t1",
    name: "Ir. Hendrik Gunawan",
    role: "Kontraktor Bangunan",
    location: "Semarang",
    comment: "Mas Danang sangat teliti dalam urusan sambungan baja. Hasil pengelasannya rapi, tebalnya merata, dan pengerjaannya tepat waktu.",
    project: "Truss Atap Gudang Kaliwungu",
    sort_order: 1,
  },
  {
    id: "t2",
    name: "Bimo Wicaksono",
    role: "Pecinta Motor Custom",
    location: "Ungaran",
    comment: "Susah cari tukang las yang paham rangka motor custom dan knalpot. Sambungan lasnya rapi sekali seperti koin bertumpuk.",
    project: "Knalpot & Rangka Chopper",
    sort_order: 2,
  },
  {
    id: "t3",
    name: "Diana Paramitha",
    role: "Ibu Rumah Tangga",
    location: "Kendal",
    comment: "Gerbang dan teralis rumah kami dikerjakan dengan sempurna. Tidak ada sambungan yang kasar dan catnya sangat mulus.",
    project: "Gerbang & Teralis Rumah",
    sort_order: 3,
  },
];

const DEFAULT_FAQS: FaqData[] = [
  {
    id: "f1",
    question: "Apakah melayani pekerjaan las panggilan ke lokasi?",
    answer: "Ya, kami memiliki peralatan las portabel dan melayani panggilan ke lokasi: perbaikan gerbang/pagar, pemasangan kanopi, sampai las darurat di area Kaliwungu, Kendal, Kota Semarang, Ungaran dan sekitarnya.",
    sort_order: 1,
  },
  {
    id: "f2",
    question: "Berapa lama estimasi waktu pengerjaan?",
    answer: "Tergantung volume dan tingkat kerumitan. Pagar atau teralis biasanya membutuhkan waktu 3-7 hari kerja. Kanopi berkisar 5-10 hari kerja.",
    sort_order: 2,
  },
  {
    id: "f3",
    question: "Apakah ada garansi hasil pekerjaan?",
    answer: "Kami memberikan garansi pengerjaan. Jika timbul masalah pada titik las dalam pemakaian normal, kami perbaiki tanpa biaya tambahan.",
    sort_order: 3,
  },
  {
    id: "f4",
    question: "Bagaimana cara mendapatkan estimasi biaya yang akurat?",
    answer: "Anda cukup mengirimkan foto lokasi, perkiraan ukuran, atau gambar desain via WhatsApp. Kami akan menghitungkan rincian kebutuhan material dan biaya secara gratis.",
    sort_order: 4,
  },
];

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);

  useEffect(() => {
    supabase.from("profile").select("*").single().then(({ data, error }) => {
      if (data && !error) setProfile(data);
    });
  }, []);

  return profile;
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);

  useEffect(() => {
    supabase.from("settings").select("*").single().then(({ data, error }) => {
      if (data && !error) setSettings(data);
    });
  }, []);

  return settings;
}

export function useServices() {
  const [services, setServices] = useState<ServiceData[]>(DEFAULT_SERVICES);

  useEffect(() => {
    supabase.from("services").select("*").order("sort_order").then(({ data, error }) => {
      if (data && data.length > 0 && !error) setServices(data);
    });
  }, []);

  return services;
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectData[]>(DEFAULT_PROJECTS);

  useEffect(() => {
    supabase.from("projects").select("*").order("sort_order").then(({ data, error }) => {
      if (data && data.length > 0 && !error) setProjects(data);
    });
  }, []);

  return projects;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    supabase.from("testimonials").select("*").order("sort_order").then(({ data, error }) => {
      if (data && data.length > 0 && !error) setTestimonials(data);
    });
  }, []);

  return testimonials;
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<FaqData[]>(DEFAULT_FAQS);

  useEffect(() => {
    supabase.from("faqs").select("*").order("sort_order").then(({ data, error }) => {
      if (data && data.length > 0 && !error) setFaqs(data);
    });
  }, []);

  return faqs;
}
