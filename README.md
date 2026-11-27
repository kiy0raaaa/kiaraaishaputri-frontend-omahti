# OmahFE - Slicing Web dari Figma

Penugasan Open Recruitment Frontend OmahTI UGM 2026/2027. Website landing page OmahFE yang dibuat dari desain Figma menggunakan vanilla HTML, CSS, dan JavaScript (tanpa framework atau library UI).

## Identitas Diri

- **Nama**: Kiara Aisha Putri
- **NIM**: 26/577981/PA/24208
- **Program Studi**: Ilmu Komputer, FMIPA Universitas Gadjah Mada
- **Repository**: https://github.com/kiy0raaaa/kiaraaishaputri-frontend-omahti

## Struktur Repository

```
kiaraaishaputri-frontend-omahti/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── fonts/
    ├── images/
    └── icons/
```

## Isi Halaman

Navbar, Landing Page, Tentang Kami, Portofolio, Testimoni, FAQ, Contact, dan Footer. Font yang dipakai: Mystery Quest, Inter, dan Scotch Text Compressed. Tag HTML yang dipakai antara lain `header`, `nav`, `main`, `section`, `footer`, `details`/`summary`, `dialog`, dan `form` dengan `label`.

## Fitur Opsional yang Dikerjakan

- **Desain responsif** dengan breakpoint 1024px, 768px, dan 480px. Di layar kecil navbar berubah jadi hamburger menu.
- **Show More / Show Less** di portofolio, dengan ikon panah yang ikut berputar.
- **Carousel testimoni** dengan tombol panah kiri dan kanan. Kartu berputar: kartu paling kiri pindah ke belakang saat klik kanan, dan sebaliknya.
- **FAQ accordion** memakai `<details>` dengan animasi buka-tutup dan ikon yang berputar.
- **Modal Sign In dan Sign Up** (elemen `<dialog>`) dengan validasi di sisi front-end: email valid, password minimal 8 karakter, dan konfirmasi password harus sama. Data tidak dikirim ke server dan tidak disimpan.
- **Validasi form Contact**: field wajib diisi dan format email dicek, lengkap dengan pesan error dan pesan sukses.
- **Animasi** muncul saat di-scroll dan efek hover, dengan dukungan `prefers-reduced-motion`.
- **Navigasi**: smooth scroll dan link navbar yang menandai section yang sedang dilihat.

## Penggunaan AI

Saya memakai AI sebagai bantuan dalam pengerjaan, dengan rincian:

- **Claude (Anthropic)**: memperbaiki layout kartu portofolio yang tersembunyi agar mengikuti grid, mencari penyebab ikon panah Show More yang tidak berputar, membuat carousel testimoni yang bergeser, dan menganalisis penyebab alur kode dan layout CSS yang tidak sesuai (layout shift, gambar yang menumpuk vertikal, ikon panah testimoni tidak bisa dipencet, dan lainnya).
- **Google Gemini**: penyesuaian layout Contact Form (proporsi 0.8:1.2 & posisi tombol Send), debugging CSS flex-wrap pada portofolio, pembuatan struktur HTML/CSS Footer.

Semua kode sudah saya baca, saya uji di browser, dan saya sesuaikan sendiri.

## Cara Menjalankan

1. Clone repository:
   ```bash
   git clone https://github.com/kiy0raaaa/kiaraaishaputri-frontend-omahti.git
   ```
2. Masuk ke folder project:
   ```bash
   cd kiaraaishaputri-frontend-omahti
   ```
3. Buka `index.html` di browser, atau jalankan dengan Live Server di VS Code.
