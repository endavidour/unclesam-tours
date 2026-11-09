'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import TourEditModal from '@/components/TourEditModal';
import MomentEditModal from '@/components/MomentEditModal';
import { PlusCircle, LogOut, ArrowLeft, Trash2, Edit3, Loader2, Camera, Compass } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'tours' | 'moments'>('tours');
  
  // Tours state
  const [tours, setTours] = useState<any[]>([]);
  const [editingTour, setEditingTour] = useState<any | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // Moments state
  const [moments, setMoments] = useState<any[]>([]);
  const [editingMoment, setEditingMoment] = useState<any | null>(null);
  const [isMomentModalOpen, setIsMomentModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    const supabase = createClient();
    
    // Fetch tours
    const { data: tourData } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });
    if (tourData) setTours(tourData);

    // Fetch polaroid moments
    const { data: momentData } = await supabase
      .from('tour_moments')
      .select('*')
      .order('created_at', { ascending: false });
    if (momentData) setMoments(momentData);

    setLoading(false);
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      fetchAllData();
    };
    verifyAuth();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleDeleteTour = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete tour "${title}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    else fetchAllData();
  };

  const handleDeleteMoment = async (id: string, caption: string) => {
    if (!confirm(`Are you sure you want to delete this moment "${caption}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from('tour_moments').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    else fetchAllData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-rose-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-[#800000]">
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
            </Link>
            <h1 className="text-xl font-bold uppercase tracking-wider">
              UncleSam <span className="text-rose-500">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'tours' ? (
              <button
                onClick={() => {
                  setEditingTour(null);
                  setIsTourModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#800000] hover:bg-rose-900 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#800000]/40 transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Add Tour
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingMoment(null);
                  setIsMomentModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#800000] hover:bg-rose-900 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#800000]/40 transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Add Polaroid
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('tours')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'tours'
                ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            Tour Packages ({tours.length})
          </button>
          <button
            onClick={() => setActiveTab('moments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'moments'
                ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            Client Polaroids ({moments.length})
          </button>
        </div>

        {/* Tab 1: Tour Packages Table */}
        {activeTab === 'tours' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900 text-xs uppercase text-zinc-300">
                <tr>
                  <th className="p-4">Package</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-zinc-900/40">
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <img
                        src={tour.image_url || '/unclesam-tours-logo.png'}
                        className="w-12 h-12 object-cover rounded-lg border border-zinc-800 shrink-0"
                        alt=""
                      />
                      <span className="line-clamp-1">{tour.title}</span>
                    </td>
                    <td className="p-4 max-w-md truncate text-zinc-400">
                      {tour.highlights?.[0] || 'No description'}
                    </td>
                    <td className="p-4 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingTour(tour);
                          setIsTourModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTour(tour.id, tour.title)}
                        className="p-1.5 rounded bg-zinc-900 hover:bg-red-950/60 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Client Polaroids Table */}
        {activeTab === 'moments' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900 text-xs uppercase text-zinc-300">
                <tr>
                  <th className="p-4">Polaroid</th>
                  <th className="p-4">Caption</th>
                  <th className="p-4">Tour / Location</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {moments.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/40">
                    <td className="p-4">
                      <img
                        src={item.image_url}
                        className="w-12 h-12 object-cover rounded-sm border border-zinc-700 shadow-sm"
                        alt=""
                      />
                    </td>
                    <td className="p-4 font-serif italic text-zinc-200 max-w-xs truncate">
                      "{item.caption}"
                    </td>
                    <td className="p-4 text-xs">
                      <span className="block font-bold text-white">{item.tour_package}</span>
                      <span className="text-zinc-500">{item.location} • {item.date_label}</span>
                    </td>
                    <td className="p-4 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingMoment(item);
                          setIsMomentModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMoment(item.id, item.caption)}
                        className="p-1.5 rounded bg-zinc-900 hover:bg-red-950/60 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modals */}
        <TourEditModal
          tour={editingTour}
          isOpen={isTourModalOpen}
          onClose={() => setIsTourModalOpen(false)}
          onSuccess={fetchAllData}
        />

        <MomentEditModal
          moment={editingMoment}
          isOpen={isMomentModalOpen}
          onClose={() => setIsMomentModalOpen(false)}
          onSuccess={fetchAllData}
        />

      </div>
    </div>
  );
}