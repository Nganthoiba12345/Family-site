import React from 'react'
import { Calendar, Milestone, Sparkles } from 'lucide-react'

interface FamilyTimelineProps {
  events: any[]
}

export function FamilyTimeline({ events }: FamilyTimelineProps) {
  if (!events || events.length === 0) return null

  // Sort events by order or year
  const sortedEvents = [...events].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Milestone className="w-3.5 h-3.5 text-cyan-600" />
            Historical Milestones
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Family Heritage Timeline
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Tracing our journey through the decades, from the wedding of our grandparents to the digital preservation of our story.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Glowing central vertical timeline bar */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-300 via-cyan-400 to-blue-600 shadow-[0_0_10px_#00d9ff]" />

          <div className="space-y-12">
            {sortedEvents.map((evt, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={evt.id || index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 w-6 h-6 rounded-full bg-white border-4 border-cyan-400 shadow-md shadow-cyan-400/50 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12 text-left sm:text-right' : 'sm:pl-12 text-left'}`}>
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-300 glass-card-hover">
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                        <span className="text-xl font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                          {evt.year}
                        </span>
                        {evt.category && (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                            {evt.category}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {evt.title}
                      </h3>

                      {evt.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {evt.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
