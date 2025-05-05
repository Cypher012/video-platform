"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModelCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = 2 // Total number of pages in carousel
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth
      const itemWidth = scrollWidth / (maxIndex + 1)
      scrollRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      })
    }
  }

  const nextSlide = () => {
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[0, 1, 2].map((pageIndex) => (
          <div key={pageIndex} className="flex-none w-full snap-center grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-rose-950/20 border border-rose-900/30 hover:border-rose-500/50 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img
                  src={`/placeholder.svg?height=400&width=300`}
                  alt="Model"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-lg font-bold text-white">Model Name</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-rose-300">$4.99/min</span>
                    <span className="inline-flex items-center text-xs bg-rose-600/80 text-white px-2 py-1 rounded-full">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                      Live
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-5"></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 border border-rose-500/30 text-white hover:bg-rose-950/50 hover:text-rose-300 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 border border-rose-500/30 text-white hover:bg-rose-950/50 hover:text-rose-300 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-rose-500" : "bg-rose-900/50"}`}
            onClick={() => {
              setCurrentIndex(i)
              scrollToIndex(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}
