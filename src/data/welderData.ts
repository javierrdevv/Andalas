export interface ProjectItem {
  id: string;
  title: string;
  category: "architectural" | "structural" | "automotive" | "stainless";
  categoryLabel: string;
  image: string;
  location: string;
  year: string;
  material: string;
  description: string;
  highlight: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  materials: string[];
  applications: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  project: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PROFILE = {
  name: "Danang",
  brand: "AndalLas",
  role: "Tukang Las Universal: Kanopi, Teralis, Gerbang, Rak & Custom",
  location: "Kaliwungu, Kab. Semarang & Melayani Panggilan Sekitarnya",
  address:
    "Jl. Kebatan, RT.02/RW.09, Gender Kidul, Kradenan, Kec. Kaliwungu, Kabupaten Semarang, Jawa Tengah 50578",
  experienceYears: 12,
  completedProjects: 850,
  phone: "+62 858-8589-5321",
  whatsapp: "6285885895321",
  hours: "Senin – Sabtu · 08.00 – 17.30 WIB",
  emergencyService: "Layanan Darurat 24 Jam",
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "kanopi-atap",
    title: "Kanopi & Atap Besi Custom",
    tagline: "Rangka kokoh, tidak berisik saat hujan, dan anti bocor.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
    description:
      "Pembuatan kanopi carport, teras, dan atap tambahan dengan rangka besi hollow atau baja ringan. Kaki kanopi ditanam kuat ke struktur, atap dipasang dengan lubang baut yang tepat agar tidak rembes.",
    materials: ["Besi Hollow Galvanis", "Baja Ringan / Baja WF", "Atap Spandek, Alderon, atau Solarflat"],
    applications: ["Kanopi Carport Rumah", "Atap Teras & Gudang", "Kanopi Depan Toko"],
  },
  {
    id: "pagar-teralis",
    title: "Pagar, Teralis & Jendela Besi",
    tagline: "Keamanan ekstra tanpa bikin rumah terasa sempit.",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80",
    description:
      "Pagar halaman, teralis jendela, dan pintu besi dengan desain klasik maupun minimalis. Sambungan las digrounding rata lalu dicat anti karat agar awet bertahun-tahun.",
    materials: ["Besi Hollow & Besi Kotak", "Pipa Baja", "Cat Besi Anti Karat / Cat Duco"],
    applications: ["Pagar Halaman Rumah", "Teralis Jendela & Pintu", "Sekat & Kanopi Toko"],
  },
  {
    id: "gerbang-pintu-lipat",
    title: "Gerbang & Pintu Lipat Besi",
    tagline: "Gerakannya halus, kokoh, dan mudah dirawat.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    description:
      "Fabrikasi gerbang pagar utama, pintu lipat garasi, dan pintu geser besi. Roda bearing dan rel dipilih yang kuat supaya tetap enteng dibuka walau ukuran besar.",
    materials: ["Hollow Galvanis Tebal", "Plat Besi", "Rel & Roda Bearing Heavy Duty"],
    applications: ["Gerbang Halaman & Gang", "Pintu Lipat Garasi/Ruko", "Pintu Geser Otomatis/Manual"],
  },
  {
    id: "rak-besi",
    title: "Rak Besi & Furniture Besi Custom",
    tagline: "Ukuran sesuai kebutuhan, beban dijamin kuat.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    description:
      "Rak toko dan gudang, meja kerja besi, frame meja kayu solid, hingga kusen dan kanopi mini. Semua dibuat custom sesuai ukuran tempat Anda.",
    materials: ["Besi Hollow Galvanis", "Besi Siku / Unikoma", "Multiplex & Plat Bordes"],
    applications: ["Rak Toko & Gudang", "Meja Kerja Bengkel/Dapur", "Frame Meja & Kursi Besi"],
  },
  {
    id: "custom-kendaraan",
    title: "Custom Motor & Kendaraan",
    tagline: "Knalpot, sasis, bumper dikerjakan presisi.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
    description:
      "Modifikasi rangka motor custom (chopper, cafe racer, vespa), knalpot custom, bumper dan rollbar mobil/pickup. Dikerjakan teliti agar pas dan aman dipakai harian.",
    materials: ["Pipa Besi & Stainless", "Hollow Tipis 0.8-1.2mm", "Plat Baja"],
    applications: ["Knalpot Custom Motor", "Sasis & Rangka Motor Custom", "Bumper / Rollbar Mobil"],
  },
  {
    id: "pengecatan",
    title: "Pengecatan & Finishing Besi",
    tagline: "Cat rapi menempel kuat, tidak mudah mengelupas.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80",
    description:
      "Jasa pengecatan besi baru maupun repaint pagar/gerbang lama: pembersihan karat, cat dasar anti karat, hingga cat akhir duco atau powder coating sesuai budget.",
    materials: ["Cat Dasar Anti Karat", "Cat Duco / Cat Semprot", "Powder Coating"],
    applications: ["Repaint Pagar & Teralis Lama", "Finishing Hasil Las Baru", "Cat Kanopi & Rak Besi"],
  },
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "p1",
    title: "Kanopi Carport Rangka Hollow",
    category: "architectural",
    categoryLabel: "Kanopi & Atap",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    location: "Kaliwungu, Semarang",
    year: "2025",
    material: "Hollow Galvanis 4x4 + Atap Alderon",
    description:
      "Kanopi carport 3x5 meter dengan rangka hollow galvanis dan kaki yang ditanam ke cor beton. Kemiringan atap dihitung agar air hujan tidak menggenang.",
    highlight: "Rangka dicat dasar anti karat sebelum pemasangan atap.",
  },
  {
    id: "p2",
    title: "Gerbang Pagar Utama & Pintu Lipat",
    category: "architectural",
    categoryLabel: "Gerbang & Pintu",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    location: "Kota Semarang",
    year: "2025",
    material: "Hollow Galvanis + Plat Besi + Rel Bearing",
    description:
      "Gerbang halaman satu pintu plus pintu lipat garasi. Roda bearing heavy duty membuat gerbang besar tetap ringan digeser satu tangan.",
    highlight: "Finishing cat duco warna hitam doff, tahan cuaca.",
  },
  {
    id: "p3",
    title: "Teralis Jendela & Pagar Rumah Minimalis",
    category: "architectural",
    categoryLabel: "Pagar & Teralis",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80",
    location: "Kendal, Jawa Tengah",
    year: "2024",
    material: "Besi Hollow & Besi Kotak Solid",
    description:
      "Teralis jendela motif garis minimalis untuk rumah tinggal 2 lantai, termasuk pagar samping halaman. Semua sambungan digrounding rata sebelum dicat.",
    highlight: "Tidak ada ujung las kasar, aman untuk anak kecil.",
  },
  {
    id: "p4",
    title: "Rak Display Toko Bangunan",
    category: "structural",
    categoryLabel: "Rak Besi",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    location: "Semarang",
    year: "2024",
    material: "Hollow Galvanis 4x4 + Multiplex 18mm",
    description:
      "Rak display 3 tingkat sepanjang 6 meter untuk toko bangunan. Rangka dirancang kuat menahan beban semen dan cat per lapis rak.",
    highlight: "Uji beban manual dengan duduk beramai-ramai sebelum serah terima.",
  },
  {
    id: "p5",
    title: "Knalpot Custom & Rangka Motor Chopper",
    category: "automotive",
    categoryLabel: "Custom Kendaraan",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
    location: "Ungaran, Semarang",
    year: "2024",
    material: "Pipa Baja Seamless 1.2mm",
    description:
      "Fabrikasi knalpot custom dan modifikasi rangka motor chopper. Sambungan dilas penuh lalu diasah halus sebelum finishing chrome/cat.",
    highlight: "Suarakan mantap tanpa bocor di sambungan.",
  },
  {
    id: "p6",
    title: "Truss Atap Gudang Bengkel",
    category: "structural",
    categoryLabel: "Struktur Baja",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    location: "Kaliwungu, Semarang",
    year: "2023",
    material: "Baja WF & Hollow Galvanis",
    description:
      "Rangka atap gudang bentang lebar dengan truss baja. Fabrikasi di workshop lalu dirakit langsung di lokasi agar pemasangan cepat.",
    highlight: "Selesai dalam 20 hari kerja termasuk pengecatan.",
  },
];

interface WeldComparisonRow {
  criterion: string;
  bad: string;
  good: string;
}

export const WELD_COMPARISON = {
  kicker: "Standar Pengerjaan",
  heading: ["Las Presisi", "vs Las Biasa."],
  subtext:
    "Kekuatan struktural bangunan atau railing sangat bergantung pada fusi inti logam di setiap titik sambungan. Ini bedanya hasil las presisi dan pengelasan asal jadi.",
  badTitle: "Pengelasan Cepat / Asal-Asalan",
  badBadge: "Biasa Ditemui",
  badBig: "Asal Jadi.",
  badVerdict: "Rawan retak dalam pemakaian jangka panjang",
  goodTitle: "Standar Danang",
  goodBadge: "Standar Bengkel",
  goodBig: "Presisi.",
  goodVerdict: "Sambungan kuat & rapi · Garansi pengerjaan",
  rows: [
    {
      criterion: "Permukaan & Spatter",
      bad: "Cipratan percikan mengotori besi, cat mudah mengelupas.",
      good: "Pola bead konsisten, rapi, dan bersih tanpa spatter.",
    },
    {
      criterion: "Penetrasi Las",
      bad: "Dangkal, hanya menempel di kulit luar, rapuh saat beban kejut.",
      good: "Fusi penuh 100% hingga akar sambungan, teruji beban.",
    },
    {
      criterion: "Kontrol Panas",
      bad: "Tidak merata, besi melintir (warping).",
      good: "Dikerjakan di meja jig datar, toleransi kelurusan ketat.",
    },
  {
    criterion: "Garansi Kerja",
    bad: "Tanpa garansi sambungan tertulis dari pembuat.",
    good: "Garansi pengerjaan: ada masalah di titik las, kami perbaiki.",
  },
  ] as WeldComparisonRow[],
};

export const TESTIMONIALS_LIST: Testimonial[] = [  {
    id: "t1",
    name: "Ir. Hendrik Gunawan",
    role: "Kontraktor Bangunan",
    location: "Semarang",
    comment:
      "Mas Danang sangat teliti dalam urusan sambungan baja. Saat inspeksi, hasil pengelasannya rapi, tebalnya merata, dan pengerjaannya tepat waktu sesuai jadwal proyek.",
    project: "Truss Atap Gudang Kaliwungu",
  },
  {
    id: "t2",
    name: "Bimo Wicaksono",
    role: "Pecinta Motor Custom",
    location: "Ungaran",
    comment:
      "Susah cari tukang las yang paham rangka motor custom dan knalpot. Sambungan lasnya rapi sekali seperti koin bertumpuk, dan tidak perlu diulang.",
    project: "Knalpot & Rangka Chopper",
  },
  {
    id: "t3",
    name: "Diana Paramitha",
    role: "Ibu Rumah Tangga",
    location: "Kendal",
    comment:
      "Gerbang dan teralis rumah kami dikerjakan dengan sempurna. Tidak ada sambungan yang kasar dan catnya sangat mulus, tetap bagus setelah setahun lebih.",
    project: "Gerbang & Teralis Rumah",
  },
];

export const FAQS_LIST: FaqItem[] = [
  {
    question: "Apakah melayani pekerjaan las panggilan ke lokasi?",
    answer:
      "Ya, kami memiliki peralatan las portabel dan melayani panggilan ke lokasi: perbaikan gerbang/pagar, pemasangan kanopi, sampai las darurat di area Kaliwungu, Kendal, Kota Semarang, Ungaran dan sekitarnya.",
  },
  {
    question: "Berapa lama estimasi waktu pengerjaan?",
    answer:
      "Tergantung volume dan tingkat kerumitan. Pagar atau teralis biasanya membutuhkan waktu 3-7 hari kerja (fabrikasi workshop + 1-2 hari instalasi di lokasi). Kanopi berkisar 5-10 hari kerja.",
  },
  {
    question: "Apakah ada garansi hasil pekerjaan?",
    answer:
      "Kami memberikan garansi pengerjaan. Jika timbul masalah pada titik las dalam pemakaian normal, kami perbaiki tanpa biaya tambahan.",
  },
  {
    question: "Bagaimana cara mendapatkan estimasi biaya yang akurat?",
    answer:
      "Anda cukup mengirimkan foto lokasi, perkiraan ukuran (panjang x lebar), atau gambar desain via WhatsApp. Kami akan menghitungkan rincian kebutuhan material dan biaya secara gratis.",
  },
];
