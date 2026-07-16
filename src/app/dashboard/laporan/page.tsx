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
import { UploadCloud } from "lucide-react"

export default function LaporanPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulasi request
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Laporan berhasil dikirim", {
        description: "Laporan kerusakan fasilitas telah diterima dan akan segera ditindaklanjuti oleh Teknisi.",
      })
      // Reset form bisa dilakukan disini
    }, 800)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Form Pelaporan Kerusakan</h2>
        <p className="text-slate-500">
          Laporkan fasilitas atau barang yang rusak agar segera ditangani oleh tim Teknisi.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Laporan</CardTitle>
          <CardDescription>Semua kolom bertanda * wajib diisi.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="room">Lokasi / Ruangan <span className="text-red-500">*</span></Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomStatus.map(r => (
                      <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>
                    ))}
                    <SelectItem value="Lainnya">Lainnya (Taman, Koridor, dll)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facility">Nama Fasilitas/Barang <span className="text-red-500">*</span></Label>
                <Input id="facility" required placeholder="Contoh: AC, Proyektor, Meja" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Tingkat Kerusakan <span className="text-red-500">*</span></Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tingkat Kerusakan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ringan">Ringan (Masih bisa digunakan sebagian)</SelectItem>
                  <SelectItem value="Sedang">Sedang (Mengganggu kenyamanan/fungsi)</SelectItem>
                  <SelectItem value="Berat">Berat (Tidak bisa digunakan sama sekali)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Kerusakan <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                required
                placeholder="Jelaskan secara detail kerusakan yang terjadi, sejak kapan, dll" 
                className="resize-none h-24"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Foto (Simulasi)</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 hover:bg-slate-50 transition-colors relative">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Upload file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">PNG, JPG up to 5MB</p>
                  {fileName && (
                    <div className="mt-4 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm inline-block">
                      File terpilih: {fileName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end border-t">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
