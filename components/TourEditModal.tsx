'use client';

import { useEffect, useState } from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { Tour } from './TourCard';

interface TourEditModalProps {
  tour: (Partial<Tour> & { id?: string }) | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type TourFormState = {
  title: string;
  category: string;
  destination: string;
  duration: string;
  price: string;
  image_url: string;
  highlights: string;
  inclusions: string;
};

const emptyForm = (): TourFormState => ({
  title: '',
  category: 'Japan Highlights',
  destination: '',
  duration: '5 Days / 4 Nights',
  price: '0',
  image_url: '',
  highlights: '',
  inclusions: '',
});

export default function TourEditModal({ tour, isOpen, onClose, onSuccess }: TourEditModalProps) {
  const [form, setForm] = useState<TourFormState>(emptyForm());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      title: tour?.title ?? '',
      category: tour?.category ?? 'Japan Highlights',
      destination: tour?.destination ?? '',
      duration: tour?.duration ?? '5 Days / 4 Nights',
      price: String(tour?.price ?? 0),
      image_url: tour?.image_url ?? '',
      highlights: (tour?.highlights ?? []).join('\n'),
      inclusions: (tour?.inclusions ?? []).join('\n'),
    });
  }, [tour, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof TourFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      category: form.category,
      destination: form.destination.trim(),
      duration: form.duration.trim(),
      price: Number(form.price) || 0,
      image_url: form.image_url.trim(),
      highlights: form.highlights
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      inclusions: form.inclusions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      is_published: true,
      created_at: new Date().toISOString(),
    };

    let error;

    if (tour?.id) {
      ({ error } = await supabase.from('tours').update(payload).eq('id', tour.id));
    } else {
      ({ error } = await supabase.from('tours').insert(payload));
    }

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
              {tour?.id ? 'Edit' : 'New'} Package
            </p>
            <h3 className="text-xl font-black text-white">Tour Details</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 transition hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Title</span>
              <input
                required
                value={form.title}
                onChange={handleChange('title')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-[#800000]"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Category</span>
              <select
                value={form.category}
                onChange={handleChange('category')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-[#800000]"
              >
                <option>Japan Highlights</option>
                <option>Southeast Asia</option>
                <option>Local &amp; Island Escapes</option>
                <option>Europe &amp; Long Haul</option>
                <option>Custom Group Tours</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Destination</span>
              <input
                required
                value={form.destination}
                onChange={handleChange('destination')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-[#800000]"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Duration</span>
              <input
                required
                value={form.duration}
                onChange={handleChange('duration')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-[#800000]"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Price</span>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange('price')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-[#800000]"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Image URL</span>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  value={form.image_url}
                  onChange={handleChange('image_url')}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#800000]"
                  placeholder="https://..."
                />
              </div>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Highlights</span>
              <textarea
                rows={4}
                value={form.highlights}
                onChange={handleChange('highlights')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-[#800000]"
                placeholder="One highlight per line"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Inclusions</span>
              <textarea
                rows={4}
                value={form.inclusions}
                onChange={handleChange('inclusions')}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-[#800000]"
                placeholder="One inclusion per line"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#800000] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Tour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
