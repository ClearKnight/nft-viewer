'use client'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: {
    text: string
    onClick: () => void
  }
}

export function EmptyState({ icon = "🔍", title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {action.text}
        </button>
      )}
    </div>
  )
}