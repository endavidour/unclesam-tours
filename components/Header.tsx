'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Phone, MapPin, Settings } from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export default function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-black border-b border-[#800000]/40 shadow-2xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-[#800000] shadow-lg group-hover:border-rose-500 transition-all duration-300 bg-black flex-shrink-0">
              <Image
                src="/unclesam-tours-logo.png"
                alt="UncleSam Tours Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase flex items-center gap-1.5">
                UNCLESAM <span className="text-xs px-2 py-0.5 rounded bg-[#800000] text-rose-100 font-bold tracking-wider">TOURS</span>
              </span>
              <span className="text-[10px] text-zinc-400 tracking-widest uppercase hidden sm:block">
                Exclusive Travel Packages
              </span>
            </div>
          </Link>

          {/* Search Box */}
          {onSearchChange && (
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search destinations (Nagoya, Tokyo, Hakone...)"
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#800000] transition-colors"
                />
              </div>
            </div>
          )}

          {/* Direct Channels */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="https://www.google.com/maps?sca_esv=77821bc6db13ead3&output=search&q=Unclesam+Thrift+Shop,+Malumanay,+Diliman,+Quezon+City,+Metro+Manila&source=lnms"
              target="_blank"
              rel="noopener noreferrer"
              title="Locate Us"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-rose-400 hover:border-[#800000] transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>
            <a
              href="tel:+639667901269"
              title="Call Us"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-rose-400 hover:border-[#800000] transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/unclesamtours"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#800000] hover:bg-rose-900 text-white text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <Link
              href="/admin"
              title="Admin Dashboard"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#800000] transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}