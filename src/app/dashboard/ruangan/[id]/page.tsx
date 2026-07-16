"use client"

import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

const rooms = [
  { id: "1", name: "Ruang Rapat Utama", capacity: 50, status: "Tersedia", facilities: ["Proyektor", "AC", "Sound System", "Whiteboard", "Kursi Eksekutif"], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=400", description: "Ruang rapat utama yang biasanya digunakan untuk pertemuan komite sekolah, rapat guru mingguan, dan penyambutan tamu dinas. Dilengkapi dengan fasilitas modern untuk presentasi." },
  { id: "2", name: "Aula Sekolah", capacity: 300, status: "Digunakan", facilities: ["Panggung", "Sound System", "AC Sentral", "Lighting"], image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200&h=400", description: "Aula multifungsi untuk kegiatan berskala besar seperti seminar, pentas seni, dan perpisahan." },
];

export default function DetailRuanganPage() {
  const params = useParams()
  const roomId = params.id as string
  
  // Ambil data ruangan dari dummy data, default ke index 0 jika tidak ketemu
  const room = rooms.find(r => r.id === roomId) || rooms[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/ruangan">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Detail Ruangan</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-[21/9] w-full relative bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.image} alt={room.name} className="object-cover w-full h-full" />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={room.status === "Tersedia" ? "default" : room.status === "Digunakan" ? "secondary" : "destructive"}
                  className={`text-sm px-3 py-1 ${room.status === "Tersedia" ? "bg-emerald-500" : ""}`}
                >
                  {room.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Kapasitas: {room.capacity} orang</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Lantai 2, Gedung A</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {room.description}
              </p>
              <h3 className="text-lg font-semibold mb-3">Fasilitas Tersedia</h3>
              <div className="flex flex-wrap gap-2">
                {room.facilities.map(f => (
                  <Badge key={f} variant="secondary" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100">{f}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tindakan</h3>
              <Link href="/dashboard/booking" className="w-full">
                <Button className="w-full mb-3" size="lg" disabled={room.status !== "Tersedia"}>
                  <Calendar className="mr-2 h-4 w-4" /> Booking Sekarang
                </Button>
              </Link>
              {room.status !== "Tersedia" && (
                <p className="text-xs text-center text-amber-600 font-medium">Ruangan saat ini sedang tidak tersedia untuk dibooking.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Agenda Mendatang di Ruangan Ini</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium text-sm">Rapat Komite Sekolah</p>
                  <p className="text-xs text-slate-500 mt-1">Besok, 09:00 - 11:00</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-3">
                  <p className="font-medium text-sm">Penyambutan Tamu Dinas</p>
                  <p className="text-xs text-slate-500 mt-1">Senin Depan, 10:00 - 12:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
