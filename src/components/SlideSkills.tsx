import React, { useState } from 'react';
import { ShieldCheck, Cpu, Wrench, BadgeCheck, HelpCircle } from 'lucide-react';
import { Y2KStar } from './BackgroundDecoration';

export default function SlideSkills() {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    level: string;
    desc: string;
  } | null>({
    name: "Manual Testing & QA Fundamentals",
    level: "Expertise: Core STLC Model",
    desc: "Menulis Test Case komprehensif, mengelola Bug Lifecycle (menemukan, menulis laporan, mereview rilis), serta kolaborasi Agile/Scrum Sprint."
  });

  const skillsData = {
    testing: [
      { name: "Manual Testing", level: "Core Specialty", desc: "Perancangan Test Case terperinci menggunakan klasifikasi Positive, Negative, Boundary Value & Error Guessing." },
      { name: "Automation Testing", level: "Framework Architect", desc: "Membangun otomatisasi penjelajah UI web & mobile memakai Python webdriver dan unit-test assertions." },
      { name: "API Testing & Validation", level: "Validation Master", desc: "Membuat collection request HTTP methods terstruktur, scripting evaluasi data kunci JSON di Postman." },
      { name: "Load Testing", level: "Performance Expert", desc: "Merancang script simulasi beban concurrency memakai k6 dan mengukur response times server backend API." },
      { name: "Mobile Testing", level: "Integration Master", desc: "Menghubungkan device virtual Android, mencari XPath node locator stabil pakai Appium Inspector." },
      { name: "Test Case Design", level: "STLC Analyst", desc: "Merancang skenario fungsionalitas kompleks dari dokumen requirement system SRS." },
      { name: "Bug Reporting & Tracking", level: "Jira Specialty", desc: "Menulis laporan bug berkualitas tinggi yang jelas, reprodusibel, lengkap dengan screenshots and console logs." },
      { name: "SDLC & STLC Models", level: "Core Knowledge", desc: "Memahami tahapan software, testing loops, v-model, waterfall, hingga integrasi rilis continuous (CI)." }
    ],
    tools: [
      { name: "Postman", level: "Advanced Tooling", desc: "Postman API client runner, scripting Javascript tests, mock servers dan parameter environment." },
      { name: "Selenium", level: "Automation Core", desc: "Selenium WebDriver Python untuk Web automation dengan Page Object Model (POM) yang tangguh." },
      { name: "Appium", level: "Android Core", desc: "Mobile automation testing untuk app native (.apk) Android melalui platform driver Appium." },
      { name: "Jira", level: "Productivity Tool", desc: "Manajemen backlog sprint Agile, pembuatan bug ticket, monitoring progress Kanban board." },
      { name: "Git / GitHub", level: "Version Control", desc: "Distributed version control, branching strategy dev-to-main, merging conflicts resolution." }
    ],
    programming: [
      { name: "Python", level: "Primary Language", desc: "Digunakan untuk menulis script automation Selenium Web, framework Pytest, serta automation mobile Appium." },
      { name: "JavaScript", level: "Web Query Logic", desc: "Digunakan untuk scripting test logic fungsional di Postman dan trigger DOM manipulasi." },
      { name: "HTML & CSS Locator", level: "UI Mapping", desc: "Paham hierarki DOM, relasi tag anak-bapak, class selection, dan ID selector yang presisi." },
      { name: "SQL Dasar", level: "DB Verifier", desc: "Paham schema database, menjalankan query DQL (SELECT, JOIN, WHERE) untuk memverifikasi data integrasi back-end." }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri: Tiga Kategori Utama */}
      <div className="lg:col-span-8 space-y-4">
        <div>
          {/* Title bar */}
          <div className="relative inline-block mb-1">
            <span className="absolute inset-0 bg-[#ffe066] transform -rotate-1 skew-x-2 scale-105 z-0 border border-neutral-850" />
            <h2 className="relative z-10 text-xl lg:text-2xl font-black font-display text-[#d11450] tracking-wider uppercase px-2">
              SKILLS & TOOLS PETA KEMAMPUAN
            </h2>
          </div>
          <p className="text-3xs sm:text-2xs text-neutral-500 font-sans tracking-wide">
            Ketuk pada nama kemampuan apa saja untuk meneliti detail kualifikasi di panel kanan.
          </p>
        </div>

        {/* 3 Columns Grid for Testing, Tools, and Coding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Col 1: Testing Skills (Warm Peach/Amber Background) */}
          <div className="bg-[#fffbeb] border-2 border-[#fef3c7] p-3 text-neutral-800 relative shadow-sm">
            <h3 className="font-display font-black text-[#b45309] text-xs uppercase tracking-wider mb-2 pb-1 border-b border-amber-200 flex items-center gap-1">
              <ShieldCheck size={14} /> Testing Skills:
            </h3>
            <div className="space-y-1">
              {skillsData.testing.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedItem(skill)}
                  className={`w-full text-left px-1.5 py-1 text-2xs font-sans rounded transition-all cursor-pointer flex items-center justify-between group ${selectedItem?.name === skill.name ? 'bg-[#b45309] text-white font-bold' : 'hover:bg-amber-150 text-neutral-700'}`}
                >
                  <span className="truncate">⭐ {skill.name}</span>
                  <span className={`text-[8px] font-mono uppercase bg-amber-100 text-[#b45309] px-1 rounded-sm group-hover:bg-amber-200 ${selectedItem?.name === skill.name ? 'bg-amber-900 text-amber-200' : ''}`}>
                    View
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Tools (Soft Mint/Teal background) */}
          <div className="bg-[#f0fdf4] border-2 border-[#dcfce7] p-3 text-neutral-800 relative shadow-sm">
            <h3 className="font-display font-black text-[#15803d] text-xs uppercase tracking-wider mb-2 pb-1 border-b border-emerald-250 flex items-center gap-1">
              <Wrench size={14} /> Tools:
            </h3>
            <div className="space-y-1">
              {skillsData.tools.map((tool, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedItem(tool)}
                  className={`w-full text-left px-1.5 py-1 text-2xs font-sans rounded transition-all cursor-pointer flex items-center justify-between group ${selectedItem?.name === tool.name ? 'bg-[#15803d] text-white font-bold' : 'hover:bg-emerald-100 text-neutral-700'}`}
                >
                  <span className="truncate">🔧 {tool.name}</span>
                  <span className={`text-[8px] font-mono uppercase bg-emerald-100 text-[#15803d] px-1 rounded-sm group-hover:bg-emerald-200 ${selectedItem?.name === tool.name ? 'bg-emerald-900 text-emerald-100' : ''}`}>
                    View
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Programming (Soft Violet background) */}
          <div className="bg-[#faf5ff] border-2 border-[#f3e8ff] p-3 text-neutral-800 relative shadow-sm">
            <h3 className="font-display font-black text-[#6b21a8] text-xs uppercase tracking-wider mb-2 pb-1 border-b border-purple-250 flex items-center gap-1">
              <Cpu size={14} /> Coding / DB:
            </h3>
            <div className="space-y-1">
              {skillsData.programming.map((prog, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedItem(prog)}
                  className={`w-full text-left px-1.5 py-1 text-2xs font-sans rounded transition-all cursor-pointer flex items-center justify-between group ${selectedItem?.name === prog.name ? 'bg-[#6b21a8] text-white font-bold' : 'hover:bg-purple-100 text-neutral-700'}`}
                >
                  <span className="truncate">💻 {prog.name}</span>
                  <span className={`text-[8px] font-mono uppercase bg-purple-100 text-[#6b21a8] px-1 rounded-sm group-hover:bg-purple-200 ${selectedItem?.name === prog.name ? 'bg-purple-900 text-purple-100' : ''}`}>
                    View
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Detail Panel Animasi/Scrapbook */}
      <div className="lg:col-span-4 w-full z-10">
        <div className="border-2 border-neutral-800 bg-white p-4.5 shadow-[4px_4px_0px_#1e293b] h-full flex flex-col justify-between min-h-[290px] relative">
          
          {/* Sticker detail overlay */}
          <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-2 pointer-events-none">
            <Y2KStar size={28} color="#ffe066" className="fill-[#ffe066]" />
          </div>

          {selectedItem ? (
            <div className="space-y-3.5">
              <div className="border-b border-neutral-100 pb-2">
                <span className="text-[9px] font-mono text-[#d11450]/80 font-bold block uppercase tracking-widest">
                  {selectedItem.level}
                </span>
                <h4 className="font-display font-black text-[#d11450] text-sm lg:text-base leading-tight">
                  {selectedItem.name}
                </h4>
              </div>

              <div>
                <span className="text-[8px] font-mono text-neutral-400 block uppercase mb-1">Deksripsi Kompetensi:</span>
                <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                  {selectedItem.desc}
                </p>
              </div>

              <div className="bg-neutral-50 p-2.5 border border-dashed border-neutral-250 rounded text-3xs text-neutral-500 font-sans leading-relaxed">
                <span>Paula mengintegrasikan metodologi ini untuk menghasilkan automasi yang andal, mengurangi tingkat regresi rilis sebesar 90%+.</span>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center space-y-2 text-neutral-400 py-6">
              <HelpCircle size={28} className="mx-auto text-neutral-350" />
              <p className="text-2xs font-sans">Ketuk salah satu keterampilan untuk membaca penjelasan teknis secara mendalam di sini.</p>
            </div>
          )}

          {/* Footer certification highlight sticker */}
          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-3xs font-mono text-neutral-400">
            <span>QA SYSTEM SPECIALIST</span>
            <BadgeCheck size={12} className="text-emerald-500 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
