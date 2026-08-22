export const site = {
  name: "Las Berkah Jaya",
  tagline:
    "Melayani pembuatan dan perbaikan konstruksi besi untuk rumah, toko, dan usaha Anda.",
  welcome: "Selamat datang di",
  heroHeadline: "Jasa Las & Konstruksi Besi Terpercaya",
  phone: "0812-3456-7890",
  waNumber: "6281234567890",
  email: "info@lasberkahjaya.id",
  address: "Jl. Industri Raya No. 12, Jakarta Timur, Indonesia",
  hours: [
    { day: "Senin – Jumat", time: "08.00 – 17.00" },
    { day: "Sabtu", time: "08.00 – 14.00" },
    { day: "Minggu", time: "Tutup" },
  ],
  socials: [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "TikTok", url: "https://tiktok.com" },
  ],
};

export type ServiceIcon =
  | "fence"
  | "canopy"
  | "railing"
  | "beam"
  | "stainless"
  | "repair";

export const services: {
  icon: ServiceIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: "fence",
    title: "Pagar Besi",
    desc: "Pagar minimalis, klasik, atau custom sesuai desain — ukur pas, rapi, awet.",
  },
  {
    icon: "canopy",
    title: "Kanopi & Carport",
    desc: "Kanopi baja ringan atap spandek, alderon, atau polycarbonate anti bocor.",
  },
  {
    icon: "railing",
    title: "Railing Tangga",
    desc: "Railing tangga dan balkon besi tempa maupun stainless steel modern.",
  },
  {
    icon: "beam",
    title: "Konstruksi Baja",
    desc: "Rangka baja wf, bomkolom, mezzanine, dan gudang skala kecil–menengah.",
  },
  {
    icon: "stainless",
    title: "Las Stainless & Aluminium",
    desc: "Pintu, jendela, dan display aluminium serta fabrikasi stainless food-grade.",
  },
  {
    icon: "repair",
    title: "Reparasi & Modifikasi",
    desc: "Perbaikan pintu geser, tambal pagar, ganti engsel, hingga modifikasi rangka.",
  },
];

export const about = {
  heading: "Tentang Kami",
  paragraphs: [
    "Las Berkah Jaya adalah bengkel las dengan pengalaman lebih dari 10 tahun mengerjakan konstruksi besi untuk hunian, ruko, dan kantor di Jabodetabek.",
    "Dikerjakan tukang berpengalaman, menggunakan material berkualitas, dan garansi pengerjaan — dari pengukuran sampai finishing.",
  ],
  highlights: [
    "Gratis survei & pengukuran",
    "Material bergaransi",
    "Pengerjaan tepat waktu",
    "Harga transparan",
  ],
  materialsNote:
    "Kami hanya memakai besi KN, hollow galvanis, dan stainless 304 dari produsen terpercaya.",
};

export const testimonials = [
  {
    quote:
      "Pagar depan rumah jadi dalam seminggu, hasilnya rapi banget dan sesuai gambar. Harga masuk akal.",
    name: "Bu Ratna",
    origin: "Pemilik rumah, Cibubur",
  },
  {
    quote:
      "Kanopi gudang 60m selesai sebelum deadline. Komunikasi enak, progres dilaporkan tiap hari.",
    name: "Pak Dedi",
    origin: "Pemilik gudang, Cakung",
  },
  {
    quote:
      "Railing tangga stainless-nya mulus, sudut-sudutnya presisi. Recommended untuk pekerjaan detail.",
    name: "Mas Andre",
    origin: "Kontraktor interior, Kemayoran",
  },
];
