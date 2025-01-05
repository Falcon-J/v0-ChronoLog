'use client'

import { useState } from 'react'
import { Activity } from '../types'

interface DateFilterProps {
  activities: Activity[]
  setFilteredActivities: React.Dispatch<React.SetStateAction<Activity[]>>
}

export default function DateFilter({ activities, setFilteredActivities }: DateFilterProps) {
  const [date, setDate] = useState('')

  const handleFilter = () => {
    if (!date) {
      setFilteredActivities([])
      return
    }

    const filterDate = new Date(date)
    filterDate.setHours(0, 0, 0, 0)

    const filtered = activities.filter((activity) => {
      const startDate = new Date(activity.startTimestamp)
      const endDate = new Date(activity.endTimestamp)
      return (
        (startDate >= filterDate && startDate < new Date(filterDate.getTime() + 86400000)) ||
        (endDate >= filterDate && endDate < new Date(filterDate.getTime() + 86400000)) ||
        (startDate < filterDate && endDate >= new Date(filterDate.getTime() + 86400000))
      )
    })

    setFilteredActivities(filtered)
  }

  return (
    <div className="space-y-4 mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="filterDate" className="block text-sm font-medium text-green-400 mb-1">
          Filter by Date
        </label>
        <input
          type="date"
          id="filterDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-md border-green-700 bg-gray-700 text-green-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
      </div>
      <button
        onClick={handleFilter}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        Apply Filter
      </button>
    </div>
  )
}

