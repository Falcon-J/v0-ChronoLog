'use client'

import { Activity } from '../types'

interface ExportButtonProps {
  activities: Activity[]
}

export default function ExportButton({ activities }: ExportButtonProps) {
  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,Start Timestamp,End Timestamp,Description\n"

    activities.forEach((activity) => {
      csvContent += `${activity.startTimestamp},${activity.endTimestamp},${activity.description.replace(/,/g, ';')}\n`
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "activities.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleExport}
      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
    >
      Export to CSV
    </button>
  )
}

