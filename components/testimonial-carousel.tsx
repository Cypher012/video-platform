"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Michael T.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The models on HotConnect are incredible. The video quality is amazing and the private sessions are truly unforgettable. Worth every penny!",
  },
  {
    name: "James R.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I've tried several similar sites, but HotConnect offers the best experience by far. The models are gorgeous and the interface is so easy to use.",
  },
  {
    name: "Robert K.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "The premium membership is definitely worth it. HD video quality and discounted rates make this the best adult video chat platform online.",
  },
  {
    name: "David L.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I was skeptical at first, but after my first session I was hooked. The models are attentive and the private sessions are truly private.",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-black/60 border border-rose-900/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-rose-500 fill-rose-500" : "text-gray-500"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-rose-100/80 italic">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/50 border border-rose-500/30 text-white hover:bg-rose-950/50 hover:text-rose-300 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/50 border border-rose-500/30 text-white hover:bg-rose-950/50 hover:text-rose-300 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-rose-500" : "bg-rose-900/50"}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
