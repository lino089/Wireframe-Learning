"use client"

import { useState, useMemo } from "react"
import { laporanKerusakan } from "@/data/dummy"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, Hammer, Clock, Wrench, Eye } from "lucide-react"

export default function TeknisiPage() {
  const [laporan, setLaporan] = useState(laporanKerusakan)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedLaporan, setSelectedLaporan] = useState<typeof laporanKerusakan[0] | null>(null)
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleStatusChange = (id: number, newStatus: string) => {
    let newProgress = 0
    if (newStatus === "Selesai") newProgress = 100
    if (newStatus === "Diproses") newProgress = 50

    const updated = laporan.map(item => {
      if (item.id === id) {
        const timestamp = new Date().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
        const updatedTimeline = [...item.timeline, { date: timestamp, text: `Status diperbarui menjadi ${newStatus}` }]
        return { ...item, status: newStatus, progress: newProgress, timeline: updatedTimeline }
      }
      return item
    })

    setLaporan(updated)
    
    // Update selected laporan if open
    if (selectedLaporan && selectedLaporan.id === id) {
      setSelectedLaporan(updated.find(item => item.id === id) || null)
    }

    toast.success("Status Laporan Diperbarui", {
      description: `Laporan kerusakan kini berstatus: ${newStatus}`,
    })
  }

  // Summary Metrics
  const summary = useMemo(() => {
    const total = laporan.length
    const menunggu = laporan.filter(l => l.status === "Menunggu").length
    const diproses = laporan.filter(l => l.status === "Diproses").length
    const selesai = laporan.filter(l => l.status === "Selesai").length
    return { total, menunggu, diproses, selesai }
  }, [laporan])

  // Filter & Search Logic
  const filteredLaporan = useMemo(() => {
    return laporan.filter(item => {
      const matchesSearch = item.facility.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesSeverity = severityFilter === "all" || item.severity === severityFilter

      return matchesSearch && matchesStatus && matchesSeverity
    })
  }, [laporan, searchTerm, statusFilter, severityFilter])

  // Pagination Logic
  const paginatedLaporan = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredLaporan.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredLaporan, currentPage])

  const totalPages = Math.ceil(filteredLaporan.length / itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Selesai": return <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 rounded-full font-bold text-[10px]">Selesai</Badge>;
      case "Diproses": return <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50 rounded-full font-bold text-[10px]">Diproses</Badge>;
      default: return <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 rounded-full font-bold text-[10px]">Menunggu</Badge>;
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "Berat": return <Badge variant="destructive" className="rounded-full font-bold text-[10px]">Berat</Badge>;
      case "Sedang": return <Badge className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-[10px]">Sedang</Badge>;
      default: return <Badge className="bg-slate-500 hover:bg-slate-600 text-white rounded-full font-bold text-[10px]">Ringan</Badge>;
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Pemeliharaan & Teknisi</h2>
        <p className="text-slate-500 mt-1">
          Monitoring perbaikan fasilitas sekolah, inventarisasi, dan penanganan kerusakan secara real-time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/80 shadow-sm rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Laporan</p>
            <p className="text-3xl font-black text-slate-800">{summary.total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
            <Wrench className="h-6 w-6 text-slate-500" />
          </div>
        </Card>

        <Card className="border-slate-200/80 shadow-sm rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Menunggu</p>
            <p className="text-3xl font-black text-slate-800">{summary.menunggu}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
            <Clock className="h-6 w-6 text-amber-500" />
          </div>
        </Card>

        <Card className="border-slate-200/80 shadow-sm rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Diproses</p>
            <p className="text-3xl font-black text-slate-800">{summary.diproses}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
            <Hammer className="h-6 w-6 text-blue-500" />
          </div>
        </Card>

        <Card className="border-slate-200/80 shadow-sm rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selesai</p>
            <p className="text-3xl font-black text-slate-800">{summary.selesai}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
        </Card>
      </div>

      {/* Visual Monitoring Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Monitoring Kerusakan Aktif</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {laporan.filter(l => l.status === "Diproses").map((item) => (
            <Card key={item.id} className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="h-40 w-full relative bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.facility} className="object-cover w-full h-full" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-blue-600 text-white rounded-full font-bold text-[10px]">
                    🔵 {item.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <h4 className="font-extrabold text-slate-800">{item.facility}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.room}</p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Progress Perbaikan</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t pt-3">
                  <div>
                    <span className="text-slate-400 font-medium block">Teknisi</span>
                    <span className="font-bold text-slate-700">{item.technician}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 text-blue-600 font-semibold" onClick={() => setSelectedLaporan(item)}>
                    Detail <Eye className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modern Data Table */}
      <Card className="border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-slate-800">Semua Laporan Kerusakan</CardTitle>
          <CardDescription className="text-xs text-slate-500">Tabel laporan kerusakan dengan filter pencarian dan opsi update status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Cari fasilitas, ruangan, deskripsi..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 bg-slate-50 border-slate-200/80 focus-visible:bg-white rounded-xl text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[130px] rounded-xl text-xs font-semibold bg-white border-slate-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Menunggu">Menunggu</SelectItem>
                  <SelectItem value="Diproses">Diproses</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="h-9 w-[130px] rounded-xl text-xs font-semibold bg-white border-slate-200">
                  <SelectValue placeholder="Prioritas" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">Semua Prioritas</SelectItem>
                  <SelectItem value="Ringan">Ringan</SelectItem>
                  <SelectItem value="Sedang">Sedang</SelectItem>
                  <SelectItem value="Berat">Berat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-bold text-xs">Tanggal</TableHead>
                  <TableHead className="font-bold text-xs">Fasilitas & Ruangan</TableHead>
                  <TableHead className="font-bold text-xs">Prioritas</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs">Progres</TableHead>
                  <TableHead className="font-bold text-xs text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLaporan.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="text-xs font-semibold text-slate-500">{item.date}</TableCell>
                    <TableCell>
                      <div className="font-bold text-sm text-slate-800">{item.facility}</div>
                      <div className="text-xs text-slate-500 font-medium">{item.room}</div>
                    </TableCell>
                    <TableCell>{getSeverityBadge(item.severity)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{item.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedLaporan(item)} className="h-8 text-slate-600 rounded-lg">
                        Lihat Detail
                      </Button>
                      <Select 
                        value={item.status} 
                        onValueChange={(value) => handleStatusChange(item.id, value)}
                      >
                        <SelectTrigger className="h-8 w-[100px] rounded-lg text-xs font-semibold inline-flex">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="Menunggu">Menunggu</SelectItem>
                          <SelectItem value="Diproses">Diproses</SelectItem>
                          <SelectItem value="Selesai">Selesai</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-2">
            <span>
              Menampilkan {paginatedLaporan.length} dari {filteredLaporan.length} laporan
            </span>
            <div className="flex items-center gap-1.5">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-lg"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>{currentPage} / {totalPages || 1}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-lg"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Laporan Drawer */}
      <Sheet open={!!selectedLaporan} onOpenChange={(open) => !open && setSelectedLaporan(null)}>
        {selectedLaporan && (
          <SheetContent className="sm:max-w-md rounded-l-2xl border-l p-6 overflow-y-auto">
            <SheetHeader className="pb-4 border-b">
              <SheetTitle className="text-xl font-extrabold text-slate-900">{selectedLaporan.facility}</SheetTitle>
              <SheetDescription className="text-xs font-medium text-slate-500">
                Detail permohonan & status perbaikan kerusakan.
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Image */}
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 border relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedLaporan.image} alt={selectedLaporan.facility} className="object-cover w-full h-full" />
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Status Saat Ini</span>
                  <div className="mt-1">{getStatusBadge(selectedLaporan.status)}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Prioritas</span>
                  <div className="mt-1">{getSeverityBadge(selectedLaporan.severity)}</div>
                </div>
              </div>

              {/* General Details */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-slate-800">Deskripsi Masalah</h4>
                  <p className="text-slate-600 mt-1.5 leading-relaxed text-xs">{selectedLaporan.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-400 uppercase">Lokasi Ruangan</h5>
                    <p className="text-slate-700 font-semibold mt-1">{selectedLaporan.room}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-400 uppercase">Dilaporkan Oleh</h5>
                    <p className="text-slate-700 font-semibold mt-1">{selectedLaporan.reporter}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <h5 className="font-bold text-slate-400 uppercase">Teknisi Penanggung Jawab</h5>
                    <p className="text-slate-700 font-semibold mt-1">{selectedLaporan.technician}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-400 uppercase">Tanggal Laporan</h5>
                    <p className="text-slate-700 font-semibold mt-1">{selectedLaporan.date}</p>
                  </div>
                </div>
              </div>

              {/* Action Dropdown inside Drawer */}
              <div className="space-y-2 border-t pt-4">
                <label className="text-xs font-bold text-slate-700">Perbarui Status Perbaikan</label>
                <Select 
                  value={selectedLaporan.status} 
                  onValueChange={(value) => handleStatusChange(selectedLaporan.id, value)}
                >
                  <SelectTrigger className="h-10 rounded-xl font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Menunggu">Menunggu</SelectItem>
                    <SelectItem value="Diproses">Diproses</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-bold text-sm text-slate-800">Timeline Perbaikan</h4>
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-4">
                  {selectedLaporan.timeline.map((step, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></div>
                      <div>
                        <span className="font-bold text-slate-800">{step.date}</span>
                        <p className="text-slate-500 font-medium mt-0.5">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}
