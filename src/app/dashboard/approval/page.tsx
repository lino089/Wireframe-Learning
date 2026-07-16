"use client"

import { useState } from "react"
import { upcomingAgenda } from "@/data/dummy"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { toast } from "sonner"

export default function ApprovalPage() {
  const [agendas, setAgendas] = useState(upcomingAgenda)

  const handleStatusChange = (id: number, newStatus: string) => {
    setAgendas(agendas.map(agenda => 
      agenda.id === id ? { ...agenda, status: newStatus } : agenda
    ))
    toast.success(`Booking ${newStatus === 'Approved' ? 'disetujui' : 'ditolak'}`, {
      description: "Status peminjaman ruangan telah diperbarui.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Persetujuan Booking (Admin)</h2>
        <p className="text-slate-500">
          Kelola permohonan peminjaman ruangan yang masuk.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Permohonan Booking</CardTitle>
          <CardDescription>Tinjau dan berikan persetujuan untuk setiap permohonan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kegiatan</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Ruangan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agendas.map((agenda) => (
                <TableRow key={agenda.id}>
                  <TableCell className="font-medium">{agenda.title}</TableCell>
                  <TableCell>{agenda.date} ({agenda.time})</TableCell>
                  <TableCell>{agenda.room}</TableCell>
                  <TableCell>
                    <Badge variant={agenda.status === "Approved" ? "default" : agenda.status === "Rejected" ? "destructive" : "outline"} 
                      className={agenda.status === "Approved" ? "bg-emerald-500" : agenda.status === "Pending" ? "text-amber-600 border-amber-600" : ""}>
                      {agenda.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() => handleStatusChange(agenda.id, 'Approved')}
                      disabled={agenda.status === 'Approved'}
                    >
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleStatusChange(agenda.id, 'Rejected')}
                      disabled={agenda.status === 'Rejected'}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
