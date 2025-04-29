export function IntegrationStep({ number, title, children, isImportant }) {
  return (
    <div
      className={`my-8 rounded-lg border p-6 ${isImportant ? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium ${
            isImportant ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800"
          }`}
        >
          {number}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight">{title}</h3>
          <div className="text-gray-600 dark:text-gray-400">{children}</div>
        </div>
      </div>
    </div>
  )
}
