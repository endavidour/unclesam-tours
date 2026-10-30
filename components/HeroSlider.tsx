'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface JapanSlide {
  name: string;
  kanji: string;
  subtitle: string;
  image: string;
}

const JAPAN_SLIDES: JapanSlide[] = [
  {
    name: 'Nagoya',
    kanji: '名古屋',
    subtitle: 'Historic samurai heritage, feudal castles & vibrant modern culture',
    image: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=75&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Hakone',
    kanji: '箱根',
    subtitle: 'Relaxing onsen thermal baths with panoramic vistas of Mt. Fuji',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=75&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Tokyo',
    kanji: '東京',
    subtitle: 'Electric neon crosswalks, culinary mastery & cutting-edge cityscapes',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=75&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Kyoto',
    kanji: '京都',
    subtitle: 'Ancient vermilion shrines, bamboo groves & preserved teahouses',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=75&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Osaka',
    kanji: '大阪',
    subtitle: 'Japan’s legendary kitchen of street food and buzzing Dotonbori nights',
    image: 'https://images.unsplash.com/photo-1590559899731-a372a1464e79?q=75&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Mt. Fuji',
    kanji: '富士山',
    subtitle: 'The timeless sacred icon towering above five tranquil mirror lakes',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=75&w=1400&auto=format&fit=crop'
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % JAPAN_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = JAPAN_SLIDES[index];

  return (
    <section className="relative w-full h-[78vh] min-h-[520px] overflow-hidden bg-black select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          alt={current.name}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Watermark Kanji Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[12rem] sm:text-[18rem] font-black text-white/[0.04] leading-none tracking-tighter">
          {current.kanji}
        </span>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <span className="text-[#800000] text-sm sm:text-base font-bold tracking-[0.35em] uppercase mb-2">
          {current.kanji} • JAPAN TOUR PACKAGES
        </span>

        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tight uppercase [text-shadow:0_4px_24px_rgba(128,0,32,0.8)]">
          {current.name}
        </h1>

        <p className="text-sm sm:text-lg text-zinc-300 font-light max-w-xl mt-3 mb-8 tracking-wide">
          {current.subtitle}
        </p>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/639667901269?text=${encodeURIComponent(`Hello UncleSam Tours! I want to inquire about tour packages for ${current.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#800000] hover:bg-rose-900 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#800000]/40 transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire for {current.name}
          </a>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + JAPAN_SLIDES.length) % JAPAN_SLIDES.length)}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 border border-zinc-800 text-white hover:border-[#800000] hover:text-rose-400 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % JAPAN_SLIDES.length)}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 border border-zinc-800 text-white hover:border-[#800000] hover:text-rose-400 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {JAPAN_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#800000]' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}