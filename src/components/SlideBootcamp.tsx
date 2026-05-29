import React, { useState } from 'react';
import { Check, ClipboardList, PenTool, Award, Play, AlertCircle, RefreshCw } from 'lucide-react';
import { Y2KStar } from './BackgroundDecoration';

const CALC_CODE = [
  'export function kalkulator(angka1, angka2, operator) {',
  '  switch (operator) {',
  '    case "+":',
  '      return angka1 + angka2;',
  '    case "-":',
  '      return angka1 - angka2;',
  '    case "*":',
  '      return angka1 * angka2;',
  '    case "/":',
  '      if (angka2 === 0) {',
  '        return "Tidak bisa dibagi dengan nol!";',
  '      }',
  '      return angka1 / angka2;',
  '    default:',
  '      return "Operator tidak valid!";',
  '  }',
  '}'
].join('\n');

const PYRAMID_CODE = [
  'let tinggi = 4;',
  'for (let i = 1; i <= tinggi; i++) {',
  '  let baris = "";',
  '  for (let j = 1; j <= i; j++) {',
  '    baris += "*";',
  '  }',
  '  console.log(baris);',
  '}'
].join('\n');

export default function SlideBootcamp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(1); // represented in stats as 100/100 initially! But let them play a simulator
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [cardMode, setCardMode] = useState<'QUIZ' | 'JS_CALC'>('QUIZ');
  const [num1, setNum1] = useState<string>('12');
  const [num2, setNum2] = useState<string>('4');
  const [operator, setOperator] = useState<string>('+');
  const [calcResult, setCalcResult] = useState<string>('');
  const [jsCodeTab, setJsCodeTab] = useState<'CALC' | 'PYRAMID'>('CALC');

  const quizQuestions = [
    {
      q: "Manakah locator yang paling stabil untuk UI automation?",
      opts: ["XPath Dinamis", "ID Atribute", "Class Name", "Link Text"],
      correct: 1,
      exp: "ID Attribute adalah locator paling stabil dan tercepat karena bersifat unik."
    },
    {
      q: "Apa target utama dari pengujian fungsional API (Functional API Testing)?",
      opts: ["Load endurance", "Kecepatan loading", "Validasi response data", "Sintaks file JSON"],
      correct: 2,
      exp: "Functional testing memverifikasi status code, header, dan integritas data body."
    },
    {
      q: "Dalam automation testing, apa fungsi utama Page Object Model (POM)?",
      opts: ["Mengurangi redundansi kode", "Mendesain GUI", "Merekam video testing", "Memantau CPU server"],
      correct: 0,
      exp: "POM memisahkan fungsionalitas halaman dari skrip uji sejati, meningkatkan reusable code."
    }
  ];

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    const isCorrect = idx === quizQuestions[currentQuestion].correct;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    setAnsweredCount(prev => prev + 1);
  };

  const handleNextQuiz = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setAnsweredCount(0);
    setQuizFinished(false);
  };

  const runCalculator = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) {
      setCalcResult("Error: Input tidak valid!");
      return;
    }
    
    switch (operator) {
      case '+': setCalcResult((n1 + n2).toString()); break;
      case '-': setCalcResult((n1 - n2).toString()); break;
      case '*': setCalcResult((n1 * n2).toString()); break;
      case '/': 
        if (n2 === 0) {
          setCalcResult("Tidak bisa dibagi dengan nol!");
        } else {
          setCalcResult((n1 / n2).toString());
        }
        break;
      default: setCalcResult("Operator tidak valid!");
    }
  };

  const scorePercentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri: Detail Topik dan Deskripsi (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Title block */}
          <div className="inline-block bg-[#ffe066] border border-neutral-800 text-charcoal font-display text-xs font-bold uppercase tracking-widest px-3 py-1 scale-95 origin-left rotate-[-1deg] select-none">
            Digital Skola · Maret – April 2026
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-black font-display text-[#d11450] tracking-tight leading-none mt-1 mb-3">
            QA ENGINEER BOOTCAMP
          </h2>

          {/* Stat Cards - 4 Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-white border-2 border-neutral-800 p-2 text-center shadow-[2px_2px_0px_#1e293b]">
              <span className="block text-2xl font-black font-display text-[#d11450]">14</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Topik Selesai</span>
            </div>
            <div className="bg-white border-2 border-neutral-800 p-2 text-center shadow-[2px_2px_0px_#1e293b]">
              <span className="block text-2xl font-black font-display text-emerald-600">100%</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Task Progress</span>
            </div>
            <div className="bg-white border-2 border-neutral-800 p-2 text-center shadow-[2px_2px_0px_#1e293b]">
              <span className="block text-2xl font-black font-display text-[#ff8000]">95.4</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Homework Score</span>
            </div>
            <div className="bg-white border-2 border-neutral-800 p-2 text-center shadow-[2px_2px_0px_#1e293b]">
              <span className="block text-2xl font-black font-display text-blue-600">
                {answeredCount > 0 ? `${scorePercentage}` : "100"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Quiz Score</span>
            </div>
          </div>
        </div>

        {/* Topik vs Tools Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-amber-50/50 border border-amber-200 p-3 h-full">
            <h3 className="font-display font-black text-[#d11450] text-xs uppercase tracking-wider mb-2 border-b border-amber-200 pb-1 flex items-center gap-1.5">
              <ClipboardList size={12} /> Topik Yang Dipelajari:
            </h3>
            <ul className="space-y-1 text-xs font-sans text-neutral-700">
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> QA Fundamentals & Testing Theory
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> Bug Reporting & Test Case Design
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> Git & Distributed Version Control
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> API Testing & automation (Postman)
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> Web UI Automation (Selenium WebDriver)
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> Load Testing & Performance metrics
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#d11450]">✓</span> Mobile Testing & Automation (Appium)
              </li>
            </ul>
          </div>

          <div className="bg-blue-50/50 border border-blue-200 p-3 h-full">
            <h3 className="font-display font-black text-blue-800 text-xs uppercase tracking-wider mb-2 border-b border-blue-200 pb-1 flex items-center gap-1.5">
              <PenTool size={12} /> Tools Yang Dikuasai:
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="bg-orange-100 text-orange-800 text-[10px] uppercase font-mono px-1.5 py-0.5 border border-orange-200 font-bold">Postman</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-mono px-1.5 py-0.5 border border-emerald-200 font-bold">Selenium</span>
              <span className="bg-violet-100 text-violet-800 text-[10px] uppercase font-mono px-1.5 py-0.5 border border-violet-200 font-bold">Appium</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] uppercase font-mono px-1.5 py-0.5 border border-blue-200 font-bold">Jira</span>
              <span className="bg-neutral-800 text-neutral-100 text-[10px] uppercase font-mono px-1.5 py-0.5 border border-neutral-700 font-bold">Git / GitHub</span>
            </div>
            
            <h3 className="font-display font-black text-blue-800 text-2xs uppercase tracking-wider mt-3 mb-1">
              Metodologi Kerja:
            </h3>
            <p className="text-2xs text-neutral-600 font-sans leading-relaxed">
              Menguasai SDLC & STLC, pembuatan Skenario Uji (Test Case & Test Suite), Bug Lifecycle, 
              serta implementasi Agile/Scrum dalam tim pengembangan perangkat lunak.
            </p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Simulator Quiz / JS Sandbox (5 cols) */}
      <div className="lg:col-span-5 w-full">
        <div className="border-2 border-neutral-800 bg-white shadow-[4px_4px_0px_#1e293b] p-4 relative overflow-hidden min-h-[350px] flex flex-col justify-between">
          
          {/* Header tabs toggle */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-stone-250 pb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5">
                {cardMode === 'QUIZ' ? '🎓 MINI QA QUIZ' : '💻 JS SANDBOX'}
              </span>
              
              <div className="flex gap-1 border border-neutral-250 bg-neutral-50 p-0.5 rounded-sm">
                <button 
                  onClick={() => setCardMode('QUIZ')}
                  className={`px-1.5 py-0.5 text-[8px] font-sans font-bold uppercase rounded-sm transition-all ${cardMode === 'QUIZ' ? 'bg-[#d11450] text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
                >
                  Quiz
                </button>
                <button 
                  onClick={() => setCardMode('JS_CALC')}
                  className={`px-1.5 py-0.5 text-[8px] font-sans font-bold uppercase rounded-sm transition-all ${cardMode === 'JS_CALC' ? 'bg-[#d11450] text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
                >
                  JS Code
                </button>
              </div>
            </div>

            {cardMode === 'QUIZ' ? (
              !quizFinished ? (
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-neutral-800 text-xs tracking-tight min-h-[36px]">
                    {quizQuestions[currentQuestion].q}
                  </h4>

                  <div className="space-y-1.5">
                    {quizQuestions[currentQuestion].opts.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrectAnswer = quizQuestions[currentQuestion].correct === idx;
                      const isWrongSelection = isSelected && !isCorrectAnswer;
                      
                      let buttonStyle = "bg-neutral-50 hover:bg-neutral-100/80 text-neutral-700 border-neutral-200";
                      if (selectedOption !== null) {
                        if (isCorrectAnswer) {
                          buttonStyle = "bg-emerald-100 text-emerald-800 border-emerald-400 font-semibold";
                        } else if (isWrongSelection) {
                          buttonStyle = "bg-pink-100 text-pink-800 border-pink-400 font-semibold";
                        } else {
                          buttonStyle = "bg-neutral-50/50 text-neutral-400 border-neutral-100 pointer-events-none";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          disabled={selectedOption !== null}
                          className={`w-full text-left p-2 border text-[11px] flex items-center justify-between transition-all duration-150 rounded-sm ${buttonStyle} cursor-pointer`}
                        >
                          <span>{opt}</span>
                          {selectedOption !== null && isCorrectAnswer && <Check size={12} className="text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div className="bg-stone-50 border-l-2 border-amber-500 p-2 text-[10px] font-sans text-neutral-600 mt-2">
                      <span className="font-black text-amber-800 uppercase block mb-0.5">Penjelasan:</span>
                      {quizQuestions[currentQuestion].exp}
                      
                      <button
                        onClick={handleNextQuiz}
                        className="mt-2 block ml-auto px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-2xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        {currentQuestion < quizQuestions.length - 1 ? "Lanjut ❯" : "Lihat Hasil ❯"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <span className="inline-block p-2 bg-emerald-100 rounded-full border border-emerald-200">
                    <Award className="text-emerald-600 w-8 h-8 animate-bounce" />
                  </span>
                  <h4 className="font-display font-black text-neutral-800 text-sm">
                    Selesai! Nilai Anda: <span className="text-emerald-600 text-lg font-black">{scorePercentage}/100</span>
                  </h4>
                  <p className="text-2xs text-neutral-500 max-w-xs mx-auto">
                    Anda berhasil menjawab {correctCount} dari {quizQuestions.length} pertanyaan dengan benar. Paula menguasai materi ini dengan nilai sempurna!
                  </p>
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-2xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RefreshCw size={10} /> Coba Lagi
                  </button>
                </div>
              )
            ) : (
              // Live JS Sandbox: Calculator & Nested Loops Loop Star
              <div className="space-y-3">
                
                {/* Calculator Inputs & Actions */}
                <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-sm space-y-2">
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-bold">Kalkulator Sederhana Simulator (rumus.js)</span>
                  
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="number" 
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      className="w-16 p-1 border border-neutral-300 text-center font-mono text-xs text-neutral-800 rounded bg-white"
                      placeholder="Angka 1"
                    />
                    
                    <select
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      className="p-1 border border-neutral-300 font-mono text-xs text-neutral-800 rounded bg-white"
                    >
                      <option value="+">+</option>
                      <option value="-">-</option>
                      <option value="*">*</option>
                      <option value="/">/</option>
                    </select>

                    <input 
                      type="number" 
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                      className="w-16 p-1 border border-neutral-300 text-center font-mono text-xs text-neutral-800 rounded bg-white"
                      placeholder="Angka 2"
                    />

                    <button 
                      onClick={runCalculator}
                      className="flex-1 bg-[#d11450] text-white border border-pink-700 px-2.5 py-1 text-2xs font-mono font-bold uppercase rounded cursor-pointer hover:bg-pink-700 transition-colors"
                    >
                      HITUNG
                    </button>
                  </div>

                  {calcResult && (
                    <div className="bg-[#0b0f19] border border-neutral-850 p-2 text-[9px] text-[#ffe066] font-mono leading-none rounded-sm">
                      Hasil: {calcResult}
                    </div>
                  )}
                </div>

                {/* Code Tabs Selector */}
                <div className="border border-neutral-200 p-2 rounded-sm space-y-1.5 bg-white">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-1">
                    <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Source Code Peninjau</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setJsCodeTab('CALC')}
                        className={`px-1.5 py-0.5 text-[7px] uppercase font-bold transition-all ${jsCodeTab === 'CALC' ? 'bg-[#d11450] text-white' : 'text-neutral-400 hover:text-neutral-700'}`}
                      >
                        rumus.js
                      </button>
                      <button 
                        onClick={() => setJsCodeTab('PYRAMID')}
                        className={`px-1.5 py-0.5 text-[7px] uppercase font-bold transition-all ${jsCodeTab === 'PYRAMID' ? 'bg-[#d11450] text-white' : 'text-neutral-400 hover:text-neutral-700'}`}
                      >
                        sesi3_nama.js
                      </button>
                    </div>
                  </div>

                  {jsCodeTab === 'CALC' ? (
                    <pre className="text-[7.5px] text-neutral-500 overflow-auto max-h-[85px] leading-tight select-text scrollbar-thin">
                      {CALC_CODE}
                    </pre>
                  ) : (
                    <pre className="text-[7.5px] text-neutral-500 overflow-auto max-h-[85px] leading-tight select-text scrollbar-thin">
                      {PYRAMID_CODE}
                    </pre>
                  )}
                </div>

              </div>
            )}
          </div>

          <div className="border-t border-neutral-150 pt-2 text-[9px] text-neutral-400 font-sans mt-3">
            {cardMode === 'QUIZ' ? (
              <span>Ujilah pemahaman QA teori dan strategi koding test Anda secara mandiri.</span>
            ) : (
              <span>Simulator ini berjalan secara dinamis menggunakan implementasi logika JS murni.</span>
            )}
          </div>

        </div>


        {/* Small sticker message */}
        <div className="mt-3 p-2 bg-pink-50 border border-pink-100 text-[10px] font-mono text-[#d11450] flex items-center gap-1.5">
          <AlertCircle size={12} />
          <span>Tip: Coba ubah opsi jawaban untuk memverifikasi nilai Anda langsung.</span>
        </div>
      </div>
    </div>
  );
}
