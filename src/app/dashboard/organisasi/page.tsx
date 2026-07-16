"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function OrganisasiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Komunitas & Organisasi</h2>
        <p className="text-slate-500">
          Modul ini akan menghubungkan berbagai aktivitas organisasi sekolah.
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-slate-400">
          <Users className="h-16 w-16 mb-4 opacity-50 text-primary" />
          <CardTitle className="text-xl font-bold text-slate-800 mb-2">Modul Komunitas & Organisasi</CardTitle>
          <CardDescription className="max-w-md">
            Halaman ini sedang dalam tahap perencanaan pengembangan sistem tahap berikutnya.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
