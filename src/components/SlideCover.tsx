import React from 'react';
import { Mail, MapPin, Linkedin, Github, Terminal, CheckCircle, Bug, Sparkles } from 'lucide-react';
import { Y2KStar, PolaroidFrame } from './BackgroundDecoration';

export default function SlideCover() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-center p-4">
      {/* Kolom Kiri - Teks */}
      <div className="md:col-span-7 flex flex-col justify-between h-full py-2 z-10">
        <div>
          {/* Subtle Y2K sticker accent */}
          <div className="inline-block bg-[#ffe066] border border-neutral-800 text-charcoal font-display text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3 shadow-[2px_2px_0px_#1e293b] rotate-[-2deg] select-none">
            ✨ QA PORTFOLIO 2026
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black font-display text-[#d11450] tracking-tight leading-none mb-1">
            PAULA CARNELIAN TOBING
          </h1>
          
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-xl lg:text-2xl font-bold font-display text-[#ff8000] uppercase tracking-wide">
              QA Engineer
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d11450] animate-pulse" />
            <span className="text-xs bg-neutral-800 text-white font-mono px-2 py-0.5 rounded uppercase">
              Junior Specialist
            </span>
          </div>

          {/* Kontak Card */}
          <div className="bg-white border-2 border-neutral-800 p-4 shadow-[4px_4px_0px_#1e293b] max-w-md space-y-2 relative mb-6">
            <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-2 pointer-events-none">
              <Y2KStar size={24} color="#ffe066" className="fill-[#ffe066]" />
            </div>
            
            <div className="flex items-center gap-3 text-neutral-950 font-sans text-sm font-semibold">
              <div className="w-6 h-6 rounded bg-neutral-150 flex items-center justify-center border border-neutral-300">
                <MapPin size={14} className="text-neutral-850" />
              </div>
              <span>Pekanbaru, Riau</span>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-950 font-sans text-sm font-semibold">
              <div className="w-6 h-6 rounded bg-neutral-150 flex items-center justify-center border border-neutral-300">
                <Mail size={14} className="text-[#d11450]" />
              </div>
              <a href="mailto:paulacarnelian31@gmail.com" className="hover:text-[#d11450] transition-colors underline decoration-dotted">
                paulacarnelian31@gmail.com
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-950 font-sans text-sm font-semibold">
              <div className="w-6 h-6 rounded bg-neutral-150 flex items-center justify-center border border-neutral-300">
                <Linkedin size={14} className="text-blue-700" />
              </div>
              <a href="https://linkedin.com/in/paulacarnelian31" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition-colors underline">
                linkedin.com/in/paulacarnelian31
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-950 font-sans text-sm font-semibold">
              <div className="w-6 h-6 rounded bg-neutral-150 flex items-center justify-center border border-neutral-300">
                <Github size={14} className="text-neutral-950" />
              </div>
              <a href="https://github.com/paulacarneliantobing" target="_blank" rel="noreferrer" className="hover:text-[#d11450] transition-colors underline">
                github.com/paulacarneliantobing
              </a>
            </div>
          </div>
        </div>

        {/* Quote Block */}
        <div className="relative pl-4 border-l-4 border-[#d11450]/80 py-1 italic text-neutral-600 font-sans text-sm max-w-xl">
          <span className="text-2xl font-serif text-[#d11450] absolute -top-2 left-0 opacity-20">"</span>
          Memastikan kualitas bukan sekadar menemukan bug — tapi menjamin pengalaman pengguna yang mulus.
        </div>
      </div>

      {/* Kolom Kanan - Visual Scrapbook */}
      <div className="md:col-span-5 flex flex-col justify-center items-center relative py-4">
        {/* Dynamic Interactive Illustration Card block */}
        <div className="relative w-full max-w-xs md:max-w-sm">
          {/* Polaroid 1: QA Emulator dashboard illustration */}
          <PolaroidFrame 
            caption="Manual_vs_Automation_Tests_2026.png" 
            angle={4} 
            className="w-full z-10"
          >
            <div className="bg-neutral-900 h-full w-full font-mono text-[10px] p-2 text-green-400 overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between border-b border-neutral-800 pb-1 mb-1 text-[8px] text-neutral-500">
                <span>⚡ QA_ENV_LIVE</span>
                <span>STATUS: STABLE</span>
              </div>
              <div className="space-y-1 flex-1">
                <div>python -m unittest test_web_flow.py</div>
                <div className="text-yellow-400">⚡ Initializing Selenium WebDriver...</div>
                <div className="text-neutral-300">✓ Locate Element (id="txtUsername") [OK]</div>
                <div className="text-neutral-300">✓ Fill Credentials & Trigger Login [OK]</div>
                <div className="text-neutral-300">✓ Wait for Dashboard Ingress [OK]</div>
                <div className="text-pink-400 font-bold border-l-2 border-pink-400 pl-1">
                  ! CRITICAL_WARN: API endpoints responsive [240ms]
                </div>
                <div className="text-emerald-400 font-bold">✓ ALL 14 TEST CASES PASSED SUCCESSFULLY 🎉</div>
              </div>
              <div className="flex justify-between items-center text-[8px] bg-neutral-800 p-1 rounded">
                <span className="text-white font-sans font-semibold">Test Completion Suite:</span>
                <span className="bg-emerald-500 text-neutral-900 px-1 font-sans rounded">100% SUCCESS</span>
              </div>
            </div>
          </PolaroidFrame>

          {/* Underlayer decorative stickers floating around */}
          <div className="absolute -top-12 -left-12 pointer-events-none z-0 transform rotate-[-12deg]">
            <Y2KStar size={44} color="#d11450" />
          </div>
          
          <div className="absolute -bottom-8 -right-4 pointer-events-none z-20 transform rotate-[15deg]">
            <div className="bg-rose-100 text-rose-700 px-3 py-1 font-bold text-2xs font-mono uppercase tracking-wider border-2 border-rose-400 rounded-full shadow-md animate-bounce">
              Bug Free Zone 🦟❌
            </div>
          </div>
          
          {/* Sticker on top panel */}
          <div className="absolute -top-4 -right-10 pointer-events-none z-20">
            <Y2KStar size={36} color="#ffe066" className="fill-[#ffe066]" />
          </div>
        </div>

        {/* Small badge in top corner for grad details */}
        <div className="mt-8 md:absolute md:bottom-2 md:right-2 text-right">
          <div className="inline-flex flex-col items-end bg-neutral-900 text-white border border-neutral-800 p-2 shadow-[2px_2px_0px_#ff8000]">
            <span className="text-[10px] font-mono tracking-widest text-[#ff8000] uppercase font-bold">
              Digital Skola Bootcamp
            </span>
            <span className="text-[9px] font-sans text-neutral-400 font-semibold">
              QA Engineer Graduate · 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
