import React from 'react';
import { Mail, Phone, Linkedin, Github, MessageSquare, QrCode, Sparkles } from 'lucide-react';
import { Y2KStar } from './BackgroundDecoration';

export default function SlideClosing() {
  return (
    <div className="flex flex-col justify-between h-full text-white p-4 text-center items-center justify-items-center relative">
      {/* Decorative stars in white outline */}
      <div className="absolute top-6 left-6 opacity-30 animate-pulse">
        <Y2KStar size={32} color="#ffffff" />
      </div>
      <div className="absolute bottom-6 right-6 opacity-30">
        <Y2KStar size={36} color="#ffffff" />
      </div>
      <div className="absolute top-1/2 right-12 opacity-15 hidden md:block">
        <Y2KStar size={64} color="#ffe066" />
      </div>

      <div className="my-auto space-y-6 max-w-xl z-10">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-4xl lg:text-5xl font-black font-display text-[#ffe066] tracking-tight animate-pulse">
            TERIMA KASIH
          </h2>
          <p className="text-sm font-sans text-slate-300 font-medium">
            Mari terhubung dan berkolaborasi memastikan kualitas bersama!
          </p>
        </div>

        {/* Contact info list box with glowing card border style */}
        <div className="bg-[#0b0f19] border-2 border-slate-700 p-5 shadow-lg text-left max-w-md mx-auto space-y-3 relative font-sans text-sm">
          
          <div className="flex items-center gap-3 text-white border-b border-slate-800/80 pb-2 last:border-none last:pb-0">
            <Mail size={16} className="text-[#ffe066] shrink-0" />
            <a href="mailto:paulacarnelian31@gmail.com" className="text-white hover:text-[#ffe066] transition-colors underline decoration-dotted font-bold tracking-wide">
              paulacarnelian31@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3 text-white border-b border-slate-800/80 pb-2 last:border-none last:pb-0">
            <Phone size={16} className="text-[#ffe066] shrink-0" />
            <a href="tel:+6287743157122" className="text-white hover:text-[#ffe066] transition-colors font-bold tracking-wide">
              +62 877 4315 7122
            </a>
          </div>

          <div className="flex items-center gap-3 text-white border-b border-slate-800/80 pb-2 last:border-none last:pb-0">
            <Linkedin size={16} className="text-sky-300 shrink-0" />
            <a href="https://linkedin.com/in/paulacarnelian31" target="_blank" rel="noreferrer" className="text-white hover:text-[#ffe066] transition-colors underline font-bold tracking-wide">
              linkedin.com/in/paulacarnelian31
            </a>
          </div>

          <div className="flex items-center gap-3 text-white last:border-none last:pb-0">
            <Github size={16} className="text-slate-100 shrink-0" />
            <a href="https://github.com/paulacarneliantobing" target="_blank" rel="noreferrer" className="text-white hover:text-[#ffe066] transition-colors underline font-bold tracking-wide">
              github.com/paulacarneliantobing
            </a>
          </div>
        </div>

        {/* Quote details */}
        <div className="space-y-1.5 pt-1">
          <blockquote className="italic text-xs text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
            "Quality is never an accident. It is always the result of intelligent effort."
          </blockquote>
          <cite className="block text-2xs font-mono font-bold uppercase tracking-wider text-[#ffe066]">
            — John Ruskin
          </cite>
        </div>
      </div>

      {/* Footer credits and visual QR code sticker */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center text-3xs text-slate-500 font-mono pt-4 border-t border-slate-800 uppercase tracking-widest z-10 gap-2">
        <span>Paula Carnelian Tobing · QA Portfolio</span>
        
        {/* Cute Interactive QR Code simulation badge */}
        <div className="inline-flex items-center gap-1.5 bg-slate-900/40 px-2 py-1 rounded border border-slate-800 hover:border-slate-700 transition-all group cursor-help">
          <QrCode size={12} className="text-[#ffe066] transition-transform group-hover:scale-110" />
          <span className="text-[9px] text-slate-400 font-mono">Scan LinkedIn</span>
          
          {/* Tooltip drawer containing simulated high fidelity vector scan barcode */}
          <div className="absolute right-4 bottom-14 bg-white text-neutral-800 border-2 border-neutral-800 p-2 shadow-xl hidden group-hover:flex flex-col items-center gap-1 cursor-default z-50">
            {/* Custom 2D vector QR barcode matrix layout */}
            <div className="w-24 h-24 bg-neutral-950 p-1 rounded-sm grid grid-cols-6 gap-0.5">
              <div className="bg-white rounded-2xs" /><div className="bg-neutral-950" /><div className="bg-white rounded-2xs" /><div className="bg-white" /><div className="bg-white rounded-2xs" /><div className="bg-white" />
              <div className="bg-neutral-950" /><div className="bg-white" /><div className="bg-neutral-950" /><div className="bg-white" /><div className="bg-neutral-950" /><div className="bg-neutral-950" />
              <div className="bg-white rounded-2xs" /><div className="bg-neutral-950" /><div className="bg-white rounded-2xs" /><div className="bg-white" /><div className="bg-neutral-950" /><div className="bg-white" />
              <div className="bg-white" /><div className="bg-white" /><div className="bg-neutral-950" /><div className="bg-neutral-950" /><div className="bg-white" /><div className="bg-neutral-950" />
              <div className="bg-neutral-950" /><div className="bg-white" /><div className="bg-white" /><div className="bg-neutral-950" /><div className="bg-white rounded-2xs" /><div className="bg-white" />
              <div className="bg-white rounded-2xs" /><div className="bg-neutral-955" /><div className="bg-white" /><div className="bg-white" /><div className="bg-neutral-950" /><div className="bg-white rounded-2xs" />
            </div>
            <span className="text-[7px] font-mono tracking-tighter text-neutral-500 text-center uppercase">paula-linkedin-qr-code</span>
          </div>
        </div>

        <span>EST. 2026</span>
      </div>
    </div>
  );
}
