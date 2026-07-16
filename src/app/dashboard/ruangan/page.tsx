"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Info } from "lucide-react"
import Link from "next/link"

const rooms = [
  { id: 1, name: "Ruang Rapat Utama", capacity: 50, status: "Tersedia", facilities: ["Proyektor", "AC", "Sound System"], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=250" },
  { id: 2, name: "Aula Sekolah", capacity: 300, status: "Digunakan", facilities: ["Panggung", "Sound System", "AC Sentral"], image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400&h=250" },
  { id: 3, name: "Lab Komputer 1", capacity: 40, status: "Perbaikan", facilities: ["40 PC", "AC", "Proyektor", "Internet LAN"], image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400&h=250" },
  { id: 4, name: "Lab IPA", capacity: 40, status: "Tersedia", facilities: ["Peralatan Lab", "Wastafel", "AC"], image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400&h=250" },
  { id: 5, name: "Perpustakaan", capacity: 100, status: "Tersedia", facilities: ["Buku", "AC", "Meja Belajar", "WiFi"], image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400&h=250" },
  { id: 6, name: "Lapangan Indoor", capacity: 500, status: "Tersedia", facilities: ["Tribun", "Lampu Gantung", "Ruang Ganti"], image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&q=80&w=400&h=250" },
];

export default function RuanganPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar Ruangan</h2>
          <p className="text-slate-500">
            Lihat ketersediaan ruangan dan fasilitas yang ada.
          </p>
        </div>
        <Link href="/dashboard/booking">
          <Button>Booking Ruangan</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full relative bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.image} alt={room.name} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2">
                <Badge 
                  variant={room.status === "Tersedia" ? "default" : room.status === "Digunakan" ? "secondary" : "destructive"}
                  className={room.status === "Tersedia" ? "bg-emerald-500" : ""}
                >
                  {room.status}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users className="h-4 w-4" />
                <span>Kapasitas: {room.capacity} orang</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Fasilitas:</p>
                <div className="flex flex-wrap gap-1">
                  {room.facilities.map(f => (
                    <Badge key={f} variant="outline" className="text-xs bg-slate-50">{f}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <Link href={`/dashboard/ruangan/${room.id}`} className="w-full">
                <Button variant="secondary" className="w-full gap-2">
                  <Info className="h-4 w-4" /> Detail Ruangan
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
