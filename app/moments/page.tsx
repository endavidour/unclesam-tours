'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Camera, MapPin, X, Heart, Sparkles, MessageCircle } from 'lucide-react';

interface PolaroidMoment {
  id: string;
  tourPackage: string;
  location: string;
  caption: string;
  date: string;
  image: string;
  rotation: string; // Organic photo angle
}

const MOMENTS: PolaroidMoment[] = [
  {
    id: '1',
    tourPackage: 'Nagoya Discovery',
    location: 'Nagoya Castle & Oasis 21',
    caption: 'With the Santos family exploring Nagoya Castle! 🏯',
    date: 'Autumn 2024',
    image: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=75&w=800&auto=format&fit=crop',
    rotation: '-rotate-2',
  },
  {
    id: '2',
    tourPackage: 'Hakone & Fuji Relax',
    location: 'Lake Ashi & Mt. Fuji View',
    caption: 'Clear skies with Uncle Sam & the squad at Hakone 🗻',
    date: 'Late 2024',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=75&w=800&auto=format&fit=crop',
    rotation: 'rotate-3',
  },
  {
    id: '3',
    tourPackage: 'Tokyo Highlights',
    location: 'Shibuya Crossing & Senso-ji',
    caption: 'Night vibes in Tokyo with our awesome private group ✨',
    date: 'Spring 2024',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=75&w=800&auto=format&fit=crop',
    rotation: '-rotate-3',
  },
  {
    id: '4',
    tourPackage: 'Kyoto Heritage',
    location: 'Fushimi Inari Taisha',
    caption: 'Passing through thousands of vermilion torii gates!',
    date: 'Winter 2024',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=800&auto=format&fit=crop',
    rotation: 'rotate-2',
  },
  {
    id: '5',
    tourPackage: 'Osaka Food Crawl',
    location: 'Dotonbori Glico Sign',
    caption: 'Street food crawl with the crew! Takoyaki night 🐙',
    date: 'Early 2024',
    image: 'https://images.unsplash.com/photo-1590559899731-a372a1464e79?q=75&w=800&auto=format&fit=crop',
    rotation: '-rotate-1',
  },
  {
    id: '6',
    tourPackage: 'Mt. Fuji & Lake Kawaguchi',
    location: 'Chureito Pagoda',
    caption: 'Unreal view of Fuji-san with our VIP joiners 🌸',
    date: 'Spring 2024',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=75&w=800&auto=format&fit=crop',
    rotation: 'rotate-3',
  },
];

const TOUR_FILTERS = [
  'All Tours',
  'Nagoya Discovery',
  'Hakone & Fuji Relax',
  'Tokyo Highlights',
  'Kyoto Heritage',
  'Osaka Food Crawl',
  'Mt. Fuji & Lake Kawaguchi',
];

export default function MomentsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Tours');
  const [activePhoto, setActivePhoto] = useState<PolaroidMoment | null>(null);

  const filteredMoments = MOMENTS.filter((item) =>
    selectedFilter === 'All Tours' ? true : item.tourPackage === selectedFilter
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Black & Maroon Header */}
      <Header />

      {/* 2. Aesthetic Intro Hero */}
      <section className="bg-black border-b border-[#800000]/40 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Watermark Kanji */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/[0.03] text-8xl sm:text-9xl font-black pointer-events-none select-none tracking-widest">
          旅の記憶
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800000]/30 border border-[#800000]/60 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Client Photo Journal</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white mb-4">
            Moments with <span className="text-rose-500 [text-shadow:0_0_25px_rgba(128,0,32,0.8)]">Uncle Sam</span>
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Real memories with real travelers. Here are raw snapshots of our tours across Japan, guiding wonderful guests through the streets, mountains, and historic temples.
          </p>
        </div>
      </section>

      {/* 3. Main Polaroid Wall */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        {/* Tour Package Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {TOUR_FILTERS.map((tourName) => (
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

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 pt-4">
          {filteredMoments.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className={`group cursor-pointer select-none transition-all duration-500 ease-out transform ${item.rotation} hover:rotate-0 hover:-translate-y-4 hover:scale-105 z-10 hover:z-20`}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_45px_rgba(128,0,32,0.28)] border border-zinc-200/90 group-hover:border-[#800000]/60 transition-all duration-500">
                
                {/* Glossy Photo Area */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 rounded-xs shadow-inner">
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter contrast-[1.03]"
                  />
                  
                  {/* Subtle Polaroid vintage vignette on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge floating on hover */}
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
                      {item.tourPackage}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Lightbox Polaroid Modal */}
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
                src={activePhoto.image}
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
                Tour Package: {activePhoto.tourPackage} • {activePhoto.date}
              </span>

              {/* Inquiry CTA */}
              <a
                href={`https://wa.me/818053311738?text=${encodeURIComponent(
                  `Hello UncleSam Tours! I saw your client photo at ${activePhoto.location} (${activePhoto.tourPackage}) and would like to inquire about this exact tour package!`
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

      {/* 5. Black & Maroon Footer */}
      <Footer />
    </div>
  );
}