"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profil & Pengaturan</h2>
        <p className="text-slate-500">
          Kelola informasi profil akun Anda di sistem.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil Pengguna</CardTitle>
          <CardDescription>Informasi akun Anda saat ini.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">Ubah Foto</Button>
              <p className="text-xs text-slate-500 mt-2">Maksimal 1MB. PNG atau JPG.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input id="fullName" defaultValue="Budi Santoso, M.Pd." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nip">NIP / NIK</Label>
              <Input id="nip" defaultValue="19850412 201001 1 002" disabled />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="budi.santoso@sekolah.sch.id" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Jabatan / Peran</Label>
              <Input id="role" defaultValue="Wakasek Sarpras / Admin" disabled />
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t">
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
