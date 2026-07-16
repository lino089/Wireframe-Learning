"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { roomStatus } from "@/data/dummy"
import { CalendarIcon, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BookingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulasi request
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Booking berhasil dikirim", {
        description: "Permohonan booking ruangan Anda sedang menunggu persetujuan Admin.",
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Form Peminjaman Ruangan</h2>
        <p className="text-slate-500">
          Silakan lengkapi formulir di bawah ini untuk mengajukan permohonan penggunaan ruangan.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Peminjaman</CardTitle>
          <CardDescription>Semua kolom bertanda * wajib diisi.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roomName">Ruangan <span className="text-red-500">*</span></Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Ruangan" />
                </SelectTrigger>
                <SelectContent>
                  {roomStatus.map(r => (
                    <SelectItem key={r.name} value={r.name}>{r.name} ({r.capacity} org)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventName">Nama Kegiatan <span className="text-red-500">*</span></Label>
              <Input id="eventName" required placeholder="Contoh: Rapat Koordinasi Guru" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Tanggal <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="date" id="eventDate" required className="pl-10" />
                  <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventTime">Waktu <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="text" id="eventTime" required placeholder="08:00 - 12:00" className="pl-10" />
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facilities">Kebutuhan Fasilitas Tambahan</Label>
              <Textarea 
                id="facilities" 
                placeholder="Misal: Tambahan 10 kursi, 2 mic wireless" 
                className="resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi / Tujuan Kegiatan</Label>
              <Textarea 
                id="description" 
                placeholder="Jelaskan secara singkat tujuan kegiatan ini diadakan" 
                className="resize-none h-24"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-4 border-t">
              <Button variant="outline" type="button" onClick={() => router.back()}>Batal</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim Permohonan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
