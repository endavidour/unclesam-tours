'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { X, Upload, Camera, Loader2 } from 'lucide-react';

interface MomentEditModalProps {
  moment?: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MomentEditModal({ moment, isOpen, onClose, onSuccess }: MomentEditModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(moment?.image_url || null);
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

    let imageUrl = moment?.image_url || '';

    // Upload to tour-images bucket if a new file is chosen
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `moments-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
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

    if (!imageUrl) {
      alert('Please upload a photo for the polaroid.');
      setSubmitting(false);
      return;
    }

    const payload = {
      tour_package: formData.get('tour_package') as string,
      location: formData.get('location') as string,
      caption: formData.get('caption') as string,
      date_label: formData.get('date_label') as string,
      image_url: imageUrl,
    };

    if (moment?.id) {
      const { error } = await supabase.from('tour_moments').update(payload).eq('id', moment.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('tour_moments').insert([payload]);
      if (error) alert(error.message);
    }

    setSubmitting(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-[#800000]/60 rounded-2xl w-full max-w-lg overflow-hidden text-white shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-rose-500 uppercase">
              {moment ? 'EDIT POLAROID' : 'NEW CLIENT POLAROID'}
            </span>
            <h2 className="text-lg font-black text-white">Client Tour Moment</h2>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Photo Upload */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
              Client & Owner Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-zinc-600" />
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
                  {imagePreview ? 'Change Photo' : 'Upload Client Photo'}
                </button>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Square/portrait photos look best in polaroid frames.
                </p>
              </div>
            </div>
          </div>

          {/* Tour Package Tag */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
              Tour Package Name
            </label>
            <input
              name="tour_package"
              defaultValue={moment?.tour_package || ''}
              required
              placeholder="e.g. Nagoya Discovery, Tokyo Highlights, Hakone..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#800000] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-zinc-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Location Pin */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                Location Badge
              </label>
              <input
                name="location"
                defaultValue={moment?.location || ''}
                required
                placeholder="e.g. Nagoya Castle, Lake Ashi"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#800000] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>
            {/* Season/Date Tag */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                Date / Season
              </label>
              <input
                name="date_label"
                defaultValue={moment?.date_label || '2024'}
                required
                placeholder="e.g. Autumn 2024"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#800000] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
              Handwritten Caption Note
            </label>
            <textarea
              name="caption"
              rows={3}
              required
              defaultValue={moment?.caption || ''}
              placeholder="e.g. Exploring Nagoya Castle with the Santos family! 🏯"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#800000] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-zinc-500 outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-rose-900 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#800000]/40 disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {moment ? 'Save Changes' : 'Publish Polaroid'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}