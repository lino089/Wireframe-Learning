"use client"

import * as React from "react"
import {
  Calendar,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
  Building,
  CheckSquare,
  MessageSquare,
  User,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  navMain: [
    {
      title: "Beranda",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Manajemen Sekolah",
      items: [
        {
          title: "Kalender Agenda",
          url: "/dashboard/agenda",
          icon: Calendar,
        },
        {
          title: "Daftar Ruangan",
          url: "/dashboard/ruangan",
          icon: Building,
        },
        {
          title: "Booking Ruangan",
          url: "/dashboard/booking",
          icon: CheckSquare,
        },
        {
          title: "Approval Agenda",
          url: "/dashboard/approval",
          icon: CheckSquare,
        },
      ],
    },
    {
      title: "Pemeliharaan",
      items: [
        {
          title: "Laporan Kerusakan",
          url: "/dashboard/laporan",
          icon: Wrench,
        },
        {
          title: "Dashboard Teknisi",
          url: "/dashboard/teknisi",
          icon: Wrench,
        },
      ],
    },
    {
      title: "Komunitas",
      items: [
        {
          title: "Organisasi",
          url: "/dashboard/organisasi",
          icon: Users,
        },
        {
          title: "Forum Sekolah",
          url: "/dashboard/forum",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Sistem",
      items: [
        {
          title: "Pengaturan",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200/80 bg-white" {...props}>
      <SidebarHeader className="h-18 border-b border-slate-100 flex items-center px-4">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl w-full">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <GraduationCap className="text-white h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col items-start leading-none">
              <span className="text-slate-900 font-extrabold text-sm tracking-tight">EKOSISTEM</span>
              <span className="text-blue-600 font-semibold text-xs mt-0.5">SEKOLAH</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="py-4 px-2">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            {!isCollapsed && (
              <SidebarGroupLabel className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-1">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive} 
                        tooltip={item.title}
                        className={`w-full transition-all duration-200 ${
                          isActive 
                            ? "bg-blue-50/80 text-blue-600 font-semibold shadow-sm shadow-blue-500/5" 
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3 w-full px-3 py-2 rounded-xl">
                          <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          {!isCollapsed && <span className="text-sm">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-slate-100">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col items-start overflow-hidden leading-none">
              <span className="text-sm font-semibold text-slate-800 truncate w-full">Budi Santoso</span>
              <span className="text-[10px] font-medium text-slate-500 mt-1 uppercase">Admin / Wakasek</span>
            </div>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
