'use client'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ title = "出错了", message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">❌</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-1">{title}</h3>
          <p className="text-red-600 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              重试
            </button>
          )}
        </div>
      </div>
    </div>
  )
}