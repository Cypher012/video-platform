import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModelCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-rose-950/20 border border-rose-900/30 hover:border-rose-500/50 transition-all">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
      <img
        src={`/placeholder.svg?height=400&width=300`}
        alt="Model"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-2 right-2 z-20 flex items-center bg-black/60 rounded-full px-2 py-1 backdrop-blur-sm">
        <Star className="h-3 w-3 text-rose-500 mr-1" fill="currentColor" />
        <span className="text-xs font-medium text-white">4.9</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-lg font-bold text-white">Sophia</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-rose-300">$4.99/min</span>
          <span className="inline-flex items-center text-xs bg-rose-600/80 text-white px-2 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            Online
          </span>
        </div>
        <Button className="w-full mt-3 bg-rose-600/80 hover:bg-rose-600 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          View Profile
        </Button>
      </div>
      <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-5"></div>
    </div>
  )
}
