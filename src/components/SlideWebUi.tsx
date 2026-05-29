import React, { useState } from 'react';
import { Play, Folder, FileText, Monitor, CheckCircle, Flame, Github } from 'lucide-react';

export default function SlideWebUi() {
  const [isRunning, setIsRunning] = useState(false);
  const [activePane, setActivePane] = useState<'TERMINAL' | 'POM_STRUCTURE'>('TERMINAL');
  const [logs, setLogs] = useState<string[]>([]);

  const [frameworkMode, setFrameworkMode] = useState<'SELENIUM' | 'WDIO'>('SELENIUM');
  const [wdioLogs, setWdioLogs] = useState<string[]>([]);
  const [isWdioRunning, setIsWdioRunning] = useState(false);

  const runTestDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    
    const messages = [
      "pytest tests/test_authentication.py --verbose",
      "⚡ [Selenium WebDriver] Spawns instance on chrome://headless",
      "⚙️ [Config] Configured implicit wait pool to 10.0s",
      "🔍 [Locate] Looking up element via XPATH: '//input[@name=\"username\"]'",
      "✏️ [Type] Entering credential 'paula_carnelian' [OK]",
      "🔍 [Locate] Looking up element via CSS_SELECTOR: 'button.btn-primary'",
      "🖱️ [Click] Submit triggers login payload flow...",
      "⏳ [Explicit Wait] Waiting for element present: '//div[@class=\"dashboard-panel\"]'",
      "✨ [Assert] Verified document title matches 'Dashboard | SkolaPortal'",
      "✓ test_login_success: PASSED [1.24s]",
      "🔍 [Locate] Navigating to Registration multi-step form...",
      "✏️ [Type] Writing random form payloads to text inputs [OK]",
      "✓ test_register_flow_validation: PASSED [2.12s]",
      "🎉 SUMMARY: 12 scenarios compiled, 12 PASSED successfully!"
    ];

    let currentMsgIndex = 0;
    const interval = setInterval(() => {
      const msg = messages[currentMsgIndex];
      setLogs(prev => [...prev, msg]);
      currentMsgIndex += 1;
      if (currentMsgIndex >= messages.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 250);
  };

  const runWdioTestDemo = () => {
    if (isWdioRunning) return;
    setIsWdioRunning(true);
    setWdioLogs([]);
    
    const messages = [
      "npx wdio run wdio.conf.js",
      "⚡ [WebdriverIO] Initializing Chrome browser in headless mode...",
      "⚙️ [Config] Base URL: https://www.saucedemo.com/",
      "🔍 [Locate] Opening login page...",
      "✏️ [Type] Entering username 'standard_user' [OK]",
      "✏️ [Type] Entering password 'secret_sauce' [OK]",
      "🖱️ [Click] Clicked login button [OK]",
      "⏳ [Sync] Waiting for products title element...",
      "✓ Positive - login success: PASSED [842ms]",
      "✓ Negative - invalid username: PASSED [412ms]",
      "✓ Negative - wrong password: PASSED [380ms]",
      "✓ Negative - locked out user: PASSED [498ms]",
      "🎉 SUMMARY: 4 scenarios run, 4 PASSED successfully! [2.13s]"
    ];

    let currentMsgIndex = 0;
    const interval = setInterval(() => {
      const msg = messages[currentMsgIndex];
      setWdioLogs(prev => [...prev, msg]);
      currentMsgIndex += 1;
      if (currentMsgIndex >= messages.length) {
        clearInterval(interval);
        setIsWdioRunning(false);
      }
    }, 250);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri - Deskripsi Proyek */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Selenium tags */}
          <div className="inline-flex gap-2 mb-2 scale-95 origin-left">
            <span className="bg-orange-100 text-orange-800 border border-orange-200 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Web UI Automation
            </span>
            <span className="bg-neutral-800 text-neutral-100 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Selenium & WebdriverIO
            </span>
          </div>

          <h2 className="text-2xl font-black font-display text-[#d11450] tracking-tight leading-none mb-3">
            PROJECT 3 — WEB UI TESTING
          </h2>

          <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-3">
            Mengembangkan skrip automation untuk menguji fungsionalitas antarmuka web secara otomatis menggunakan 
            framework <strong>Selenium WebDriver (Python)</strong> dan <strong>WebdriverIO (Node.js)</strong> berbasis Page Object Model (POM).
          </p>

          <div className="space-y-1.5 text-2xs sm:text-xs">
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-orange-500 font-bold font-sans">✓</span>
              <span><strong>Cross-Framework Experience:</strong> Selenium (Python/PyTest) & WebdriverIO (JS/TS).</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-orange-500 font-bold font-sans">✓</span>
              <span><strong>Robust Locator Strategy:</strong> Memanfaatkan XPath unik dan CSS Selector berkinerja tinggi.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-orange-500 font-bold font-sans">✓</span>
              <span><strong>Page Object Model (POM):</strong> Memisahkan element locators dan action logic agar modular.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-orange-500 font-bold font-sans">✓</span>
              <span><strong>Saucedemo & SkolaPortal:</strong> Teruji di platform nyata dengan visual assertions.</span>
            </div>
          </div>
        </div>

        {/* Proyek Hasil */}
        <div className="bg-orange-50 border border-orange-200 p-3 shadow-sm">
          <h4 className="font-display font-black text-[#ff8000] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <Flame size={12} className="text-[#ff8000]" /> Hasil Automasi:
          </h4>
          <p className="text-2xs text-neutral-700 font-sans leading-relaxed">
            Mencakup skenario pengetesan kritis login flow positif/negatif, validasi cart, dan registrasi formulir dinamis dengan waktu eksekusi suite yang dipangkas hingga 84%.
          </p>
          <div className="mt-2 text-left">
            <a 
              href="https://github.com/paulacarneliantobing" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-widest bg-neutral-900 text-white px-2 py-1 hover:bg-neutral-800 transition-colors"
            >
              <Github size={10} /> REPO AUTOMATION ❯
            </a>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Shell Console Emulator & POM Structure */}
      <div className="lg:col-span-7 w-full z-10">
        <div className="border-2 border-neutral-800 bg-[#0f172a] text-white font-mono text-xs shadow-[4px_4px_0px_#1e293b] overflow-hidden">
          
          {/* Top terminal bar details */}
          <div className="bg-[#1e293b] px-3 py-1.5 border-b border-neutral-800 flex items-center justify-between text-2xs text-slate-400">
            <div className="flex items-center gap-2 max-w-[50%]">
              <Folder size={11} className="text-[#ffe066] shrink-0" />
              <span className="text-slate-300 font-sans font-bold truncate">
                {frameworkMode === 'SELENIUM' ? 'Workspace: selenium_pytest_pom/' : 'Workspace: wdio_saucedemo_pom/'}
              </span>
            </div>
            
            {/* Framework Selector & Pane Selector */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 border border-slate-700 bg-slate-900 rounded p-0.5">
                <button 
                  onClick={() => { setFrameworkMode('SELENIUM'); }}
                  className={`px-1.5 py-0.5 font-sans font-bold text-[8px] uppercase tracking-wider rounded-sm transition-all ${frameworkMode === 'SELENIUM' ? 'bg-orange-500 text-neutral-900' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Selenium
                </button>
                <button 
                  onClick={() => { setFrameworkMode('WDIO'); }}
                  className={`px-1.5 py-0.5 font-sans font-bold text-[8px] uppercase tracking-wider rounded-sm transition-all ${frameworkMode === 'WDIO' ? 'bg-orange-500 text-neutral-900' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  WDIO POM
                </button>
              </div>

              <div className="flex gap-1 border-l border-slate-700 pl-2">
                <button 
                  onClick={() => { setActivePane('TERMINAL'); }}
                  className={`px-2 py-0.5 font-sans font-bold text-[9px] ${activePane === 'TERMINAL' ? 'bg-orange-500 text-neutral-900 font-black' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
                >
                  TERMINAL
                </button>
                <button 
                  onClick={() => { setActivePane('POM_STRUCTURE'); }}
                  className={`px-2 py-0.5 font-sans font-bold text-[9px] ${activePane === 'POM_STRUCTURE' ? 'bg-orange-500 text-neutral-900 font-black' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
                >
                  POM FILES
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 min-h-[190px] max-h-[240px] overflow-y-auto">
            {activePane === 'TERMINAL' ? (
              frameworkMode === 'SELENIUM' ? (
                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-slate-500">Run actual selenium assertions log:</span>
                    <button 
                      onClick={runTestDemo}
                      disabled={isRunning}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-neutral-900 font-sans font-black uppercase text-3xs px-2 py-1 transition-colors rounded-sm cursor-pointer"
                    >
                      <Play size={10} className="fill-neutral-900" />
                      {isRunning ? "Running..." : "Run Test Automation Suite"}
                    </button>
                  </div>
                  
                  {logs.length === 0 ? (
                    <div className="text-slate-500 italic text-[10px] pt-4 text-center">
                      Klik tombol di atas untuk menjalankan test runner Selenium Python.
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-[10px]">
                      {logs.map((log, idx) => {
                        let color = "text-slate-300";
                        if (log.startsWith("pytest") || log.startsWith("✓")) {
                          color = "text-emerald-400 font-bold";
                        } else if (log.includes("[Locate]")) {
                          color = "text-amber-300";
                        } else if (log.includes("[Explicit Wait]")) {
                          color = "text-indigo-300";
                        } else if (log.includes("SUMMARY")) {
                          color = "text-[#ffe066] font-bold";
                        }
                        return (
                          <div key={idx} className={color}>
                            {log}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-slate-500">Run actual WebdriverIO Mocha assertions log:</span>
                    <button 
                      onClick={runWdioTestDemo}
                      disabled={isWdioRunning}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-neutral-900 font-sans font-black uppercase text-3xs px-2 py-1 transition-colors rounded-sm cursor-pointer"
                    >
                      <Play size={10} className="fill-neutral-900" />
                      {isWdioRunning ? "Running..." : "Run WDIO Test Suite"}
                    </button>
                  </div>
                  
                  {wdioLogs.length === 0 ? (
                    <div className="text-slate-500 italic text-[10px] pt-4 text-center">
                      Klik tombol di atas untuk menjalankan WebdriverIO (Saucedemo).
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-[10px]">
                      {wdioLogs.map((log, idx) => {
                        let color = "text-slate-300";
                        if (log.startsWith("npx") || log.startsWith("✓")) {
                          color = "text-emerald-400 font-bold";
                        } else if (log.includes("[Locate]")) {
                          color = "text-amber-300";
                        } else if (log.includes("[Sync]")) {
                          color = "text-indigo-300";
                        } else if (log.includes("SUMMARY")) {
                          color = "text-[#ffe066] font-bold";
                        }
                        return (
                          <div key={idx} className={color}>
                            {log}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            ) : (
              frameworkMode === 'SELENIUM' ? (
                // POM folder code panel illustration for Selenium
                <div className="space-y-1 bg-slate-900/60 p-2 border border-slate-800 rounded">
                  <span className="block text-[9px] uppercase tracking-wide text-indigo-400 mb-2 font-bold font-sans">✓ Page Object Model Project Tree:</span>
                  <div className="text-[10px] space-y-1 text-slate-300">
                    <div>📁 selenium_pytest_pom/</div>
                    <div className="pl-3 text-slate-400">📁 base/</div>
                    <div className="pl-6 text-slate-300">📄 <span className="text-orange-300 font-semibold">base_driver.py</span> (WebDriver helper)</div>
                    <div className="pl-3 text-slate-400">📁 pages/</div>
                    <div className="pl-6 text-slate-300">📄 <span className="text-amber-300 font-semibold">login_page.py</span> (Locator mapping)</div>
                    <div className="pl-6 text-slate-300">📄 <span className="text-amber-300 font-semibold">dashboard_page.py</span> (Locates user elements)</div>
                    <div className="pl-3 text-slate-400">📁 tests/</div>
                    <div className="pl-6 text-slate-300">📄 <span className="text-emerald-300 font-semibold">test_authentication.py</span> (PyTest asserts)</div>
                    <div className="pl-3 text-slate-300">📄 config.py</div>
                    <div className="pl-3 text-slate-300">📄 requirements.txt</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[9px] text-slate-500 font-sans">
                    Struktur ini dipisahkan agar locator web gampang di-update di satu tempat jika UI berubah, mencegah test script berbau kotor (flaky).
                  </div>
                </div>
              ) : (
                // POM folder code panel illustration for WDIO
                <div className="space-y-1 bg-slate-900/60 p-2 border border-slate-800 rounded">
                  <span className="block text-[9px] uppercase tracking-wide text-indigo-400 mb-2 font-bold font-sans">✓ WebdriverIO Page Object Model Project Tree:</span>
                  <div className="text-[10px] space-y-1 text-slate-300">
                    <div>📁 wdio_saucedemo_pom/</div>
                    <div className="pl-3 text-slate-400">📁 test/</div>
                    <div className="pl-6 text-slate-400">📁 pageobjects/</div>
                    <div className="pl-9 text-slate-300">📄 <span className="text-orange-300 font-semibold">page.js</span> (Base configuration class)</div>
                    <div className="pl-9 text-slate-300">📄 <span className="text-amber-300 font-semibold">login.page.js</span> (Saucedemo username & password locators)</div>
                    <div className="pl-9 text-slate-300">📄 <span className="text-amber-300 font-semibold">secure.page.js</span> (Dashboard assertion details)</div>
                    <div className="pl-6 text-slate-400">📁 specs/</div>
                    <div className="pl-9 text-slate-300">📄 <span className="text-emerald-300 font-semibold">test.e2e.js</span> (Login tests assertions using Chai)</div>
                    <div className="pl-3 text-slate-350">📄 wdio.conf.js (Test runner config)</div>
                    <div className="pl-3 text-slate-350">📄 package.json</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[9px] text-slate-500 font-sans">
                    Menggunakan selector modern WebdriverIO asinkron `$(selector)` untuk memverifikasi fungsionalitas visual web Saucedemo secara dinamis.
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
