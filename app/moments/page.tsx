'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Camera, MapPin, X, MessageCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface Moment {
  id: string;
  tour_package: string;
  location: string;
  caption: string;
  date_label: string;
  image_url: string;
}

// Preset natural Polaroid tilts applied automatically to each new admin photo
const ROTATION_PATTERNS = [
  '-rotate-2',
  'rotate-3',
  '-rotate-3',
  'rotate-2',
  '-rotate-1',
  'rotate-1',
];

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All Tours');
  const [activePhoto, setActivePhoto] = useState<Moment | null>(null);

  useEffect(() => {
    const fetchMoments = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tour_moments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMoments(data as Moment[]);
      }
      setLoading(false);
    };

    fetchMoments();
  }, []);

  // Filter tabs dynamically created from your database entries
  const tourFilters = ['All Tours', ...Array.from(new Set(moments.map((m) => m.tour_package).filter(Boolean)))];

  const filteredMoments = moments.filter((item) =>
    selectedFilter === 'All Tours' ? true : item.tour_package === selectedFilter
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header */}
      <Header />

      {/* 2. Sleek Aesthetic Top Banner */}
      <section className="bg-black border-b border-[#800000]/40 text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/[0.03] text-8xl sm:text-9xl font-black pointer-events-none select-none tracking-widest">
          旅の記憶
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800000]/30 border border-[#800000]/60 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Client Photo Journal</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white mb-3">
            Moments with <span className="text-rose-500 [text-shadow:0_0_25px_rgba(128,0,32,0.8)]">Uncle Sam</span>
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Real memories with real travelers. Here are raw snapshots of our tours across Japan, guiding wonderful guests through the streets, mountains, and historic temples.
          </p>
        </div>
      </section>

      {/* 3. Polaroid Wall */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-zinc-400 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#800000]" />
            <span className="text-xs font-bold uppercase tracking-wider">Loading Polaroids...</span>
          </div>
        ) : moments.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-600" />
            <p className="text-base font-semibold text-zinc-700">No client moments published yet.</p>
            <p className="text-xs text-zinc-400 mt-1">Add client photos via the /admin panel!</p>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
              {tourFilters.map((tourName) => (
                <button
                  key={tourName}
                  onClick={() => setSelectedFilter(tourName)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedFilter === tourName
                      ? 'bg-[#800000] text-white shadow-lg shadow-[#800000]/40 scale-105'
                      : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-400'
                  }`}
                >
                  {tourName}
                </button>
              ))}
            </div>

            {/* Polaroid Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 pt-2">
              {filteredMoments.map((item, idx) => {
                const rotation = ROTATION_PATTERNS[idx % ROTATION_PATTERNS.length];

                return (
                  <div
                    key={item.id}
                    onClick={() => setActivePhoto(item)}
                    className={`group cursor-pointer select-none transition-all duration-500 ease-out transform ${rotation} hover:rotate-0 hover:-translate-y-4 hover:scale-105 z-10 hover:z-20`}
                  >
                    {/* The Authentic Polaroid Frame */}
                    <div className="bg-white p-4 pb-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_45px_rgba(128,0,32,0.28)] border border-zinc-200/90 group-hover:border-[#800000]/60 transition-all duration-500">
                      
                      {/* Glossy Photo Area */}
                      <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 rounded-xs shadow-inner">
                        <img
                          src={item.image_url}
                          alt={item.caption}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter contrast-[1.03]"
                        />

                        {/* Hover Overlay Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Location Pin Hover Badge */}
                        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white border border-white/20">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Handwritten-Style Caption Section */}
                      <div className="pt-4 px-1 text-center">
                        <p className="font-serif italic text-zinc-800 text-sm sm:text-base leading-snug group-hover:text-[#800000] transition-colors">
                          "{item.caption}"
                        </p>
                        
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mt-3 pt-2 border-t border-dashed border-zinc-200">
                          <span className="font-semibold uppercase tracking-wider text-zinc-500">
                            {item.tour_package}
                          </span>
                          <span>{item.date_label}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* 4. Lightbox Polaroid Modal on Click */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white p-5 sm:p-7 pb-8 rounded-sm shadow-2xl max-w-lg w-full border border-zinc-200 transform animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-4 -right-4 p-2 rounded-full bg-black border border-zinc-700 text-white hover:text-rose-400 transition-colors shadow-lg z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-square w-full overflow-hidden bg-zinc-950 rounded-xs shadow-inner">
              <img
                src={activePhoto.image_url}
                alt={activePhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-5 text-center">
              <p className="font-serif italic text-zinc-900 text-lg leading-relaxed mb-3">
                "{activePhoto.caption}"
              </p>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activePhoto.location}</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 block mb-6">
                Tour Package: {activePhoto.tour_package} • {activePhoto.date_label}
              </span>

              {/* Inquire CTA */}
              <a
                href={`https://wa.me/818053311738?text=${encodeURIComponent(
                  `Hello UncleSam Tours! I saw your client photo at ${activePhoto.location} (${activePhoto.tour_package}) and would like to inquire about this exact tour package!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#800000] hover:bg-rose-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#800000]/30"
              >
                <MessageCircle className="w-4 h-4" />
                Inquire About This Tour
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}