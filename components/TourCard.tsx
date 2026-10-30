'use client';

import { MapPin, Clock, ArrowRight } from 'lucide-react';

export interface Tour {
  id: string;
  title: string;
  category: string;
  destination: string;
  duration: string;
  price: number;
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
      className="group cursor-pointer bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#800000] transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-[#800000]/20"
    >
      {/* Image Container with native lazy loading for bandwidth optimization */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <img
          src={tour.image_url || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=750&auto=format&fit=crop'}
          alt={tour.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/80 border border-white/10 text-rose-300 backdrop-blur-sm">
            {tour.destination}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#800000]/90 text-white backdrop-blur-sm shadow-md">
            <Clock className="w-3 h-3" />
            {tour.duration}
          </span>
        </div>
      </div>

      {/* Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
            {tour.category}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
            {tour.title}
          </h3>

          {/* Highlights tags */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tour.highlights.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Direct Trigger */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-zinc-500 block leading-tight">Starting from</span>
            <div className="text-xl font-black text-rose-500">
              ₱{tour.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              <span className="text-[11px] font-normal text-zinc-500 ml-1">/ pax</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
            <span>View Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}