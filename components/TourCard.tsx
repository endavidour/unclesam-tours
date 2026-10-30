'use client';

import { Clock, ArrowRight, MessageCircle } from 'lucide-react';

export interface Tour {
  id: string;
  title: string;
  category: string;
  destination: string;
  duration: string;
  price?: number;
  image_url: string;
  highlights: string[];
  inclusions: string[];
}

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
}

export default function TourCard({ tour, onSelect }: TourCardProps) {
  return (
    <div
      onClick={() => onSelect(tour)}
      className="group cursor-pointer bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-[#800000] transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-[#800000]/10"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
        <img
          src={tour.image_url || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=750&auto=format&fit=crop'}
          alt={tour.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/80 text-white backdrop-blur-sm">
            {tour.destination}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#800000] text-white shadow-md">
            <Clock className="w-3 h-3" />
            {tour.duration}
          </span>
        </div>
      </div>

      {/* Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#800000] transition-colors line-clamp-1">
            {tour.title}
          </h3>

          {tour.highlights && tour.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tour.highlights.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#800000] text-xs font-bold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Inquire for Rates</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-zinc-500 group-hover:text-[#800000] transition-colors">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}