-- ============================================================
-- Andal Las — Full Schema + Seed Data
-- Run this ONCE in Supabase SQL Editor
-- ============================================================

-- Profile (single row)
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Danang',
  brand text not null default 'Andal Las',
  role text not null default 'Melayani Berbagai Pengelasan, Custom Kendaraan, Pengecatan & Lainnya',
  location text not null default 'Kaliwungu, Kab. Semarang & Melayani Panggilan Sekitarnya',
  address text not null default 'Jl. Kebatan, RT.02/RW.09, Gender Kidul, Kradenan, Kec. Kaliwungu, Kabupaten Semarang, Jawa Tengah 50578',
  phone text not null default '+62 858-8589-5321',
  whatsapp text not null default '6285885895321',
  hours text not null default 'Senin – Sabtu · 08.00 – 17.30 WIB',
  experience_years int not null default 12,
  completed_projects int not null default 850
);

-- Settings (single row)
create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  hero_image text not null default 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
  about_image text not null default 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  hero_brightness int not null default 35,
  hero_gradient int not null default 70,
  hero_brightness_mobile int not null default 25,
  hero_gradient_mobile int not null default 80
);

-- Services
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tagline text not null default '',
  description text not null default '',
  image text not null default '',
  materials jsonb not null default '[]'::jsonb,
  applications jsonb not null default '[]'::jsonb,
  sort_order int not null default 0
);

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'architectural',
  category_label text not null default '',
  image text not null default '',
  location text not null default '',
  year text not null default '',
  material text not null default '',
  description text not null default '',
  highlight text not null default '',
  sort_order int not null default 0
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  location text not null default '',
  comment text not null default '',
  project text not null default '',
  sort_order int not null default 0
);

-- FAQs
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '',
  sort_order int not null default 0
);

-- Calculator config (single row)
create table if not exists calculator (
  id uuid primary key default gen_random_uuid(),
  projects jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  install_pct numeric not null default 0.1,
  min_install numeric not null default 500000,
  range_low numeric not null default 0.9,
  range_high numeric not null default 1.15
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Profile
insert into profile (id, name, brand, role, location, address, phone, whatsapp, hours, experience_years, completed_projects)
values (
  '00000000-0000-0000-0000-000000000001',
  'Danang',
  'Andal Las',
  'Melayani Berbagai Pengelasan, Custom Kendaraan, Pengecatan & Lainnya',
  'Kaliwungu, Kab. Semarang & Melayani Panggilan Sekitarnya',
  'Jl. Kebatan, RT.02/RW.09, Gender Kidul, Kradenan, Kec. Kaliwungu, Kabupaten Semarang, Jawa Tengah 50578',
  '+62 858-8589-5321',
  '6285885895321',
  'Senin – Sabtu · 08.00 – 17.30 WIB',
  12,
  850
) on conflict (id) do update set
  name = excluded.name,
  brand = excluded.brand,
  role = excluded.role,
  location = excluded.location,
  address = excluded.address,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  hours = excluded.hours,
  experience_years = excluded.experience_years,
  completed_projects = excluded.completed_projects;

-- Settings
insert into settings (id, hero_image, about_image, hero_brightness, hero_gradient, hero_brightness_mobile, hero_gradient_mobile)
values (
  '00000000-0000-0000-0000-000000000001',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  35,
  70,
  25,
  80
) on conflict (id) do update set
  hero_image = excluded.hero_image,
  about_image = excluded.about_image,
  hero_brightness = excluded.hero_brightness,
  hero_gradient = excluded.hero_gradient,
  hero_brightness_mobile = excluded.hero_brightness_mobile,
  hero_gradient_mobile = excluded.hero_gradient_mobile;

-- Services
insert into services (id, title, tagline, description, image, materials, applications, sort_order) values
('a0000000-0000-0000-0000-000000000001', 'Kanopi & Atap Besi Custom', 'Rangka kokoh, tidak berisik saat hujan, dan anti bocor.', 'Pembuatan kanopi carport, teras, dan atap tambahan dengan rangka besi hollow atau baja ringan. Kaki kanopi ditanam kuat ke struktur, atap dipasang dengan lubang baut yang tepat agar tidak rembes.', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80', '["Besi Hollow Galvanis","Baja Ringan / Baja WF","Atap Spandek, Alderon, atau Solarflat"]'::jsonb, '["Kanopi Carport Rumah","Atap Teras & Gudang","Kanopi Depan Toko"]'::jsonb, 1),
('a0000000-0000-0000-0000-000000000002', 'Pagar, Teralis & Jendela Besi', 'Keamanan ekstra tanpa bikin rumah terasa sempit.', 'Pagar halaman, teralis jendela, dan pintu besi dengan desain klasik maupun minimalis. Sambungan las digrounding rata lalu dicat anti karat agar awet bertahun-tahun.', 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80', '["Besi Hollow & Besi Kotak","Pipa Baja","Cat Besi Anti Karat / Cat Duco"]'::jsonb, '["Pagar Halaman Rumah","Teralis Jendela & Pintu","Sekat & Kanopi Toko"]'::jsonb, 2),
('a0000000-0000-0000-0000-000000000003', 'Gerbang & Pintu Lipat Besi', 'Gerakannya halus, kokoh, dan mudah dirawat.', 'Fabrikasi gerbang pagar utama, pintu lipat garasi, dan pintu geser besi. Roda bearing dan rel dipilih yang kuat supaya tetap enteng dibuka walau ukuran besar.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', '["Hollow Galvanis Tebal","Plat Besi","Rel & Roda Bearing Heavy Duty"]'::jsonb, '["Gerbang Halaman & Gang","Pintu Lipat Garasi/Ruko","Pintu Geser Otomatis/Manual"]'::jsonb, 3),
('a0000000-0000-0000-0000-000000000004', 'Rak Besi & Furniture Besi Custom', 'Ukuran sesuai kebutuhan, beban dijamin kuat.', 'Rak toko dan gudang, meja kerja besi, frame meja kayu solid, hingga kusen dan kanopi mini. Semua dibuat custom sesuai ukuran tempat Anda.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80', '["Besi Hollow Galvanis","Besi Siku / Unikoma","Multiplex & Plat Bordes"]'::jsonb, '["Rak Toko & Gudang","Meja Kerja Bengkel/Dapur","Frame Meja & Kursi Besi"]'::jsonb, 4),
('a0000000-0000-0000-0000-000000000005', 'Custom Motor & Kendaraan', 'Knalpot, sasis, bumper dikerjakan presisi.', 'Modifikasi rangka motor custom (chopper, cafe racer, vespa), knalpot custom, bumper dan rollbar mobil/pickup. Dikerjakan teliti agar pas dan aman dipakai harian.', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80', '["Pipa Besi & Stainless","Hollow Tipis 0.8-1.2mm","Plat Baja"]'::jsonb, '["Knalpot Custom Motor","Sasis & Rangka Motor Custom","Bumper / Rollbar Mobil"]'::jsonb, 5),
('a0000000-0000-0000-0000-000000000006', 'Pengecatan & Finishing Besi', 'Cat rapi menempel kuat, tidak mudah mengelupas.', 'Jasa pengecatan besi baru maupun repaint pagar/gerbang lama: pembersihan karat, cat dasar anti karat, hingga cat akhir duco atau powder coating sesuai budget.', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80', '["Cat Dasar Anti Karat","Cat Duco / Cat Semprot","Powder Coating"]'::jsonb, '["Repaint Pagar & Teralis Lama","Finishing Hasil Las Baru","Cat Kanopi & Rak Besi"]'::jsonb, 6)
on conflict (id) do update set
  title = excluded.title, tagline = excluded.tagline, description = excluded.description,
  image = excluded.image, materials = excluded.materials, applications = excluded.applications,
  sort_order = excluded.sort_order;

-- Projects
insert into projects (id, title, category, category_label, image, location, year, material, description, highlight, sort_order) values
('b0000000-0000-0000-0000-000000000001', 'Kanopi Carport Rangka Hollow', 'architectural', 'Kanopi & Atap', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80', 'Kaliwungu, Semarang', '2025', 'Hollow Galvanis 4x4 + Atap Alderon', 'Kanopi carport 3x5 meter dengan rangka hollow galvanis dan kaki yang ditanam ke cor beton. Kemiringan atap dihitung agar air hujan tidak menggenang.', 'Rangka dicat dasar anti karat sebelum pemasangan atap.', 1),
('b0000000-0000-0000-0000-000000000002', 'Gerbang Pagar Utama & Pintu Lipat', 'architectural', 'Gerbang & Pintu', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', 'Kota Semarang', '2025', 'Hollow Galvanis + Plat Besi + Rel Bearing', 'Gerbang halaman satu pintu plus pintu lipat garasi. Roda bearing heavy duty membuat gerbang besar tetap ringan digeser satu tangan.', 'Finishing cat duco warna hitam doff, tahan cuaca.', 2),
('b0000000-0000-0000-0000-000000000003', 'Teralis Jendela & Pagar Rumah Minimalis', 'architectural', 'Pagar & Teralis', 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1000&q=80', 'Kendal, Jawa Tengah', '2024', 'Besi Hollow & Besi Kotak Solid', 'Teralis jendela motif garis minimalis untuk rumah tinggal 2 lantai, termasuk pagar samping halaman. Semua sambungan digrounding rata sebelum dicat.', 'Tidak ada ujung las kasar, aman untuk anak kecil.', 3),
('b0000000-0000-0000-0000-000000000004', 'Rak Display Toko Bangunan', 'structural', 'Rak Besi', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80', 'Semarang', '2024', 'Hollow Galvanis 4x4 + Multiplex 18mm', 'Rak display 3 tingkat sepanjang 6 meter untuk toko bangunan. Rangka dirancang kuat menahan beban semen dan cat per lapis rak.', 'Uji beban manual dengan duduk beramai-ramai sebelum serah terima.', 4),
('b0000000-0000-0000-0000-000000000005', 'Knalpot Custom & Rangka Motor Chopper', 'automotive', 'Custom Kendaraan', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80', 'Ungaran, Semarang', '2024', 'Pipa Baja Seamless 1.2mm', 'Fabrikasi knalpot custom dan modifikasi rangka motor chopper. Sambungan dilas penuh lalu diasah halus sebelum finishing chrome/cat.', 'Suarakan mantap tanpa bocor di sambungan.', 5),
('b0000000-0000-0000-0000-000000000006', 'Truss Atap Gudang Bengkel', 'structural', 'Struktur Baja', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80', 'Kaliwungu, Semarang', '2023', 'Baja WF & Hollow Galvanis', 'Rangka atap gudang bentang lebar dengan truss baja. Fabrikasi di workshop lalu dirakit langsung di lokasi agar pemasangan cepat.', 'Selesai dalam 20 hari kerja termasuk pengecatan.', 6)
on conflict (id) do update set
  title = excluded.title, category = excluded.category, category_label = excluded.category_label,
  image = excluded.image, location = excluded.location, year = excluded.year,
  material = excluded.material, description = excluded.description, highlight = excluded.highlight,
  sort_order = excluded.sort_order;

-- Testimonials
insert into testimonials (id, name, role, location, comment, project, sort_order) values
('c0000000-0000-0000-0000-000000000001', 'Ir. Hendrik Gunawan', 'Kontraktor Bangunan', 'Semarang', 'Mas Danang sangat teliti dalam urusan sambungan baja. Saat inspeksi, hasil pengelasannya rapi, tebalnya merata, dan pengerjaannya tepat waktu sesuai jadwal proyek.', 'Truss Atap Gudang Kaliwungu', 1),
('c0000000-0000-0000-0000-000000000002', 'Bimo Wicaksono', 'Pecinta Motor Custom', 'Ungaran', 'Susah cari tukang las yang paham rangka motor custom dan knalpot. Sambungan lasnya rapi sekali seperti koin bertumpuk, dan tidak perlu diulang.', 'Knalpot & Rangka Chopper', 2),
('c0000000-0000-0000-0000-000000000003', 'Diana Paramitha', 'Ibu Rumah Tangga', 'Kendal', 'Gerbang dan teralis rumah kami dikerjakan dengan sempurna. Tidak ada sambungan yang kasar dan catnya sangat mulus, tetap bagus setelah setahun lebih.', 'Gerbang & Teralis Rumah', 3)
on conflict (id) do update set
  name = excluded.name, role = excluded.role, location = excluded.location,
  comment = excluded.comment, project = excluded.project, sort_order = excluded.sort_order;

-- FAQs
insert into faqs (id, question, answer, sort_order) values
('d0000000-0000-0000-0000-000000000001', 'Apakah melayani pekerjaan las panggilan ke lokasi?', 'Ya, kami memiliki peralatan las portabel dan melayani panggilan ke lokasi: perbaikan gerbang/pagar, pemasangan kanopi, sampai las darurat di area Kaliwungu, Kendal, Kota Semarang, Ungaran dan sekitarnya.', 1),
('d0000000-0000-0000-0000-000000000002', 'Berapa lama estimasi waktu pengerjaan?', 'Tergantung volume dan tingkat kerumitan. Pagar atau teralis biasanya membutuhkan waktu 3-7 hari kerja (fabrikasi workshop + 1-2 hari instalasi di lokasi). Kanopi berkisar 5-10 hari kerja.', 2),
('d0000000-0000-0000-0000-000000000003', 'Apakah ada garansi hasil pekerjaan?', 'Kami memberikan garansi pengerjaan. Jika timbul masalah pada titik las dalam pemakaian normal, kami perbaiki tanpa biaya tambahan.', 3),
('d0000000-0000-0000-0000-000000000004', 'Bagaimana cara mendapatkan estimasi biaya yang akurat?', 'Anda cukup mengirimkan foto lokasi, perkiraan ukuran (panjang x lebar), atau gambar desain via WhatsApp. Kami akan menghitungkan rincian kebutuhan material dan biaya secara gratis.', 4)
on conflict (id) do update set
  question = excluded.question, answer = excluded.answer, sort_order = excluded.sort_order;

-- Calculator (single row)
insert into calculator (id, projects, materials, install_pct, min_install, range_low, range_high) values
('00000000-0000-0000-0000-000000000002',
'[{"id":"kanopi","name":"Kanopi / Atap Besi Custom","shortName":"Kanopi","unit":"m²","defaultQty":15,"basePrice":950000},{"id":"teralis","name":"Teralis / Pagar / Railing","shortName":"Teralis","unit":"meter","defaultQty":8,"basePrice":650000},{"id":"gerbang","name":"Gerbang / Pintu Lipat Besi","shortName":"Gerbang","unit":"unit","defaultQty":1,"basePrice":3500000},{"id":"rak","name":"Rak Besi / Furniture Besi","shortName":"Rak Besi","unit":"unit","defaultQty":1,"basePrice":1500000},{"id":"custom","name":"Custom Motor / Kendaraan","shortName":"Custom Motor","unit":"unit","defaultQty":1,"basePrice":2800000},{"id":"onsite","name":"Jasa Las Panggilan (Ke Lokasi)","shortName":"Las Panggilan","unit":"hari","defaultQty":1,"basePrice":600000}]'::jsonb,
'[{"id":"hitam","label":"Besi Hitam","fullLabel":"Besi Hitam / Hollow Biasa","mult":0.9},{"id":"galvanis","label":"Galvanis","fullLabel":"Besi Hollow Galvanis SNI","mult":1.0},{"id":"wf","label":"Baja WF","fullLabel":"Baja WF / H-Beam SNI","mult":1.25},{"id":"sus304","label":"Stainless","fullLabel":"Stainless Steel SUS304","mult":1.6}]'::jsonb,
0.1, 500000, 0.9, 1.15)
on conflict (id) do update set
  projects = excluded.projects, materials = excluded.materials,
  install_pct = excluded.install_pct, min_install = excluded.min_install,
  range_low = excluded.range_low, range_high = excluded.range_high;

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table profile enable row level security;
alter table settings enable row level security;
alter table services enable row level security;
alter table projects enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table calculator enable row level security;

drop policy if exists "Public read profile" on profile;
drop policy if exists "Public read settings" on settings;
drop policy if exists "Public read services" on services;
drop policy if exists "Public read projects" on projects;
drop policy if exists "Public read testimonials" on testimonials;
drop policy if exists "Public read faqs" on faqs;
drop policy if exists "Public read calculator" on calculator;

drop policy if exists "Anon all profile" on profile;
drop policy if exists "Anon all settings" on settings;
drop policy if exists "Anon all services" on services;
drop policy if exists "Anon all projects" on projects;
drop policy if exists "Anon all testimonials" on testimonials;
drop policy if exists "Anon all faqs" on faqs;
drop policy if exists "Anon all calculator" on calculator;

create policy "Public read profile" on profile for select using (true);
create policy "Public read settings" on settings for select using (true);
create policy "Public read services" on services for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Public read faqs" on faqs for select using (true);
create policy "Public read calculator" on calculator for select using (true);

create policy "Anon all profile" on profile for all using (true);
create policy "Anon all settings" on settings for all using (true);
create policy "Anon all services" on services for all using (true);
create policy "Anon all projects" on projects for all using (true);
create policy "Anon all testimonials" on testimonials for all using (true);
create policy "Anon all faqs" on faqs for all using (true);
create policy "Anon all calculator" on calculator for all using (true);

-- Storage
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;
drop policy if exists "Public read storage" on storage.objects;
drop policy if exists "Anon all storage" on storage.objects;

create policy "Public read storage" on storage.objects for select using (bucket_id = 'images');
create policy "Anon all storage" on storage.objects for all using (bucket_id = 'images');
