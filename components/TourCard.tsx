'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';

export interface Tour {
  id: string;
  title: string;
  image_url: string;
  highlights: string[];
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
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
        <img
          src={tour.image_url || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=750&auto=format&fit=crop'}
          alt={tour.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#800000] transition-colors line-clamp-1">
            {tour.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
            {tour.highlights?.[0] || 'Inquire directly for package schedule and details.'}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#800000] text-xs font-bold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Inquire Package</span>
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