import React from 'react'
import './timetable.scss'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TrainStop {
  station: string
  arrivalTime: string
  departureTime: string
  amount: string
}

const trainSchedule:TrainStop[] = [
  {
    station: "Nairobi",
    arrivalTime: "—",
    departureTime: "06:30 AM",
    amount: "KSh 1,200",
  },
  {
    station: "Athi River",
    arrivalTime: "07:00 AM",
    departureTime: "07:05 AM",
    amount: "KSh 1,100",
  },
  {
    station: "Emali",
    arrivalTime: "08:00 AM",
    departureTime: "08:05 AM",
    amount: "KSh 950",
  },
  {
    station: "Mtito Andei",
    arrivalTime: "09:00 AM",
    departureTime: "09:10 AM",
    amount: "KSh 800",
  },
  {
    station: "Voi",
    arrivalTime: "10:30 AM",
    departureTime: "10:40 AM",
    amount: "KSh 650",
  },
  {
    station: "Miasenyi",
    arrivalTime: "11:30 AM",
    departureTime: "11:35 AM",
    amount: "KSh 500",
  },
  {
    station: "Mombasa Terminus",
    arrivalTime: "12:30 PM",
    departureTime: "—",
    amount: "KSh 0",
  },
]

export const Timetable:React.FC = () => {  
  return (
    <Table className='table-container'>
      <TableCaption className='TableCaption'>Train Schedule Timetable</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[160px]">Station</TableHead>
          <TableHead>Arrival Time</TableHead>
          <TableHead>Departure Time</TableHead>
          <TableHead>Fare</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trainSchedule.map((stop, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{stop.station}</TableCell>
            <TableCell>{stop.arrivalTime}</TableCell>
            <TableCell>{stop.departureTime}</TableCell>
            <TableCell>{stop.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Timetable
