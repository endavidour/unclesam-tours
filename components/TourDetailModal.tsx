'use client';

import { X, MessageCircle } from 'lucide-react';
import { Tour } from './TourCard';

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
}

export default function TourDetailModal({ tour, onClose }: TourDetailModalProps) {
  if (!tour) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello UncleSam Tours! I would like to inquire about available dates, itinerary details, and rates for "${tour.title}".`
  );

  const descriptionText = tour.highlights?.[0] || 'Inquire directly for package schedule and details.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative bg-zinc-950 border border-[#800000]/60 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-2xl flex flex-col">
        
        {/* Cover Photo */}
        <div className="relative aspect-[16/9] w-full bg-zinc-900">
          <img
            src={tour.image_url || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=1200&auto=format&fit=crop'}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-2xl sm:text-3xl font-black text-white">{tour.title}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Description Section */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
              Tour Itinerary & Details
            </h4>
            <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
              {descriptionText}
            </div>
          </div>

          {/* Direct Redirection Inquiries */}
          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <a
              href={`https://wa.me/818053311738?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-colors shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              Inquire Rates via WhatsApp
            </a>

            <a
              href="https://www.facebook.com/unclesamtourservices"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#800000] hover:bg-rose-900 text-white font-bold text-sm tracking-wide transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Message UncleSam Tours on Facebook
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}