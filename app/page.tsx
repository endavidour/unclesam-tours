'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import TourCard, { Tour } from '@/components/TourCard';
import TourDetailModal from '@/components/TourDetailModal';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';

const PAGE_SIZE = 9;

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  // Bandwidth-optimized fetch using Supabase server-side range limiting
  const fetchTours = useCallback(async (pageNumber: number, isInitial = false) => {
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    const supabase = createClient();
    const from = pageNumber * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    // Only select the lightweight columns needed to preserve data egress
    const { data, error, count } = await supabase
      .from('tours')
      .select('id, title, image_url, highlights, created_at', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (!error && data) {
      const formatted = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        image_url: item.image_url || '',
        highlights: Array.isArray(item.highlights) ? item.highlights : [item.highlights || ''],
      })) as Tour[];

      setTours((prev) => (pageNumber === 0 ? formatted : [...prev, ...formatted]));

      if (count !== null) {
        setHasMore(from + data.length < count);
      } else {
        setHasMore(data.length === PAGE_SIZE);
      }
    }

    setLoading(false);
    setLoadingMore(false);
  }, []);

  useEffect(() => {
    fetchTours(0, true);
  }, [fetchTours]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTours(nextPage, false);
  };

  // Local search filter across loaded cards
  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tour.highlights?.[0] || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Black Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* 2. Auto-Sliding Japan Destinations Carousel */}
      <HeroSlider />

      {/* 3. Main Tour Packages Showcase */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full bg-white">
        {/* Section Heading */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 flex items-center gap-3">
              <span className="w-2.5 h-7 bg-[#800000] rounded-sm inline-block" />
              Available Tour Packages
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Select any package to view the full itinerary and message us directly for rates and booking.
            </p>
          </div>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="w-8 h-8 text-[#800000] animate-spin mb-3" />
            <p className="text-sm font-medium">Fetching tour packages...</p>
          </div>
        ) : filteredTours.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} onSelect={setSelectedTour} />
              ))}
            </div>

            {/* Server-Side Load More Button */}
            {hasMore && !searchQuery && (
              <div className="text-center mt-14">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 hover:bg-[#800000] hover:text-white hover:border-[#800000] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  {loadingMore && <Loader2 className="w-4 h-4 animate-spin text-[#800000]" />}
                  {loadingMore ? 'Loading More...' : 'Load More Packages'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center rounded-2xl border-2 border-dashed border-zinc-200 p-8 bg-zinc-50">
            <p className="text-zinc-500 text-sm font-medium">
              {searchQuery ? 'No tour packages match your search query.' : 'No tour packages published yet. Check back soon!'}
            </p>
          </div>
        )}
      </main>

      {/* 4. Black Footer */}
      <Footer />

      {/* 5. Direct Message / Itinerary Modal */}
      <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </div>
  );
}