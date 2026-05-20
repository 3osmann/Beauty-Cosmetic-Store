export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="w-16 h-16 border-4 border-muted rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-[#B76E79] rounded-full animate-spin" />
        </div>
        <p className="font-heading text-lg font-semibold text-[#B76E79]">
          Beauté
        </p>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
