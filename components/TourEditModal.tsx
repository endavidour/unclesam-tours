'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { X, Upload, ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface TourEditModalProps {
  tour?: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TourEditModal({ tour, isOpen, onClose, onSuccess }: TourEditModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(tour?.image_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const supabase = createClient();
    const formData = new FormData(e.currentTarget);

    let imageUrl = tour?.image_url || '';

    // 1. Upload photo to tour-images bucket if a new file was chosen
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('tour-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        alert('Image upload failed: ' + uploadError.message);
        setSubmitting(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('tour-images')
        .getPublicUrl(fileName);
      imageUrl = publicUrl;
    }

    const payload = {
      title: formData.get('name') as string,
      highlights: [(formData.get('description') as string) || ''],
      image_url: imageUrl,
      destination: 'Japan',
      duration: '',
      is_published: true,
    };

    if (tour?.id) {
      const { error } = await supabase.from('tours').update(payload).eq('id', tour.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('tours').insert([payload]);
      if (error) alert(error.message);
    }

    setSubmitting(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-[#800000]/60 rounded-2xl w-full max-w-lg overflow-hidden text-white shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#800000] uppercase">
              {tour ? 'EDIT PACKAGE' : 'NEW PACKAGE'}
            </span>
            <h2 className="text-lg font-black text-white">Tour Details</h2>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            disabled={submitting} 
            className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Fields Only: Name, Add Image, Description */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* 1. Name */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
              Tour Name
            </label>
            <input
              name="name"
              defaultValue={tour?.title || ''}
              required
              placeholder="e.g. Tokyo & Hakone Winter Getaway"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#800000] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition-colors"
            />
          </div>

          {/* 2. Add Image */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
              Tour Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-zinc-600" />
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={submitting}
                  className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white rounded-xl text-xs font-bold tracking-wide transition-colors"
                >
                  <Upload className="w-4 h-4 text-rose-500" />
                  {imagePreview ? 'Change Photo' : 'Upload Photo'}
                </button>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Recommended: clear landscape or promo photo.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Description */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={tour?.highlights?.[0] || ''}
              placeholder="Enter tour summary, spots visited, or package notes..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#800000] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-zinc-500 outline-none resize-none transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-rose-900 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-[#800000]/40 disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {tour ? 'Save Changes' : 'Save Tour'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}