import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Sun, Moon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-slate-50/50">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="-ml-1 text-slate-500 hover:text-slate-900 transition-colors" />
            <Separator orientation="vertical" className="h-4 bg-slate-200" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span className="hover:text-slate-600 cursor-pointer">Sistem</span>
              <span>/</span>
              <span className="text-slate-700 font-bold">Dashboard</span>
            </div>
            
            {/* Global Search */}
            <div className="relative max-w-md w-full ml-4 hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Cari agenda, ruangan, laporan..." 
                className="pl-9 h-9 w-full bg-slate-50 border-slate-200/80 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Dark Mode Placeholder */}
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
              <Sun className="h-5 w-5" />
            </button>
            
            {/* Notification Center */}
            <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 border-2 border-white"></span>
            </button>
            
            <Separator orientation="vertical" className="h-6 bg-slate-200" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 outline-none hover:opacity-90 transition-opacity">
                  <Avatar className="h-9 w-9 ring-2 ring-slate-100 shadow-sm">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start text-xs text-left leading-none">
                    <span className="font-bold text-slate-800">Budi Santoso</span>
                    <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">Admin / Wakasek</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-lg border-slate-200">
                <DropdownMenuLabel className="text-xs text-slate-400 px-2 py-1.5 font-bold uppercase tracking-wider">Simulasi Peran</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-semibold text-blue-600 bg-blue-50/50 rounded-lg">
                  Admin / Wakasek
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Kepala Sekolah</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Guru</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Siswa / Organisasi</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Teknisi / PJ Ruangan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 font-medium rounded-lg">Keluar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
