"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { statCards, upcomingAgenda, roomStatus, activityLogs } from "@/data/dummy"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts"
import { motion } from "framer-motion"
import { Sparkles, Calendar, ArrowRight, ArrowUpRight, Cpu, Clock, CheckCircle2, AlertTriangle, Hammer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const chartData = [
  { name: "Sen", usage: 65 },
  { name: "Sel", usage: 80 },
  { name: "Rab", usage: 85 },
  { name: "Kam", usage: 70 },
  { name: "Jum", usage: 90 },
  { name: "Sab", usage: 30 },
  { name: "Min", usage: 10 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 md:p-8 rounded-2xl border border-slate-800 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight">Selamat Pagi, Budi!</h2>
          <p className="text-slate-300 text-sm max-w-xl">
            Sistem ekosistem sekolah terpantau kondusif. Agenda hari ini berjalan sesuai rencana dan semua sistem pemeliharaan aktif.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          <Link href="/dashboard/booking">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20">
              <Calendar className="mr-2 h-4 w-4" /> Booking Ruangan
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Grid Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat, idx) => {
          let icon = <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          if (stat.title === "Laporan Kerusakan") icon = <AlertTriangle className="h-4 w-4 text-rose-500" />
          if (stat.title === "Booking Pending") icon = <Hammer className="h-4 w-4 text-amber-500" />

          return (
            <Card key={stat.title} className="border-slate-200/80 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                {icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-slate-800">{stat.value}</div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Smart School Overview & Charts */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">Smart School Overview</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Statistik intensitas penggunaan ruangan sepanjang minggu.
              </CardDescription>
            </div>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-200 font-semibold text-xs">
              Live Update
            </Badge>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsage)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Placeholder & Room Availability */}
        <div className="col-span-3 space-y-6">
          {/* AI Assistant Card */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm rounded-2xl relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-blue-100/40 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Sparkles className="text-white h-4.5 w-4.5" />
                </div>
                <CardTitle className="text-sm font-bold text-slate-800">School Assistant AI</CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-600 font-medium">
                Tanya jadwal, analisis ketersediaan ruangan, atau buat agenda baru secara otomatis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-sm">
                &ldquo;Ruang Rapat Utama kosong hari ini pukul 13:00 - 15:00. Apakah ingin dijadwalkan rapat?&rdquo;
              </div>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold">
                Tanya AI Assistant <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>

          {/* Room status simplified */}
          <Card className="border-slate-200/80 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Kondisi Fasilitas Ruangan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {roomStatus.slice(0, 3).map((room) => (
                <div key={room.name} className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800">{room.name}</p>
                    <p className="text-slate-500 font-medium">Kapasitas: {room.capacity} org</p>
                  </div>
                  <Badge 
                    variant={room.status === "Tersedia" ? "default" : room.status === "Digunakan" ? "secondary" : "destructive"}
                    className={`rounded-full px-2.5 py-0.5 font-semibold text-[10px] ${
                      room.status === "Tersedia" ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50" : ""
                    }`}
                  >
                    {room.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Activity Timeline & Upcoming Agenda */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        {/* Activity Timeline */}
        <Card className="border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Aktivitas Terbaru</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Log aktivitas ekosistem sekolah secara real-time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
              {activityLogs.map((log) => (
                <div key={log.id} className="relative">
                  <div className="absolute -left-[31px] top-0 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-white"></div>
                  <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-slate-800">{log.text}</p>
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Agenda */}
        <Card className="border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Agenda Mendatang</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Jadwal kegiatan sekolah terdekat yang telah disetujui.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAgenda.map((agenda) => (
              <div 
                key={agenda.id} 
                className="flex items-center justify-between border border-slate-100 p-4 rounded-xl hover:border-slate-200/80 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-800">{agenda.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{agenda.date} • {agenda.time}</p>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">📍 {agenda.room}</p>
                </div>
                <Badge 
                  variant={agenda.status === "Approved" ? "default" : "outline"} 
                  className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
                    agenda.status === "Approved" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50" 
                      : "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {agenda.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
