export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 text-sm">Carregando...</p>
      </div>
    </div>
  )
}
