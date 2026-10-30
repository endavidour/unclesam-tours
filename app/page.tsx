'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import TourCard, { Tour } from '@/components/TourCard';
import TourDetailModal from '@/components/TourDetailModal';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTours(data as Tour[]);
      }
      setLoading(false);
    };

    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      return (
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [tours, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Black Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Cinematic Hero Slider */}
      <HeroSlider />

      {/* Main Content Area - Clean White Background */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full bg-white">
        {/* Section Heading */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 flex items-center gap-3">
              <span className="w-2.5 h-7 bg-[#800000] rounded-sm inline-block" />
              Available Tour Packages
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Showing {filteredTours.length} package{filteredTours.length === 1 ? '' : 's'} • Inquire directly for rates and schedules
            </p>
          </div>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="w-8 h-8 text-[#800000] animate-spin mb-3" />
            <p className="text-sm font-medium">Fetching tour itineraries from database...</p>
          </div>
        ) : filteredTours.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.slice(0, visibleCount).map((tour) => (
                <TourCard key={tour.id} tour={tour} onSelect={setSelectedTour} />
              ))}
            </div>

            {visibleCount < filteredTours.length && (
              <div className="text-center mt-14">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 hover:bg-[#800000] hover:text-white hover:border-[#800000] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Load More Packages
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center rounded-2xl border-2 border-dashed border-zinc-200 p-8 bg-zinc-50">
            <p className="text-zinc-500 text-sm">No tour packages found. Check back soon!</p>
          </div>
        )}
      </main>

      {/* Black Footer */}
      <Footer />

      {/* Itinerary Modal */}
      <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </div>
  );
}