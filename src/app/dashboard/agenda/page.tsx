"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { upcomingAgenda } from "@/data/dummy"
import { Badge } from "@/components/ui/badge"

const localizer = momentLocalizer(moment)

export default function AgendaPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [events, setEvents] = useState(
    upcomingAgenda.map(agenda => {
      const [startHour, endHour] = agenda.time.split(" - ")
      const startDate = new Date(`${agenda.date}T${startHour}:00`)
      const endDate = new Date(`${agenda.date}T${endHour}:00`)
      return {
        id: agenda.id,
        title: agenda.title,
        start: startDate,
        end: endDate,
        resource: agenda.room,
        status: agenda.status
      }
    })
  )

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3b82f6' // default blue
    if (event.status === 'Approved') {
      backgroundColor = '#10b981' // green
    } else if (event.status === 'Pending') {
      backgroundColor = '#f59e0b' // yellow/amber
    } else if (event.status === 'Rejected') {
      backgroundColor = '#ef4444' // red
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Kalender Agenda</h2>
        <p className="text-slate-500">
          Kelola dan pantau semua agenda sekolah.
        </p>
      </div>
      
      <div className="flex gap-4 mb-4">
        <Badge className="bg-emerald-500 hover:bg-emerald-600">Approved</Badge>
        <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
        <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-[600px]">
            {isMounted && (
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day']}
                defaultView={Views.MONTH}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
