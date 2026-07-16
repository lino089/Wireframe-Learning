export const statCards = [
  {
    title: "Total Ruangan",
    value: "15",
    description: "Ruangan terdaftar",
  },
  {
    title: "Agenda Hari Ini",
    value: "3",
    description: "Kegiatan berlangsung",
  },
  {
    title: "Agenda Bulan Ini",
    value: "24",
    description: "Total kegiatan bulan ini",
  },
  {
    title: "Booking Pending",
    value: "5",
    description: "Menunggu persetujuan",
  },
  {
    title: "Laporan Kerusakan",
    value: "2",
    description: "Belum ditangani",
  },
];

export const upcomingAgenda = [
  {
    id: 1,
    title: "Rapat Paripurna Guru",
    date: "2026-07-20",
    time: "08:00 - 12:00",
    room: "Ruang Rapat Utama",
    status: "Approved",
  },
  {
    id: 2,
    title: "Ekstrakurikuler Robotik",
    date: "2026-07-21",
    time: "15:00 - 17:00",
    room: "Lab Komputer 1",
    status: "Approved",
  },
  {
    id: 3,
    title: "Persiapan Lomba Olimpiade",
    date: "2026-07-22",
    time: "10:00 - 14:00",
    room: "Perpustakaan",
    status: "Pending",
  },
];

export const roomStatus = [
  { name: "Ruang Rapat Utama", status: "Tersedia", capacity: 50 },
  { name: "Aula Sekolah", status: "Digunakan", capacity: 300 },
  { name: "Lab Komputer 1", status: "Perbaikan", capacity: 40 },
  { name: "Lab IPA", status: "Tersedia", capacity: 40 },
];

export const laporanKerusakan = [
  {
    id: 1,
    room: "Lab Komputer 1",
    facility: "AC LG 2 PK",
    severity: "Sedang",
    description: "AC tidak dingin dan mengeluarkan suara bising di sudut kanan ruangan.",
    status: "Diproses",
    progress: 65,
    reporter: "Guru Budi",
    date: "2026-07-15",
    technician: "Ahmad",
    image: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=400&h=300",
    timeline: [
      { date: "15 Juli, 09:00", text: "Laporan dibuat oleh Guru Budi" },
      { date: "16 Juli, 08:30", text: "Teknisi Ahmad menerima laporan dan mulai memeriksa" },
      { date: "17 Juli, 10:00", text: "Perbaikan kompresor sedang berlangsung" }
    ]
  },
  {
    id: 2,
    room: "Ruang Kelas 10A",
    facility: "Proyektor Epson",
    severity: "Berat",
    description: "Lampu proyektor mati total saat dinyalakan, tidak memancarkan cahaya sama sekali.",
    status: "Menunggu",
    progress: 0,
    reporter: "Siti Aminah",
    date: "2026-07-16",
    technician: "-",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400&h=300",
    timeline: [
      { date: "16 Juli, 14:00", text: "Laporan dibuat oleh Siti Aminah" }
    ]
  },
  {
    id: 3,
    room: "Toilet Gedung B",
    facility: "Wastafel Toto",
    severity: "Ringan",
    description: "Keran wastafel bocor meneteskan air terus menerus meskipun sudah ditutup rapat.",
    status: "Selesai",
    progress: 100,
    reporter: "Ahmad Staff",
    date: "2026-07-10",
    technician: "Yusuf",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300",
    timeline: [
      { date: "10 Juli, 08:00", text: "Laporan dibuat oleh Ahmad Staff" },
      { date: "10 Juli, 11:00", text: "Teknisi Yusuf ditugaskan untuk memperbaiki" },
      { date: "10 Juli, 15:30", text: "Penggantian katup keran selesai. Wastafel berfungsi normal kembali" }
    ]
  },
];

export const activityLogs = [
  { id: 1, text: "Guru Budi memesan Lab Komputer 1", time: "10 menit yang lalu" },
  { id: 2, text: "Teknisi Ahmad memperbarui progres AC Lab Komputer menjadi 65%", time: "1 jam yang lalu" },
  { id: 3, text: "Wakasek menyetujui peminjaman Ruang Rapat Utama", time: "2 jam yang lalu" },
  { id: 4, text: "Siti Aminah membuat laporan kerusakan Proyektor Ruang Kelas 10A", time: "3 jam yang lalu" },
  { id: 5, text: "Teknisi Yusuf menyelesaikan perbaikan Wastafel Toilet Gedung B", time: "1 hari yang lalu" }
];
