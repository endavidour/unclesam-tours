'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import TourEditModal from '@/components/TourEditModal';
import { PlusCircle, LogOut, ArrowLeft, Trash2, Edit3, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAdminTours = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setTours(data);
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
      fetchAdminTours();
    };
    verifyAuth();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) {
      alert('Delete failed: ' + error.message);
    } else {
      fetchAdminTours();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-rose-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-[#800000]">
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
            </Link>
            <h1 className="text-xl font-bold uppercase tracking-wider">
              UncleSam Tours <span className="text-rose-500">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingTour(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#800000] hover:bg-rose-900 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Add Tour Package
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tour Table */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900 text-xs uppercase text-zinc-300">
              <tr>
                <th className="p-4">Package</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-zinc-900/40">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <img
                      src={tour.image_url || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=150&auto=format&fit=crop'}
                      className="w-10 h-10 object-cover rounded"
                      alt=""
                    />
                    <span>{tour.title}</span>
                  </td>
                  <td className="p-4">{tour.destination}</td>
                  <td className="p-4">{tour.duration}</td>
                  <td className="p-4 text-rose-400 font-bold">₱{tour.price.toLocaleString()}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingTour(tour);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id, tour.title)}
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

        {/* Create / Edit Modal */}
        <TourEditModal
          tour={editingTour}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchAdminTours}
        />
      </div>
    </div>
  );
}