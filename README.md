# OmahFE Landing Page

Website landing page untuk **OmahFE**, dibuat dari desain Figma menggunakan HTML, CSS, dan JavaScript biasa (tanpa framework).

## Identitas Diri

- **Nama**: Kiara Aisha Putri
- **NIM**: 26/577981/PA/24208

## Bagian Halaman

- **Navbar**: menu navigasi dan tombol Sign In / Sign Up
- **Landing Page**: judul, deskripsi singkat, dan gambar utama
- **Tentang Kami**: penjelasan singkat OmahFE
- **Portofolio**: kartu portofolio dengan tombol Show More / Show Less
- **Testimoni**: kartu testimoni
- **FAQ**: pertanyaan yang bisa dibuka-tutup
- **Contact**: form kontak
- **Footer**: alamat, link navigasi, dan ikon sosial media

## Fitur Opsional yang Dikerjakan

- Halaman responsif pada breakpoint 1024px, 768px, dan 480px, termasuk menu hamburger dan susunan grid yang menyesuaikan.
- Tombol **Show More / Show Less** menampilkan kartu portofolio tambahan, memperbarui label, status aksesibilitas, dan arah ikon.
- Modal **Sign In / Sign Up** dengan perpindahan form, validasi email/password, konfirmasi password, penutupan via overlay/tombol Escape, serta pesan hasil lokal. Data password tidak disimpan atau dikirim.
- Validasi inline untuk form Contact dan pesan konfirmasi saat field valid.
- FAQ menggunakan accordion native `<details>` dengan transisi visual.
- Animasi masuk viewport, hover, dan navigasi aktif/smooth scroll; gerakan dikurangi saat preferensi reduced motion aktif.

## Penggunaan AI

Saya menggunakan Claude (AI dari Anthropic) sebagai bantuan saat mengerjakan, khususnya untuk:

- Memperbaiki layout kartu portofolio yang tersembunyi (agar ikut grid dan tidak menyisakan ruang kosong)
- Mencari penyebab ikon panah pada tombol Show More / Show Less yang tidak berubah (ternyata elemen `<img>`-nya belum diberi `id`)
- Membantu menyelesaikan kode yang error jika tak kunjung terpecahkan masalahnya.

GitHub Copilot juga digunakan untuk audit kode, perbaikan temuan, desain responsif, dan implementasi fitur opsional.

Desain, struktur halaman, dan konten saya kerjakan sendiri. Kode yang dibantu AI sudah saya baca dan uji sendiri di browser.

## Teknologi

- HTML5
- CSS3 (Flexbox dan Grid)
- JavaScript
- Font: Inter, Scotch, dan Mystery Quest

## Cara Menjalankan

1. Clone repository ini:
   ```bash
   git clone https://github.com/kiy0raaaa/kiaraaishaputri-frontend-omahti.git
   ```
2. Masuk ke folder project:
   ```bash
   cd kiaraaishaputri-frontend-omahti
   ```
3. Buka file `index.html` di browser (atau pakai Live Server di VS Code).