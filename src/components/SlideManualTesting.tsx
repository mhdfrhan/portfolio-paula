import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Play } from 'lucide-react';
import { PolaroidFrame } from './BackgroundDecoration';

interface TestCase {
  id: string;
  desc: string;
  expected: string;
  status: 'PENDING' | 'PASSED' | 'FAILED';
}

export default function SlideManualTesting() {
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "TC-001", desc: "Login dengan kredensial valid pada portal Belajar Bareng", expected: "Berhasil masuk & redirect ke dashboard kelas", status: 'PENDING' },
    { id: "TC-002", desc: "Login dengan email terdaftar dan password salah", expected: "Sistem menampilkan pesan error 'Kredensial tidak valid'", status: 'PENDING' },
    { id: "TC-003", desc: "Kirim form pendaftaran belajar dengan field kosong", expected: "Form menampilkan error validasi input wajib", status: 'PENDING' },
    { id: "TC-004", desc: "Akses halaman dashboard Belajar Bareng tanpa login", expected: "Diarahkan kembali (redirect) ke login page", status: 'PENDING' },
  ]);

  const [activePreview, setActivePreview] = useState<'SPREADSHEET' | 'TEST_PLAN'>('SPREADSHEET');
  const [bugDiscovered, setBugDiscovered] = useState<string | null>(null);

  const handleSetStatus = (id: string, status: 'PASSED' | 'FAILED') => {
    setTestCases(prev => prev.map(tc => {
      if (tc.id === id) {
        return { ...tc, status };
      }
      return tc;
    }));

    if (id === "TC-003" && status === "FAILED") {
      setBugDiscovered("BUG-02: Form terkirim sukses meski field kosong, database kemasukan baris kosong!");
    } else if (id === "TC-002" && status === "FAILED") {
      setBugDiscovered("BUG-03: Password salah malah redirect ke halaman kosong tanpa memunculkan error toast!");
    } else {
      setBugDiscovered(null);
    }
  };

  const handleResetRunner = () => {
    setTestCases(prev => prev.map(tc => ({ ...tc, status: 'PENDING' })));
    setBugDiscovered(null);
  };

  const completedCount = testCases.filter(tc => tc.status !== 'PENDING').length;
  const passedCount = testCases.filter(tc => tc.status === 'PASSED').length;
  const failedCount = testCases.filter(tc => tc.status === 'FAILED').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri - Detail & Download */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Tags */}
          <div className="inline-flex flex-wrap gap-2 mb-2 scale-95 origin-left">
            <span className="bg-pink-100 text-pink-800 border border-pink-200 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Manual Testing
            </span>
            <span className="bg-neutral-800 text-neutral-100 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              QA Deliverables
            </span>
            <a
              href="http://belajar-bareng.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffe066] text-neutral-900 border border-neutral-800 hover:bg-yellow-350 text-[10px] uppercase font-mono px-2 py-0.5 font-bold transition-all shadow-[1px_1px_0px_#000] active:translate-y-0.5 active:shadow-none"
              title="Kunjungi website Belajar Bareng yang diuji"
            >
              Web Target: Belajar Bareng ↗
            </a>
          </div>

          <h2 className="text-2xl font-black font-display text-[#d11450] tracking-tight leading-none mb-3">
            PROJECT 1 — MANUAL TESTING
          </h2>

          <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-3">
            Menyusun dokumen rencana pengujian (Test Plan) komprehensif dan skenario uji (Test Cases) pada website <strong>Belajar Bareng</strong> (<a href="http://belajar-bareng.onrender.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">belajar-bareng.onrender.com</a>) untuk memastikan seluruh fitur registrasi kelas, login portal, dan validasi form teruji dengan baik secara manual.
          </p>

          {/* Cakupan Deliverables */}
          <div className="space-y-1.5 text-2xs sm:text-xs mb-3">
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#d11450] font-bold font-sans">✓</span>
              <span><strong>TP Test Plan:</strong> Menyusun dokumen cakupan pengujian, kriteria masuk/keluar, dan strategi risiko.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#d11450] font-bold font-sans">✓</span>
              <span><strong>Skenario Uji Excel:</strong> Menulis 50+ skenario pengujian positif, negatif, dan kasus batas.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#d11450] font-bold font-sans">✓</span>
              <span><strong>Bug Reporting:</strong> Dokumentasi lifecycle bug lengkap dengan deskripsi, repro-steps, & severity.</span>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-amber-50 border border-amber-200 p-3 shadow-sm space-y-2">
          <h4 className="font-display font-black text-amber-800 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <Download size={12} className="text-amber-800" /> Unduh Berkas Pengujian Asli:
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Download Test Case */}
            <a
              href="/Basic Test Case & Bug Report Paula Carnelian Tobing.xlsx"
              download="Basic Test Case & Bug Report Paula Carnelian Tobing.xlsx"
              className="bg-white border-2 border-neutral-800 hover:bg-stone-50 p-2 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 text-left transition-all active:translate-y-0.5 active:translate-x-0"
              title="Unduh Lembar Kerja Test Case Excel"
            >
              <FileSpreadsheet size={16} className="text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[8px] font-mono text-neutral-400 font-bold uppercase leading-none">Test Case Sheet</span>
                <span className="font-display font-black text-neutral-800 text-[10px] truncate block mt-0.5">Test_Case.xlsx</span>
              </div>
            </a>

            {/* Download Test Plan */}
            <a
              href="/TP Test Plan Paula Carnelian Tobing.docx"
              download="TP Test Plan Paula Carnelian Tobing.docx"
              className="bg-white border-2 border-neutral-800 hover:bg-stone-50 p-2 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 text-left transition-all active:translate-y-0.5 active:translate-x-0"
              title="Unduh Dokumen Test Plan Word"
            >
              <FileText size={16} className="text-blue-600 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[8px] font-mono text-neutral-400 font-bold uppercase leading-none">Test Plan Doc</span>
                <span className="font-display font-black text-neutral-800 text-[10px] truncate block mt-0.5">Test_Plan.docx</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Preview Polaroid & Interactive Runner */}
      <div className="lg:col-span-7 w-full z-10 space-y-4">
        
        {/* Toggle Panel Preview vs Interactive Runner */}
        <div className="border-2 border-neutral-800 bg-[#0f172a] text-white font-mono text-xs shadow-[4px_4px_0px_#1e293b] overflow-hidden">
          
          <div className="bg-[#1e293b] px-3 py-1.5 border-b border-neutral-800 flex items-center justify-between text-2xs text-slate-400">
            <div className="flex items-center gap-2">
              <FileText size={11} className="text-[#ffe066]" />
              <span className="text-slate-300 font-sans font-bold">QA Manual Workspaces</span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => { setActivePreview('SPREADSHEET'); }}
                className={`px-2 py-0.5 font-sans font-bold text-3xs ${activePreview === 'SPREADSHEET' ? 'bg-pink-500 text-neutral-900' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
              >
                LIVE RUNNER
              </button>
              <button 
                onClick={() => { setActivePreview('TEST_PLAN'); }}
                className={`px-2 py-0.5 font-sans font-bold text-3xs ${activePreview === 'TEST_PLAN' ? 'bg-pink-500 text-neutral-900' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
              >
                MOCKUP PREVIEW
              </button>
            </div>
          </div>

          <div className="p-4 min-h-[220px]">
            {activePreview === 'SPREADSHEET' ? (
              // Live Interactive Test Case Runner
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Silakan klik status pengujian untuk mensimulasikan QA Runner:</span>
                  <button 
                    onClick={handleResetRunner}
                    className="text-3xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2 py-0.5 font-bold uppercase rounded-sm flex items-center gap-1"
                  >
                    <RefreshCw size={8} /> Reset
                  </button>
                </div>

                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {testCases.map((tc) => (
                    <div key={tc.id} className="bg-slate-900/60 border border-slate-850 p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-sm">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="text-pink-400 font-bold font-mono">{tc.id}</span>
                          <span className="text-slate-300 font-sans">{tc.desc}</span>
                        </div>
                        <span className="text-[8px] text-slate-500 font-sans block italic">Expected: {tc.expected}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleSetStatus(tc.id, 'PASSED')}
                          className={`px-1.5 py-0.5 text-[9px] font-sans font-bold border rounded-sm transition-all ${tc.status === 'PASSED' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-850 text-slate-400 border-slate-700 hover:bg-slate-800'}`}
                        >
                          PASS
                        </button>
                        <button
                          onClick={() => handleSetStatus(tc.id, 'FAILED')}
                          className={`px-1.5 py-0.5 text-[9px] font-sans font-bold border rounded-sm transition-all ${tc.status === 'FAILED' ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-slate-850 text-slate-400 border-slate-700 hover:bg-slate-800'}`}
                        >
                          FAIL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="pt-2 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[9px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Progress: <strong>{completedCount}/{testCases.length} Run</strong></span>
                    <span className="text-emerald-400">Passed: <strong>{passedCount}</strong></span>
                    <span className="text-rose-400">Failed: <strong>{failedCount}</strong></span>
                  </div>
                  
                  {bugDiscovered && (
                    <div className="bg-rose-950/80 text-rose-400 border border-rose-900 px-2.5 py-1 text-[9px] rounded font-sans font-medium flex items-center gap-1.5 animate-pulse max-w-full truncate">
                      <AlertTriangle size={10} className="shrink-0" />
                      <span>{bugDiscovered}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Document Mockups Carousel Layout
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-slate-800 p-2 text-center flex flex-col justify-between">
                  <div className="aspect-video relative overflow-hidden bg-slate-950 border border-slate-850 rounded">
                    <img 
                      src="/test_case_mockup.png" 
                      alt="Test Case Spreadsheet Mockup" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-[9px] font-sans text-slate-400 mt-2 block">Lembar Kerja Skenario Pengujian (.xlsx)</span>
                </div>

                <div className="bg-white/5 border border-slate-800 p-2 text-center flex flex-col justify-between">
                  <div className="aspect-video relative overflow-hidden bg-slate-950 border border-slate-850 rounded">
                    <img 
                      src="/test_plan_mockup.png" 
                      alt="Test Plan Document Mockup" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-[9px] font-sans text-slate-400 mt-2 block">Dokumen Rencana Pengujian Manual (.docx)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informative Sticker Card */}
        <div className="bg-pink-50 border border-pink-100 p-3 flex items-start gap-2 shadow-sm">
          <div className="bg-pink-100 text-[#d11450] p-1.5 rounded-sm">
            <AlertTriangle size={14} />
          </div>
          <div>
            <span className="font-display font-black text-[#d11450] text-2xs uppercase tracking-wider block">Catatan QA Lead:</span>
            <p className="text-[10px] text-neutral-600 leading-relaxed font-sans mt-0.5">
              Rencana Pengujian disusun menggunakan standar industri (IEEE 829). Seluruh skenario dicatat secara lengkap dengan detail input data, kondisi prasyarat (*pre-condition*), dan hasil yang diharapkan (*expected result*) untuk memudahkan traceability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
