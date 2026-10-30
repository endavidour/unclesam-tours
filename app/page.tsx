'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import TourCard, { Tour } from '@/components/TourCard';
import TourDetailModal from '@/components/TourDetailModal';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Japan Highlights',
  'Southeast Asia',
  'Local & Island Escapes',
  'Europe & Long Haul',
  'Custom Group Tours'
];

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

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
      const matchCat = selectedCategory === 'All' || tour.category === selectedCategory;
      const matchSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destination.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [tours, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroSlider />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        {/* Category Pills Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#800000] text-white shadow-lg shadow-[#800000]/40'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#800000] rounded-sm inline-block" />
              Available Tour Packages
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Showing {filteredTours.length} package{filteredTours.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-3" />
            <p className="text-sm">Fetching tour itineraries from database...</p>
          </div>
        ) : filteredTours.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.slice(0, visibleCount).map((tour) => (
                <TourCard key={tour.id} tour={tour} onSelect={setSelectedTour} />
              ))}
            </div>

            {/* Load More Button for Bandwidth Protection */}
            {visibleCount < filteredTours.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#800000] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Load More Packages
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center rounded-2xl border border-dashed border-zinc-800 p-8">
            <p className="text-zinc-500 text-sm">No tour packages found under this selection.</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Itinerary Modal */}
      <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </div>
  );
}