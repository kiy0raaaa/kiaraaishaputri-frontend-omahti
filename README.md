# OmahFE Landing Page

Website landing page untuk **OmahFE**, dibuat dari desain Figma menggunakan HTML, CSS, dan JavaScript biasa (tanpa framework).

Dibuat oleh **Kiara Aisha Putri**.

## Fitur / Bagian Halaman

- **Navbar**: menu navigasi (About, Portfolio, Testimonial, FAQ, Contact) dan tombol Sign In / Sign Up. Navbar nempel di atas saat di-scroll.
- **Landing Page**: judul, deskripsi singkat, gambar, dan ikon sosial media.
- **Tentang Kami**: penjelasan singkat OmahFE beserta angka tahun berdiri dan total project.
- **Portofolio**: kartu portofolio dengan tombol **Show More / Show Less** untuk menampilkan atau menyembunyikan kartu tambahan.
- **Testimoni**: 4 kartu testimoni.
- **FAQ**: pertanyaan yang bisa dibuka-tutup (pakai tag `<details>`).
- **Contact**: form kontak (nama, email, pesan).
- **Footer**: alamat, link navigasi, dan ikon sosial media.

## Teknologi

- HTML5
- CSS3 (Flexbox dan Grid)
- JavaScript (untuk tombol Show More / Show Less)
- Font: Inter, Scotch, dan Mystery Quest

## Struktur Folder

```
.
├── index.html
├── style.css
├── script.js
└── assets/
    ├── fonts/
    ├── icons/
    └── images/
```

## Cara Menjalankan

1. Clone repository ini:
   ```bash
   git clone https://github.com/kiy0raaaa/kiaraaishaputri-frontend-omahti.git
   ```
2. Masuk ke folder project:
   ```bash
   cd kiaraaishaputri-frontend-omahti
   ```
3. Buka file `index.html` di browser.

Atau pakai ekstensi **Live Server** di VS Code supaya halaman otomatis refresh saat ada perubahan.

## Catatan

- Pastikan folder `assets` (font, gambar, ikon) ikut ada, kalau tidak tampilannya bakal berantakan.
- Fitur Show More / Show Less ada di `script.js`. Tombolnya mengubah class `hidden` pada kartu portofolio dan memutar ikon panah.

## Desain

Desain mengacu pada file Figma OmahFE.