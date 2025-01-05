'use client'

import { useState } from 'react'
import { Activity } from '../types'

interface ActivityFormProps {
  addActivity: (activity: Activity) => void
}

export default function ActivityForm({ addActivity }: ActivityFormProps) {
  const [startTimestamp, setStartTimestamp] = useState('')
  const [endTimestamp, setEndTimestamp] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newActivity: Activity = {
      id: Date.now().toString(),
      startTimestamp,
      endTimestamp,
      description,
    }
    addActivity(newActivity)
    setStartTimestamp('')
    setEndTimestamp('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="startTimestamp" className="block text-sm font-medium text-green-400 mb-1">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTimestamp"
          value={startTimestamp}
          onChange={(e) => setStartTimestamp(e.target.value)}
          required
          className="w-full rounded-md border-green-700 bg-gray-700 text-green-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="endTimestamp" className="block text-sm font-medium text-green-400 mb-1">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTimestamp"
          value={endTimestamp}
          onChange={(e) => setEndTimestamp(e.target.value)}
          required
          className="w-full rounded-md border-green-700 bg-gray-700 text-green-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-green-400 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full rounded-md border-green-700 bg-gray-700 text-green-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        Add Activity
      </button>
    </form>
  )
}

