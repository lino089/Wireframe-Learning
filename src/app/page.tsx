import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, LayoutDashboard, Settings2, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            Prototype v1.0 - Modul Agenda & Ruangan
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Satu Platform untuk <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Seluruh Aktivitas Sekolah
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Kelola agenda, peminjaman ruangan, hingga pelaporan fasilitas sekolah dengan lebih mudah, terpusat, dan terintegrasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
                Masuk ke Sistem <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#fitur">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-slate-100">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistik Section */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900">20+</p>
              <p className="text-sm font-medium text-slate-500 mt-2">Pengguna Aktif</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900">15</p>
              <p className="text-sm font-medium text-slate-500 mt-2">Ruangan Fasilitas</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900">50+</p>
              <p className="text-sm font-medium text-slate-500 mt-2">Agenda Tercatat</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900">8</p>
              <p className="text-sm font-medium text-slate-500 mt-2">Organisasi Sekolah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section id="fitur" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mendukung Berbagai Kebutuhan Sekolah</h2>
            <p className="text-lg text-slate-600">
              Modul lengkap yang dirancang khusus untuk mengoptimalkan manajemen dan koordinasi ekosistem sekolah modern.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-6 w-6 text-blue-600" />}
              title="Manajemen Agenda"
              description="Kelola dan pantau seluruh agenda sekolah dalam satu kalender terpadu."
            />
            <FeatureCard 
              icon={<LayoutDashboard className="h-6 w-6 text-indigo-600" />}
              title="Peminjaman Ruangan"
              description="Booking ruangan dengan sistem persetujuan berjenjang yang transparan."
            />
            <FeatureCard 
              icon={<Settings2 className="h-6 w-6 text-emerald-600" />}
              title="Laporan Kerusakan"
              description="Laporkan dan pantau perbaikan fasilitas sekolah secara real-time."
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6 text-purple-600" />}
              title="Komunitas Organisasi"
              description="Pusat aktivitas ekstrakurikuler dan organisasi sekolah. (Akan datang)"
            />
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6 text-orange-600" />}
              title="E-Learning & CBT"
              description="Platform pembelajaran dan ujian berbasis komputer terintegrasi. (Akan datang)"
            />
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Antarmuka yang Intuitif</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Desain modern dan bersih memberikan pengalaman pengguna yang luar biasa, memastikan siapa saja dapat menggunakan sistem ini dengan mudah.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl -z-10 rounded-full transform -translate-y-1/2"></div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden aspect-[16/9] relative bg-slate-100 flex items-center justify-center">
             <div className="text-center text-slate-400">
               <LayoutDashboard className="h-16 w-16 mx-auto mb-4 opacity-50" />
               <p className="text-xl font-medium">Dashboard Preview Placeholder</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Menjelajahi Prototipe?</h2>
          <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto">
            Masuk sebagai berbagai peran pengguna (Admin, Kepala Sekolah, Guru, Siswa) dan lihat bagaimana sistem ini bekerja.
          </p>
          <Link href="/login">
            <Button size="lg" className="h-14 px-8 text-base rounded-full bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-xl shadow-white/10">
              Coba Prototipe Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-slate-400 text-sm border-t border-slate-800">
        <p>&copy; 2026 Ekosistem Sekolah. Prototype Version.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
