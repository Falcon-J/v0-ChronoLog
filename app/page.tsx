'use client'

import { useState, useEffect } from 'react'
import Timeline from './components/Timeline'
import ActivityForm from './components/ActivityForm'
import DateFilter from './components/DateFilter'
import ExportButton from './components/ExportButton'
import { Activity } from './types'

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities')
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities))
    }
  }, [])

  const addActivity = (newActivity: Activity) => {
    const updatedActivities = [...activities, newActivity]
    setActivities(updatedActivities)
    localStorage.setItem('activities', JSON.stringify(updatedActivities))
  }

  const toggleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc')
  }

  const sortedActivities = [...activities].sort((a, b) => {
    const dateA = new Date(a.startTimestamp)
    const dateB = new Date(b.startTimestamp)
    return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
  })

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-green-400">Activity Tracker</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-400">Activities</h2>
            <button
              onClick={toggleSort}
              className="px-4 py-2 bg-green-700 text-green-100 rounded hover:bg-green-600 transition-colors"
            >
              Sort {sortOrder === 'desc' ? '↑' : '↓'}
            </button>
          </div>
          <Timeline activities={filteredActivities.length > 0 ? filteredActivities : sortedActivities} />
        </div>
        <div>
          <ActivityForm addActivity={addActivity} />
          <DateFilter activities={activities} setFilteredActivities={setFilteredActivities} />
          <ExportButton activities={activities} />
        </div>
      </div>
    </main>
  )
}

