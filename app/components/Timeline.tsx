import { Activity } from '../types'

interface TimelineProps {
  activities: Activity[]
}

export default function Timeline({ activities }: TimelineProps) {
  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-green-700 hover:border-green-500 transition-colors">
          <p className="text-green-300 text-sm">
            Start: {new Date(activity.startTimestamp).toLocaleString()}
          </p>
          <p className="text-green-300 text-sm">
            End: {new Date(activity.endTimestamp).toLocaleString()}
          </p>
          <p className="text-lg mt-2 text-green-100">{activity.description}</p>
        </div>
      ))}
    </div>
  )
}

