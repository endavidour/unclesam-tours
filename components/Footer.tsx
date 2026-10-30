'use client';

import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappUrl = `https://wa.me/818053311738?text=${encodeURIComponent(
    'Hello UncleSam Tours! I would like to inquire about your tour packages.'
  )}`;

  return (
    <footer className="bg-black border-t border-[#800000]/40 pt-16 pb-8 px-4 sm:px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Blurb */}
        <div>
          <h3 className="text-white font-extrabold text-lg mb-3 tracking-wide">
            UNCLESAM <span className="text-[#800000]">TOURS</span>
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Curated travel packages and immersive tour experiences across Japan. Inquire directly through WhatsApp or Facebook Messenger for reservations, visa assistance, and private group itineraries.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact & Inquiries</h3>
          <ul className="space-y-3.5 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>Quezon City, Metro Manila, Philippines</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="tel:+818053311738" className="hover:text-white transition-colors">
                +81 80-5331-1738
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +81 80-5331-1738 (WhatsApp)
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="mailto:japanthrift2025@gmail.com" className="hover:text-white transition-colors">
                unclesamtours@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-4 h-4 fill-rose-500 shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <a
                href="https://www.facebook.com/unclesamtourservices"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                UncleSam Tours on Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Policies & Assistance */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Tour Policies</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><span>Custom Group Quotes</span></li>
            <li><span>Visa Processing Assistance</span></li>
            <li><span>Payment & Reservation Guidance</span></li>
            <li><span>Travel Insurance Terms</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center border-t border-zinc-900 pt-8 text-zinc-600 text-xs">
        © {new Date().getFullYear()} UncleSam Tours. All rights reserved.
      </div>
    </footer>
  );
}