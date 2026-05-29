import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, Play, FileCode, Github, ExternalLink } from 'lucide-react';
import { Y2KStar } from './BackgroundDecoration';

export default function SlideApiTesting() {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'DELETE_BUG' | 'USER_DETAILS'>('LOGIN');
  const [isSending, setIsSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const [toolMode, setToolMode] = useState<'POSTMAN' | 'MOCHA'>('POSTMAN');
  const [mochaLogs, setMochaLogs] = useState<string[]>([]);
  const [isMochaRunning, setIsRunningMocha] = useState(false);

  const endpoints = {
    LOGIN: {
      method: "POST",
      url: "https://api.skolaqa.com/v1/auth/login",
      headers: "Content-Type: application/json",
      body: JSON.stringify({ email: "paula@example.com", password: "" }, null, 2),
      resStatus: "400 Bad Request",
      resTime: "45ms",
      resBody: {
        error: "Bad Request",
        message: "Password cannot be empty",
        bug_flagged: "BUG-01: Correctly intercepted empty authorization payloads"
      },
      tests: [
        { name: "Status code is 400", passed: true },
        { name: "Error message matches 'Password cannot be empty'", passed: true },
        { name: "Response has error fields", passed: true }
      ]
    },
    DELETE_BUG: {
      method: "DELETE",
      url: "https://api.skolaqa.com/v1/bugs/99",
      headers: "Authorization: Bearer ds_token_88910",
      body: "{}",
      resStatus: "500 Internal Server Error (BUG REPORTED)",
      resTime: "112ms",
      resBody: {
        timestamp: "2026-05-26T04:35:00Z",
        path: "/v1/bugs/99",
        status: 500,
        error: "NullPointerException",
        message: "Bug identified! Controller fails when removing non-existing bug items."
      },
      tests: [
        { name: "Status code is 204 No Content", passed: false },
        { name: "Response body is empty", passed: false },
        { name: "Execution time is under 100ms", passed: false }
      ]
    },
    USER_DETAILS: {
      method: "GET",
      url: "https://api.skolaqa.com/v1/users/me",
      headers: "Authorization: Bearer ds_token_8a92b",
      body: "None (Query params only)",
      resStatus: "200 OK",
      resTime: "24ms",
      resBody: {
        id: 301,
        name: "Paula Carnelian Tobing",
        role: "QA_ENGINEER",
        security: "CRITICAL-03: Password hash leak identified in previous build! (FIXED)"
      },
      tests: [
        { name: "Status code is 200", passed: true },
        { name: "User profile belongs to Paula", passed: true },
        { name: "Sensitive fields (password_hash) are hidden", passed: true }
      ]
    }
  };

  const current = endpoints[activeTab];

  const handleSend = () => {
    setIsSending(true);
    setRequestSent(false);
    setTimeout(() => {
      setIsSending(false);
      setRequestSent(true);
    }, 400);
  };

  const runMochaTestDemo = () => {
    if (isMochaRunning) return;
    setIsRunningMocha(true);
    setMochaLogs([]);
    
    const messages = [
      "npm test Tests/API/reqres.test.js",
      "⚡ [Mocha Runner] Spawning mocha framework with fetch & chai expect...",
      "⚙️ [Mocha Config] Target: jsonplaceholder.typicode.com",
      "🔍 [Assert] Testing API Automation Test suite",
      "📡 [Fetch] GET https://jsonplaceholder.typicode.com/posts/1",
      "✓ GET Posts: PASSED (142ms)",
      "📡 [Fetch] POST https://jsonplaceholder.typicode.com/posts",
      "✓ POST Create Post: PASSED (186ms)",
      "🎉 SUMMARY: 2 scenarios compiled, 2 PASSED successfully! [328ms]"
    ];

    let currentMsgIndex = 0;
    const interval = setInterval(() => {
      const msg = messages[currentMsgIndex];
      setMochaLogs(prev => [...prev, msg]);
      currentMsgIndex += 1;
      if (currentMsgIndex >= messages.length) {
        clearInterval(interval);
        setIsRunningMocha(false);
      }
    }, 250);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri - Deskripsi Proyek */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Postman tags */}
          <div className="inline-flex gap-2 mb-2 scale-95 origin-left">
            <span className="bg-[#ff8000]/15 text-[#ff8000] border border-[#ff8000]/30 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              API Testing
            </span>
            <span className="bg-neutral-800 text-neutral-100 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Postman & Mocha
            </span>
          </div>
          
          <h2 className="text-2xl font-black font-display text-[#d11450] tracking-tight leading-none mb-3">
            PROJECT 2 — API TESTING
          </h2>

          <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-3">
            Melakukan pengujian API secara menyeluruh terhadap endpoint aplikasi menggunakan Postman, 
            mencakup semua metode HTTP (GET, POST, PUT, DELETE) dan validasi JSON response terstruktur.
          </p>

          <div className="space-y-1.5 text-2xs sm:text-xs">
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-emerald-500 font-bold font-sans">✓</span>
              <span><strong>Metode HTTP Kompleks:</strong> Membuat request GET, POST, PUT, dan DELETE.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-emerald-500 font-bold font-sans">✓</span>
              <span><strong>Validasi JSON Valid:</strong> Meneliti status code, body, header metadata.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-emerald-500 font-bold font-sans">✓</span>
              <span><strong>Environment Params:</strong> Set value dinamis via global & collection vars.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-emerald-500 font-bold font-sans">✓</span>
              <span><strong>Script Test Otomatis:</strong> Skenario teruji via Postman Test Runner.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-emerald-500 font-bold font-sans">✓</span>
              <span><strong>Bug Report Terverifikasi:</strong> Menemukan celah kritis sebelum merger dev.</span>
            </div>
          </div>
        </div>

        {/* Hasil Temuan */}
        <div className="bg-[#ffe066]/15 border border-[#ffe066]/60 p-3 shadow-sm select-none">
          <h4 className="font-display font-black text-[#d11450] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertTriangle size={12} /> Hasil Uji Proyek:
          </h4>
          <p className="text-2xs text-neutral-700 font-sans leading-relaxed">
            Berhasil mengidentifikasi <strong className="text-[#d11450]">3 bug kritis</strong> di layer backend API (salah satunya kegagalan 500 error saat DELETE ID kosong). Dokumen Collection ini tersedia di repositori publik.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <a 
              href="https://github.com/paulacarneliantobing" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-widest bg-neutral-900 text-white px-2 py-1 hover:bg-neutral-800 transition-colors"
            >
              <Github size={10} /> REPO GITHUB ❯
            </a>
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Postman Client Simulator / Mocha Console */}
      <div className="lg:col-span-7 w-full z-10">
        <div className="border-2 border-neutral-800 bg-[#1e1e1e] text-white font-mono text-xs shadow-[4px_4px_0px_#1e293b] overflow-hidden">
          {/* Postman Title Header bar style */}
          <div className="bg-[#2a2a2a] px-3 py-1.5 border-b border-neutral-800 flex items-center justify-between text-2xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 font-sans font-bold text-neutral-300">
                {toolMode === 'POSTMAN' ? 'Skola QA Collection v1_0' : 'Tests/API/reqres.test.js'}
              </span>
            </div>
            
            {/* Tool Toggle Tabs */}
            <div className="flex gap-1">
              <button 
                onClick={() => { setToolMode('POSTMAN'); setRequestSent(false); }}
                className={`px-2 py-0.5 font-sans font-bold text-3xs transition-all ${toolMode === 'POSTMAN' ? 'bg-[#ff8000] text-neutral-900' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'}`}
              >
                POSTMAN SIM
              </button>
              <button 
                onClick={() => { setToolMode('MOCHA'); }}
                className={`px-2 py-0.5 font-sans font-bold text-3xs transition-all ${toolMode === 'MOCHA' ? 'bg-[#ff8000] text-neutral-900' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'}`}
              >
                MOCHA + CHAI
              </button>
            </div>
          </div>

          {toolMode === 'POSTMAN' ? (
            <>
              {/* Connection tabs selection style */}
              <div className="bg-[#222] border-b border-neutral-800 flex text-3xs font-bold uppercase overflow-x-auto">
                <button 
                  onClick={() => { setActiveTab('LOGIN'); setRequestSent(false); }}
                  className={`px-3 py-2 border-r border-neutral-800 ${activeTab === 'LOGIN' ? 'bg-[#1e1e1e] text-orange-400 border-t-2 border-orange-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
                >
                  POST Login
                </button>
                <button 
                  onClick={() => { setActiveTab('DELETE_BUG'); setRequestSent(false); }}
                  className={`px-3 py-2 border-r border-neutral-800 ${activeTab === 'DELETE_BUG' ? 'bg-[#1e1e1e] text-orange-400 border-t-2 border-orange-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
                >
                  DELETE Bug Endpoint
                </button>
                <button 
                  onClick={() => { setActiveTab('USER_DETAILS'); setRequestSent(false); }}
                  className={`px-3 py-2 border-r border-neutral-800 ${activeTab === 'USER_DETAILS' ? 'bg-[#1e1e1e] text-orange-400 border-t-2 border-orange-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
                >
                  GET Me Profile
                </button>
              </div>

              {/* Request Address and Send Button bar */}
              <div className="p-3 border-b border-neutral-800 flex items-center justify-between gap-2">
                <div className="flex-1 bg-[#1a1a1a] border border-neutral-700/80 rounded flex items-center overflow-hidden">
                  <span className={`px-2 py-1 font-sans font-black text-white ${current.method === 'POST' ? 'bg-amber-600' : current.method === 'DELETE' ? 'bg-rose-700' : 'bg-blue-600'}`}>
                    {current.method}
                  </span>
                  <input 
                    type="text" 
                    value={current.url} 
                    disabled 
                    className="flex-1 px-2 py-1 bg-transparent text-neutral-300 pointer-events-none text-[10px] truncate"
                  />
                </div>
                
                <button 
                  onClick={handleSend}
                  disabled={isSending}
                  className={`px-3 py-1.5 font-bold font-sans uppercase text-[10px] flex items-center gap-1 bg-[#ff8000] text-neutral-900 border border-[#ff8000] hover:bg-[#ff8000]/95 transition-all text-neutral-900 cursor-pointer`}
                >
                  <Send size={10} className={isSending ? 'animate-pulse' : ''} />
                  {isSending ? "SENDING..." : "SEND"}
                </button>
              </div>

              {/* Tabs for Request Body vs Test Assertion Details */}
              <div className="p-3.5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Left side panel: Request Body input simulation */}
                <div className="bg-[#151515] p-2.5 border border-neutral-800">
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">Request Body (JSON)</span>
                  <pre className="text-[10px] text-amber-500/90 overflow-auto max-h-[110px] leading-tight">
                    {current.body}
                  </pre>
                </div>

                {/* Right side panel: Test Assertions and Response Headers values */}
                <div className="bg-[#151515] p-2.5 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">Postman Test Scripts</span>
                    <div className="space-y-1 max-h-[110px] overflow-auto">
                      {current.tests.map((test, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[9px] leading-relaxed">
                          {requestSent ? (
                            test.passed ? (
                              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1 rounded-sm text-3xs font-sans font-bold">PASS</span>
                            ) : (
                              <span className="bg-rose-950 text-rose-400 border border-rose-800 px-1 rounded-sm text-3xs font-sans font-bold">FAIL</span>
                            )
                          ) : (
                            <span className="bg-neutral-800 text-neutral-400 px-1 rounded-sm text-3xs font-sans font-bold">READY</span>
                          )}
                          <span className={requestSent ? (test.passed ? 'text-neutral-300' : 'text-rose-300 line-through') : 'text-neutral-500'}>
                            {test.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-800 pt-2 text-[9px] text-neutral-500 flex justify-between font-sans">
                    <span>Time: {requestSent ? current.resTime : "0ms"}</span>
                    <span>Status: <span className={requestSent ? (current.resStatus.includes('BUG') ? 'text-rose-400 font-bold font-mono' : 'text-emerald-400 font-bold font-mono') : 'text-neutral-500'}>{requestSent ? current.resStatus : "Pending"}</span></span>
                  </div>
                </div>
              </div>

              {/* Response Payload Drawer */}
              {requestSent && (
                <div className="bg-[#111] p-3 border-t border-neutral-800 text-3xs text-neutral-400 select-all max-h-[100px] overflow-auto">
                  <span className="font-sans block text-[8px] font-bold text-neutral-600 mb-1">RESPONSE BODY JSON:</span>
                  <pre className="text-emerald-400 leading-tight">
                    {JSON.stringify(current.resBody, null, 2)}
                  </pre>
                </div>
              )}
            </>
          ) : (
            // Mocha & Chai Simulation view
            <div className="p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Left Column: Code View */}
              <div className="md:col-span-7 bg-[#151515] p-2.5 border border-neutral-805 flex flex-col justify-between">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-500 mb-1.5 font-bold flex items-center gap-1">
                    <FileCode size={10} className="text-orange-400" /> reqres.test.js
                  </span>
                  <pre className="text-[9px] text-zinc-300 overflow-auto max-h-[180px] leading-tight select-text scrollbar-thin">
{`const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { expect } = require("chai");

describe("API Automation Test", function () {
  this.timeout(10000);

  it("GET Posts", async function () {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const body = await response.json();
    expect(response.status).to.equal(200);
    expect(body.id).to.equal(1);
  });

  it("POST Create Post", async function () {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "QA Automation",
        body: "Testing API",
        userId: 1
      })
    });
    const body = await response.json();
    expect(response.status).to.equal(201);
    expect(body.title).to.equal("QA Automation");
  });
});`}
                  </pre>
                </div>
              </div>

              {/* Right Column: Console runner */}
              <div className="md:col-span-5 bg-[#0b0f19] p-2.5 border border-neutral-805 flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="flex justify-between items-center mb-2 border-b border-neutral-800 pb-1.5">
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-bold">Mocha Runner Terminal</span>
                    <button 
                      onClick={runMochaTestDemo}
                      disabled={isMochaRunning}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-neutral-900 font-sans font-black uppercase text-[8px] px-1.5 py-0.5 transition-all rounded-sm cursor-pointer"
                    >
                      <Play size={8} className="fill-neutral-900" />
                      {isMochaRunning ? "Running..." : "Run Test"}
                    </button>
                  </div>

                  {mochaLogs.length === 0 ? (
                    <div className="text-slate-500 italic text-[10px] pt-8 text-center font-sans">
                      Klik tombol di atas untuk menjalankan test script Mocha + Chai.
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-[9px]">
                      {mochaLogs.map((log, idx) => {
                        let color = "text-slate-400";
                        if (log.startsWith("npm") || log.startsWith("✓")) {
                          color = "text-emerald-400 font-bold";
                        } else if (log.includes("[Fetch]")) {
                          color = "text-blue-300";
                        } else if (log.includes("SUMMARY")) {
                          color = "text-yellow-400 font-bold";
                        } else if (log.startsWith("⚡")) {
                          color = "text-purple-400";
                        }
                        return (
                          <div key={idx} className={color}>
                            {log.startsWith("✓") ? "  " + log : log}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                <div className="border-t border-neutral-850 pt-2 text-[8px] text-neutral-500 font-sans mt-2">
                  Menguji integrasi API eksternal secara asinkron dengan penanganan error terstruktur.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
