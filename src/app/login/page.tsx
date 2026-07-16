"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("admin")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulasi Login
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Login Berhasil", {
        description: `Masuk sebagai: ${role.toUpperCase()}`,
      })
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Masuk ke Sistem</CardTitle>
          <CardDescription>
            Pilih simulasi peran Anda untuk mencoba prototipe ekosistem sekolah.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Masuk Sebagai (Simulasi Role) <span className="text-red-500">*</span></Label>
              <Select defaultValue={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin / Wakasek</SelectItem>
                  <SelectItem value="kepsek">Kepala Sekolah</SelectItem>
                  <SelectItem value="guru">Guru</SelectItem>
                  <SelectItem value="organisasi">Siswa / Organisasi</SelectItem>
                  <SelectItem value="teknisi">Teknisi / PJ Ruangan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Sembarang)</Label>
              <Input id="email" type="email" placeholder="nama@sekolah.sch.id" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi (Sembarang)</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center">
          <p className="text-xs text-slate-500">
            Ini adalah prototype sistem. Anda tidak memerlukan akun asli untuk masuk.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
