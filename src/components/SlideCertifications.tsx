import React from 'react';
import { Award, GraduationCap, Medal, BadgeCheck, Star, Sparkles } from 'lucide-react';
import { Y2KStar } from './BackgroundDecoration';

export default function SlideCertifications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri: Sertifikasi & Seal Emas BNSP (7 cols) */}
      <div className="md:col-span-7 space-y-4">
        <div>
          {/* Title bar */}
          <div className="relative inline-block mb-1">
            <span className="absolute inset-0 bg-[#ffe066] transform -rotate-1 skew-x-2 scale-105 z-0 border border-neutral-850" />
            <h2 className="relative z-10 text-xl lg:text-2xl font-black font-display text-[#d11450] tracking-wider uppercase px-2">
              CERTIFICATIONS & EDUCATION
            </h2>
          </div>
          <p className="text-3xs text-neutral-500 font-mono tracking-wide">
            KREDENSIAL KOMPETENSI REKAYASA KUALITAS · VERIFIED
          </p>
        </div>

        {/* Certifications Block */}
        <div className="space-y-3">
          {/* Certificate 1: BNSP */}
          <div className="bg-white border-2 border-neutral-800 p-4.5 shadow-[3px_3px_0px_#1e293b] flex items-start gap-4 transition-all hover:scale-[1.01] relative overflow-hidden group">
            {/* BNSP Gold Stamp badge on the right side */}
            <div className="absolute top-2 right-2 md:right-4 z-10 select-none group-hover:rotate-12 transition-transform duration-300">
              {/* BNSP Gold Seal Ornament */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 border-2 border-amber-200 shadow flex flex-col items-center justify-center relative p-1 animate-pulse">
                <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-100" />
                <Medal size={16} className="text-amber-950" />
                <span className="text-[6px] font-mono text-amber-950 font-black tracking-tighter uppercase mt-0.5">BNSP SEAL</span>
              </div>
            </div>

            <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-600">
              <Award size={20} />
            </div>
            
            <div className="pr-12 md:pr-14">
              <span className="text-3xs font-mono font-bold uppercase text-[#ff8000]">Sertifikasi Kompetensi Nasional</span>
              <h3 className="font-display font-black text-neutral-800 text-xs sm:text-sm tracking-tight leading-tight">
                QA Engineer Basic Automation & Testing
              </h3>
              <p className="text-2xs text-neutral-500 font-sans mt-0.5">
                Badan Nasional Sertifikasi Profesi (BNSP)
              </p>
              <span className="inline-block mt-1.5 bg-neutral-900 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest">
                ID: BNSP-QA-2026-X8
              </span>
            </div>
          </div>

          {/* Certificate 2: SoftUni */}
          <div className="bg-white border-2 border-neutral-800 p-4.5 shadow-[3px_3px_0px_#1e293b] flex items-start gap-4 transition-all hover:scale-[1.01]">
            <div className="p-2 bg-blue-50 rounded border border-blue-200 text-blue-600">
              <BadgeCheck size={20} />
            </div>
            <div>
              <span className="text-3xs font-mono font-bold uppercase text-blue-600">Magang Studi Independen Bersertifikat (MSIB)</span>
              <h3 className="font-display font-black text-neutral-800 text-xs sm:text-sm tracking-tight leading-tight">
                Programming Basics Specialty
              </h3>
              <p className="text-2xs text-neutral-500 font-sans mt-0.5">
                SoftUni Indonesia · Software Engineering Track
              </p>
              <p className="text-[9px] text-[#d11450]/80 font-mono italic mt-1 font-semibold">
                ✓ Menguasai Algoritma Dasar, Logika Pemrograman Kondisional & Perulangan (Loops)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Detail Pendidikan & Cumlaude Star (5 cols) */}
      <div className="md:col-span-5 w-full z-10">
        <div className="border-2 border-neutral-800 bg-white p-4.5 shadow-[4px_4px_0px_#1e293b] min-h-[290px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Header background band */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff8000]" />
          
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="text-[#ff8000] w-6 h-6 shrink-0" />
            <span className="text-[9px] font-mono uppercase tracking-widest font-black text-neutral-400">Pendidikan Tinggi</span>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <span className="text-3xs font-semibold font-mono text-neutral-400 uppercase">Gelar Akademik S1:</span>
              <h3 className="font-display font-black text-neutral-800 text-base leading-tight mt-0.5">
                S1 Teknik Informatika
              </h3>
              
              <div className="inline-flex items-center justify-center gap-1.5 mt-2 px-3 py-1 border-2 border-dashed border-[#ff8000] bg-[#fffbeb] rotate-[-1.5deg] text-[#ff8000] font-sans font-black text-xs uppercase shadow-sm animate-bounce">
                <Star size={12} className="fill-[#ff8000]" />
                <span>Predikat: Cumlaude ✨</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-stone-100 pb-1 text-2xs">
                <span className="text-neutral-500 font-sans">Universitas:</span>
                <span className="text-neutral-800 font-sans font-bold text-right">Univ. Muhammadiyah Riau</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1 text-2xs">
                <span className="text-neutral-500 font-sans">IPK Akhir:</span>
                <span className="text-[#d11450] font-mono font-bold text-right">3.75 / 4.00</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1 text-2xs">
                <span className="text-neutral-500 font-sans">Tahun Studi:</span>
                <span className="text-neutral-800 font-sans font-bold text-right">2022 – 2026</span>
              </div>
            </div>

            <div className="bg-neutral-50 p-2 border border-neutral-200 rounded text-3xs text-neutral-500 font-sans leading-relaxed">
              <strong>Skripsi Penelitian:</strong> Penggabungan Algoritma Rekurensi Deep Learning LSTM dengan Adam Optimizer untuk peramalan time series, menghasilkan akurasi tinggi (R² &gt; 0.94).
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-3xs font-mono text-neutral-400 uppercase tracking-widest">
            <span>UMRI Alumna 🎓</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
