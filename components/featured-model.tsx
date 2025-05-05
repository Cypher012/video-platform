export function FeaturedModel() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] md:aspect-auto md:h-[500px] bg-rose-950/20 border border-rose-500/30 shadow-glow-sm">
        <img
          src="/placeholder.svg?height=800&width=600"
          alt="Featured Model"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-flex items-center bg-rose-600/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Available Now
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Jessica Diamond</h3>
          <p className="text-rose-200 mb-3">Los Angeles, CA • 24 years</p>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="bg-rose-950/50 px-2 py-1 rounded backdrop-blur-sm">Roleplay</span>
            <span className="bg-rose-950/50 px-2 py-1 rounded backdrop-blur-sm">Dancing</span>
            <span className="bg-rose-950/50 px-2 py-1 rounded backdrop-blur-sm">Conversation</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="inline-block rounded-lg bg-rose-900/30 px-3 py-1 text-sm text-rose-400 backdrop-blur-sm">
          Featured Performer
        </div>
        <h3 className="text-3xl font-bold text-white">Meet Jessica Diamond</h3>
        <p className="text-rose-100/80 text-lg">
          Jessica is our top-rated model this month, known for her captivating personality and unforgettable private
          shows. With over 500 five-star ratings, she's become a member favorite in record time.
        </p>

        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500">98%</div>
            <div className="text-sm text-rose-100/70">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500">1,240+</div>
            <div className="text-sm text-rose-100/70">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500">4.9/5</div>
            <div className="text-sm text-rose-100/70">Rating</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-lg shadow-glow-sm border border-rose-500/50 flex-1">
            View Profile
          </button>
          <button className="bg-black border border-rose-500/50 text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 py-3 px-6 rounded-lg flex-1">
            Book Session
          </button>
        </div>

        <div className="pt-4">
          <h4 className="font-medium text-white mb-2">Available for:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-rose-950/30 border border-rose-500/30 px-3 py-1 rounded-full text-sm text-rose-100">
              Private Chat
            </span>
            <span className="bg-rose-950/30 border border-rose-500/30 px-3 py-1 rounded-full text-sm text-rose-100">
              Video Sessions
            </span>
            <span className="bg-rose-950/30 border border-rose-500/30 px-3 py-1 rounded-full text-sm text-rose-100">
              Custom Content
            </span>
            <span className="bg-rose-950/30 border border-rose-500/30 px-3 py-1 rounded-full text-sm text-rose-100">
              Roleplay
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
