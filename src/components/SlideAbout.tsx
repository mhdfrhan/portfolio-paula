import React from 'react';
import { GraduationCap, Award, Briefcase, Sparkles, BookOpen } from 'lucide-react';
import { Y2KStar } from './BackgroundDecoration';

export default function SlideAbout() {
  const highlights = [
    {
      icon: <GraduationCap className="text-[#ffe066] w-6 h-6" />,
      title: "🎓 S1 Teknik Informatika",
      subtitle: "UMRI, 2022–2026",
      desc: "Universitas Muhammadiyah Riau. Mempelajari RPL, Basis Data, dan Rekayasa Kualitas Perangkat Lunak secara mendalam.",
      accent: "border-l-4 border-blue-400"
    },
    {
      icon: <Award className="text-[#d11450] w-6 h-6" />,
      title: "🏆 Cumlaude 3.75 GPA",
      subtitle: "Skripsi: LSTM + Adam",
      desc: "Lulus dengan predikat Cumlaude. Penelitian berfokus pada deep learning (LSTM + Adam Optimizer untuk prediksi data runtun waktu).",
      accent: "border-l-4 border-pink-500"
    },
    {
      icon: <Briefcase className="text-emerald-500 w-6 h-6" />,
      title: "💼 QA Bootcamp Graduate",
      subtitle: "Digital Skola, 2026",
      desc: "Bootcamp intensif (Maret–April 2026) dengan fokus hands-on Manual, Automation, API, Mobiles & Load Testing.",
      accent: "border-l-4 border-emerald-500"
    }
  ];

  return (
    <div className="flex flex-col justify-between h-full p-4 relative">
      <div>
        {/* Title banner */}
        <div className="relative inline-block mb-4">
          <span className="absolute inset-0 bg-[#ffe066] transform -rotate-1 skew-x-3 scale-110 z-0 border border-neutral-800" />
          <h2 className="relative z-10 text-2xl lg:text-3xl font-black font-display text-[#d11450] tracking-wider uppercase px-2">
            ABOUT ME
          </h2>
        </div>
        
        {/* Paragraph section */}
        <div className="bg-white border-2 border-neutral-800 p-5 shadow-[4px_4px_0px_#1e293b] mb-6 max-w-4xl relative">
          <div className="absolute top-2 right-2 flex gap-1">
            <Y2KStar size={16} color="#d11450" />
            <Y2KStar size={12} color="#ffe066" />
          </div>
          <p className="text-neutral-700 font-sans leading-relaxed text-sm lg:text-base font-medium">
            Lulusan S1 Teknik Informatika Universitas Muhammadiyah Riau (IPK 3.75 — Cumlaude). 
            Berfokus pada <span className="text-[#d11450] font-bold">Software Quality Assurance</span> dengan pengalaman 
            praktis di <span className="font-semibold underline decoration-[#ff8000] decoration-2">Manual Testing</span>,{' '}
            <span className="font-semibold underline decoration-blue-500 decoration-2">Automation Testing</span>,{' '}
            <span className="font-semibold underline decoration-emerald-500 decoration-2">API Testing</span>, dan{' '}
            <span className="font-semibold underline decoration-purple-500 decoration-2">Mobile Testing</span> melalui program 
            bootcamp intensif di <span className="text-neutral-900 font-bold">Digital Skola</span> (Maret–April 2026).
          </p>
        </div>
      </div>

      {/* Grid container with 3 Highlight Cards in soft navy-blue tint background */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full z-10">
        {highlights.map((item, index) => (
          <div 
            key={index}
            className={`bg-[#0f172a] text-white p-4 border border-slate-700 shadow-lg relative rounded-none flex flex-col justify-between hover:scale-[1.02] transform transition-all duration-200 group`}
          >
            {/* Slide decoration lines */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-${index === 0 ? 'amber' : index === 1 ? 'rose' : 'emerald'}-400`} />
            
            <div>
              {/* Card top row */}
              <div className="flex items-center justify-between mb-3">
                <span className="p-1.5 rounded bg-slate-800 border border-slate-700">
                  {item.icon}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                  HL-0{index + 1}
                </span>
              </div>
              
              <h3 className="font-display font-black text-sm lg:text-base text-white tracking-wide mb-1">
                {item.title}
              </h3>
              
              <h4 className="font-mono text-xs text-[#ffe066] font-bold mb-2">
                {item.subtitle}
              </h4>
              
              <p className="text-xs text-slate-300 font-sans leading-relaxed group-hover:text-white transition-colors">
                {item.desc}
              </p>
            </div>
            
            {/* Subtle card bottom accent */}
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-mono text-slate-500">
              <span>Status: Verified</span>
              <BookOpen size={10} className="text-[#ffe066]" />
            </div>
          </div>
        ))}
      </div>

      {/* Background Star decors */}
      <div className="absolute bottom-8 right-8 opacity-20 hidden lg:block select-none pointer-events-none">
        <Y2KStar size={72} color="#ff8000" />
      </div>
    </div>
  );
}
