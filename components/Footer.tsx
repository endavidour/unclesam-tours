'use client';

import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#800000]/40 pt-16 pb-8 px-4 sm:px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Blurb */}
        <div>
          <h3 className="text-white font-extrabold text-lg mb-3 tracking-wide">
            UNCLESAM <span className="text-[#800000]">TOURS</span>
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Curated travel packages and immersive tour experiences across Japan, Southeast Asia, and beyond. Inquire directly through WhatsApp or Facebook Messenger for reservations, visa assistance, and private group itineraries.
          </p>
        </div>

        {/* Contact Information[cite: 1] */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact & Inquiries</h3>
          <ul className="space-y-3.5 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>Quezon City, Metro Manila, Philippines[cite: 1]</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="tel:+639667901269" className="hover:text-white transition-colors">
                +63 966 790 1269[cite: 1]
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="mailto:japanthrift2025@gmail.com" className="hover:text-white transition-colors">
                unclesamtours@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="https://facebook.com/unclesamtours" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                UncleSam Tours on Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Policies & Assistance */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Tour Policies</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><span className="text-zinc-400">Custom Group Quotes</span></li>
            <li><span className="text-zinc-400">Visa Processing Assistance</span></li>
            <li><span className="text-zinc-400">Payment & Reservation Guidance</span></li>
            <li><span className="text-zinc-400">Travel Insurance Terms</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center border-t border-zinc-900 pt-8 text-zinc-600 text-xs">
        © {new Date().getFullYear()} UncleSam Tours. All rights reserved.
      </div>
    </footer>
  );
}