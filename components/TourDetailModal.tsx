'use client';

import { X, Check, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Tour } from './TourCard';

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
}

export default function TourDetailModal({ tour, onClose }: TourDetailModalProps) {
  if (!tour) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello UncleSam Tours! I am interested in inquiring about the "${tour.title}" (${tour.duration}) package priced at ₱${tour.price.toLocaleString()}. Could you share available dates?`
  );

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
            <span className="text-xs uppercase font-bold tracking-widest text-rose-400">
              {tour.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{tour.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">Destination</span>
              <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {tour.destination}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">Duration</span>
              <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                {tour.duration}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">Price / Pax</span>
              <span className="text-sm font-extrabold text-rose-400 mt-0.5 block">
                ₱{tour.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
                Tour Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions */}
          {tour.inclusions && tour.inclusions.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
                Package Inclusions
              </h4>
              <ul className="space-y-2">
                {tour.inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Direct Inquiry CTAs (No Booking System) */}
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <a
              href={`https://wa.me/639667901269?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-colors shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              Inquire via WhatsApp
            </a>

            <a
              href="https://facebook.com/unclesamtours"
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