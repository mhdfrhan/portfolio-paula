import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, Maximize2, Minimize2, 
  Grid, FileText, CheckCircle, RefreshCw, Sliders, Search, 
  Award, Bug, Sparkles, Trash2, Volume2, VolumeX, Palette, Lightbulb, Check,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

// Slide Component Imports
import SlideCover from './components/SlideCover';
import SlideAbout from './components/SlideAbout';
import SlideBootcamp from './components/SlideBootcamp';
import SlideApiTesting from './components/SlideApiTesting';
import SlideWebUi from './components/SlideWebUi';
import SlideLoadTesting from './components/SlideLoadTesting';
import SlideMobileTesting from './components/SlideMobileTesting';
import SlideSkills from './components/SlideSkills';
import SlideCertifications from './components/SlideCertifications';
import SlideClosing from './components/SlideClosing';
import SlideManualTesting from './components/SlideManualTesting';

import { Y2KStar, GinghamTape } from './components/BackgroundDecoration';

// Slide metadata mapping to display index titles
const SLIDES = [
  { id: 1, title: "Cover / Sapaan", tag: "Cover" },
  { id: 2, title: "Tentang Saya", tag: "About" },
  { id: 3, title: "Ikhtisar Bootcamp", tag: "Bootcamp" },
  { id: 4, title: "Pengujian Manual (Excel/Word)", tag: "Project 1" },
  { id: 5, title: "Pengujian API (Postman/Mocha)", tag: "Project 2" },
  { id: 6, title: "Pengujian Web UI (Selenium/WDIO)", tag: "Project 3" },
  { id: 7, title: "Stress / Load Testing", tag: "Project 4" },
  { id: 8, title: "Pengujian Mobile (Appium)", tag: "Project 5" },
  { id: 9, title: "Skills & Perangkat", tag: "Skills" },
  { id: 10, title: "Sertifikasi & Edukasi", tag: "Certifications" },
  { id: 11, title: "Kontak & Penutup", tag: "Contact" }
];

// 5 hidden bugs locations for the mini-game
const BUG_SPOTS = [
  { id: "bug_cover", slideIndex: 0, top: "85%", left: "5%", name: "Typosaurus", desc: "Menyelinap di cover portfolio." },
  { id: "bug_bootcamp", slideIndex: 2, top: "95%", left: "45%", name: "LogicLeaker", desc: "Bersembunyi dekat daftar tools." },
  { id: "bug_manual", slideIndex: 3, top: "90%", left: "80%", name: "DocLeak", desc: "Bersembunyi di bawah tombol unduh test plan." },
  { id: "bug_webui", slideIndex: 5, top: "85%", left: "40%", name: "NullPointer", desc: "Mengganggu logger terminal." },
  { id: "bug_mobile", slideIndex: 7, top: "89%", left: "15%", name: "DriverBreaker", desc: "Mengincar Appium Android Emulator." },
  { id: "bug_cert", slideIndex: 9, top: "15%", left: "95%", name: "ScaleGlitcher", desc: "Hampir memakan gold seal BNSP." }
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'SLIDE' | 'DOCUMENT'>('SLIDE');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Core refs and exporting states for slide PDF rendering
  const slideContentRef = useRef<HTMLDivElement | null>(null);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);
  const [exportingIndex, setExportingIndex] = useState<number | 'active' | null>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isExportingAll, setIsExportingAll] = useState(false);
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  
  // Autoplay presentation states
  const [autoplay, setAutoplay] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  // Felt Pen / Pink Marker annotations drawing feature
  const [drawMode, setDrawMode] = useState(false);
  const [brushColor, setBrushColor] = useState('#e3125e'); // Y2K cherry pink marker by default!
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  // sound effect toggle state & game achievements states
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [foundBugs, setFoundBugs] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [newlyFoundBug, setNewlyFoundBug] = useState<string | null>(null);

  // Help guides
  const [showHelp, setShowHelp] = useState(false);

  // Register Keyboard navigation controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'SLIDE' || drawMode) return; // ignore when in doc mode or drawing
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, viewMode, drawMode]);

  // Synchronize fullscreen state with browser events (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Calculate dynamic scale factor for fullscreen view mode
  useEffect(() => {
    if (!isFullscreen) return;

    const handleResize = () => {
      const baseWidth = 1024;
      const baseHeight = 640;
      const wScale = window.innerWidth / baseWidth;
      const hScale = window.innerHeight / baseHeight;
      const factor = Math.min(wScale, hScale);
      setScaleFactor(factor);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen]);

  // Handle Autoplay progressions
  useEffect(() => {
    if (autoplay) {
      setAutoplayProgress(0);
      const step = 100; // ms update progress rate
      const totalDuration = 10000; // 10 seconds per slide
      let elapsed = 0;

      progressTimer.current = setInterval(() => {
        elapsed += step;
        setAutoplayProgress(Math.min((elapsed / totalDuration) * 100, 100));
      }, step);

      autoplayTimer.current = setTimeout(() => {
        handleNext();
      }, totalDuration);
    } else {
      clearAutoplayTimers();
    }

    return () => clearAutoplayTimers();
  }, [autoplay, activeSlide]);

  // Sync canvas size upon toggles or resizes
  useEffect(() => {
    if (drawMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
      }
    }
  }, [drawMode, activeSlide, viewMode]);

  const clearAutoplayTimers = () => {
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveSlide(prev => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (slideContainerRef.current) {
        slideContainerRef.current.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(() => {});
      }
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  // Export current slide content to clean PDF
  const downloadPDF = async (slideIndex?: number) => {
    const index = slideIndex !== undefined ? slideIndex : activeSlide;
    const isDocMode = slideIndex !== undefined;
    
    let element: HTMLElement | null = null;
    if (isDocMode) {
      element = document.getElementById(`slide-doc-content-${slideIndex}`);
    } else {
      element = slideContentRef.current;
    }
    
    if (!element) return;
    
    setExportingIndex(isDocMode ? slideIndex : 'active');
    
    // Play dual chiptune start bleep
    playBeep(523.25, 0.08); 
    setTimeout(() => playBeep(659.25, 0.12), 80);

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution details
        useCORS: true,
        backgroundColor: '#faf9f6',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dynamic dimensions for standard landscape aspect
      const width = canvas.width / 2;
      const height = canvas.height / 2;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [width, height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);

      const slideName = SLIDES[index].tag.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const filename = `Paula_QA_Portfolio_Slide_${index + 1}_${slideName}.pdf`;
      pdf.save(filename);

      // Play finished double beep
      playBeep(783.99, 0.1);
      setTimeout(() => playBeep(987.77, 0.15), 100);
    } catch (err) {
      console.error("Export PDF Gagal:", err);
    } finally {
      setExportingIndex(null);
    }
  };

  // Export all slides into one single PDF file
  const downloadAllPDF = async () => {
    setIsExportingAll(true);
    setExportProgress(1);

    // Play dual chiptune start bleep
    playBeep(523.25, 0.08); 
    setTimeout(() => playBeep(659.25, 0.12), 80);

    try {
      let pdf: jsPDF | null = null;

      for (let i = 0; i < SLIDES.length; i++) {
        setExportProgress(i + 1);
        const element = document.getElementById(`export-slide-content-${i}`);
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 2, // 2x resolution details
          useCORS: true,
          backgroundColor: '#faf9f6',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const width = canvas.width / 2;
        const height = canvas.height / 2;

        if (pdf === null) {
          pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [width, height],
          });
        } else {
          pdf.addPage([width, height], 'landscape');
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      }

      if (pdf) {
        pdf.save('Paula_QA_Portfolio_Lengkap.pdf');
        // Play finished double beep
        playBeep(783.99, 0.1);
        setTimeout(() => playBeep(987.77, 0.15), 100);
      }
    } catch (err) {
      console.error("Export Semua PDF Gagal:", err);
    } finally {
      setIsExportingAll(false);
      setExportProgress(null);
    }
  };

  // Sound generator matching QA checks & errors
  const playBeep = (freq: number, dur: number) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
      
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) {
      // AudioContext fails gracefully inside some iframes
    }
  };

  // Draw Mode Canvas Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !drawMode) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    setIsDrawing(true);
    lastX.current = e.clientX - rect.left;
    lastY.current = e.clientY - rect.top;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !drawMode) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = brushColor;
      ctx.moveTo(lastX.current, lastY.current);
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      
      lastX.current = currentX;
      lastY.current = currentY;
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        playBeep(220, 0.15);
      }
    }
  };

  // Bug Hunter mini game mechanics
  const claimBug = (bugId: string, bugName: string, bugDesc: string) => {
    if (foundBugs.includes(bugId)) return;
    
    const nextBugs = [...foundBugs, bugId];
    setFoundBugs(nextBugs);
    setNewlyFoundBug(`${bugName}: "${bugDesc}"`);
    
    // Play sweet triple chiptune beep sound
    playBeep(523.25, 0.08);
    setTimeout(() => playBeep(659.25, 0.08), 80);
    setTimeout(() => playBeep(783.99, 0.15), 160);

    setTimeout(() => setNewlyFoundBug(null), 3500);

    if (nextBugs.length === BUG_SPOTS.length) {
      // Award certificate!
      setTimeout(() => {
        setShowCertificate(true);
        playBeep(880, 0.3);
      }, 1000);
    }
  };

  // Rendering individual slides based on standard slide state
  const renderSlideContent = (index: number) => {
    switch (index) {
      case 0: return <SlideCover />;
      case 1: return <SlideAbout />;
      case 2: return <SlideBootcamp />;
      case 3: return <SlideManualTesting />;
      case 4: return <SlideApiTesting />;
      case 5: return <SlideWebUi />;
      case 6: return <SlideLoadTesting />;
      case 7: return <SlideMobileTesting />;
      case 8: return <SlideSkills />;
      case 9: return <SlideCertifications />;
      case 10: return <SlideClosing />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans select-none antialiased relative overflow-x-hidden">
      
      {/* Background decorations matching Y2K paper scrapbook theme */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#d11450] via-[#ffe066] to-emerald-500 z-50" />

      {/* Persistent top bar containing Paula's name / badge & display layout toggle */}
      <header className="bg-white border-b-2 border-neutral-800 px-4 py-2.5 shadow-sm sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#d11450] border-2 border-neutral-800 flex items-center justify-center font-display font-black text-white text-xs text-center shadow-sm select-auto">
            PC
          </div>
          <div>
            <span className="font-display font-black text-neutral-800 text-sm tracking-tight block leading-none">
              Paula Carnelian Tobing
            </span>
            <span className="font-mono text-[9px] uppercase font-semibold text-neutral-400 tracking-wider">
              Graduate Portfolio QA Engine · UMRI 2026
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Mode bar controllers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setViewMode('SLIDE'); playBeep(330, 0.05); }}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${viewMode === 'SLIDE' ? 'bg-[#d11450] text-white border-2 border-neutral-800 shadow-[2px_2px_0px_#000]' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-300'}`}
          >
            <Play size={12} /> Presentasi Slide
          </button>
          
          <button
            onClick={() => { setViewMode('DOCUMENT'); playBeep(330, 0.05); }}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${viewMode === 'DOCUMENT' ? 'bg-[#d11450] text-white border-2 border-neutral-800 shadow-[2px_2px_0px_#000]' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-300'}`}
          >
            <FileText size={12} /> Mode Dokumen / PDF
          </button>

          <button
            onClick={() => { downloadAllPDF(); playBeep(330, 0.05); }}
            disabled={isExportingAll || exportingIndex !== null}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all bg-[#ffe066] text-neutral-900 border-2 border-neutral-800 shadow-[2px_2px_0px_#000] ${isExportingAll ? 'opacity-70 cursor-wait animate-pulse' : 'hover:bg-[#ffd533] active:translate-y-0.5 active:translate-x-0 shadow-[2px_2px_0px_#000] cursor-pointer'}`}
            title="Unduh seluruh slide portfolio menjadi satu file PDF utuh"
          >
            {isExportingAll ? (
              <>
                <RefreshCw size={12} className="animate-spin text-neutral-900" />
                <span>Slide {exportProgress}/{SLIDES.length}...</span>
              </>
            ) : (
              <>
                <Download size={12} className="text-neutral-900" />
                <span>Unduh Semua Slide</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col justify-start">
        
        {/* Dynamic sound bar alert & mini-game stats indicator */}
        <div className="flex flex-wrap justify-between items-center bg-white border-2 border-neutral-800 p-2 shadow-[2px_2px_0px_#000] mb-4 gap-2">
          
          {/* Sounds Toggle */}
          <div className="flex items-center gap-1.5 font-mono text-2xs">
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              className={`p-1 border rounded transition-colors ${soundEnabled ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-neutral-100 border-neutral-200 text-neutral-400'}`}
              title="Aktifkan Efek Suara QA Chiptune"
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
            <span className="text-neutral-500 font-bold uppercase">
              EFEK SUARA: {soundEnabled ? 'AKTIF 🔊' : 'MATI 🔇'}
            </span>
          </div>

          {/* Bug hunter active alerts badge */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2 py-1 border border-rose-200 text-2xs font-mono font-bold rounded-sm animate-pulse">
              <Bug size={11} className="text-rose-500" />
              <span>BUG HUNTER: Found {foundBugs.length} / {BUG_SPOTS.length} bugs</span>
            </div>
            {foundBugs.length > 0 && foundBugs.length < BUG_SPOTS.length && (
              <span className="text-3xs text-neutral-400 font-mono">Ada bug tersembunyi di slide! Temukan semuanya.</span>
            )}
            {foundBugs.length === BUG_SPOTS.length && (
              <button 
                onClick={() => setShowCertificate(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-700 px-2 py-0.5 text-3xs font-mono font-bold uppercase animate-bounce"
              >
                Lihat Sertifikat QA 🏅
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: Slide Presentation Mode */}
        {viewMode === 'SLIDE' ? (
          <div className="flex flex-col gap-4">
               {/* Interactive slide drawer board */}
            <div 
              ref={slideContainerRef}
              className={`relative w-full overflow-hidden rounded-none flex transition-all duration-300 ${
                isFullscreen 
                  ? 'fixed inset-0 z-50 w-screen h-screen border-none shadow-none justify-center items-center bg-[#f3efe6]' 
                  : 'border-4 border-neutral-800 shadow-[6px_6px_0px_#1e293b] min-h-[460px] md:min-h-[500px] bg-[#faf9f6]'
              }`}
            >
              <div 
                className="relative flex flex-col justify-between overflow-hidden bg-[#faf9f6] w-full h-full"
                style={
                  isFullscreen 
                    ? { 
                        width: '1024px', 
                        height: '640px', 
                        transform: `scale(${scaleFactor})`,
                        transformOrigin: 'center center',
                        flexShrink: 0
                      } 
                    : undefined
                }
              >
              
              {/* Cute checkered spiral notebook tabs on left edge simulation (scrapbook aesthetic) */}
              <div className="absolute left-0 top-0 bottom-0 w-2.5 flex flex-col justify-around bg-neutral-900 opacity-20 pointer-events-none z-20">
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
                <div className="w-2.5 h-1.5 bg-transparent border-t border-b border-white" />
              </div>

              {/* Grid paper background mask */}
              <div className="absolute inset-0 grid-paper-bg z-0" />

              {/* Marker Draw layer */}
              {drawMode && (
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="absolute inset-0 z-30 cursor-crosshair"
                />
              )}

              {/* Hidden bug overlays for current slide */}
              {BUG_SPOTS.filter(b => b.slideIndex === activeSlide && !foundBugs.includes(b.id)).map(bug => (
                <button
                  key={bug.id}
                  onClick={() => claimBug(bug.id, bug.name, bug.desc)}
                  style={{ top: bug.top, left: bug.left }}
                  className="absolute z-20 w-4 h-4 bg-transparent cursor-pointer rounded-full group hover:bg-rose-100/30 flex items-center justify-center"
                  title="Aha! Temukan bug"
                >
                  <Bug size={8} className="text-transparent group-hover:text-rose-400 group-hover:animate-bounce" />
                </button>
              ))}

              {/* Top status tag metadata header line */}
              <div className="bg-white border-b-2 border-neutral-855 px-4 py-1.5 z-10 flex justify-between items-center text-[10px] font-mono font-bold select-none text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d11450]" />
                  <span>SLIDE {activeSlide + 1} OF {SLIDES.length}</span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-[#d11450]">{SLIDES[activeSlide].tag.toUpperCase()}</span>
                </div>
                
                {/* Visual marker drawing controls */}
                <div className="flex items-center gap-2">
                  {/* Fullscreen Toggle Button */}
                  <button
                    onClick={() => { toggleFullscreen(); playBeep(320, 0.05); }}
                    className="px-2 py-0.5 border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 text-[9px] uppercase tracking-wider flex items-center gap-1 font-sans"
                    title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                  >
                    {isFullscreen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
                    <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
                  </button>

                  <button
                    onClick={() => downloadPDF()}
                    disabled={exportingIndex !== null}
                    className={`px-2 py-0.5 border-2 text-[9px] uppercase tracking-wider flex items-center gap-1.5 font-sans font-bold bg-[#ffe066] text-neutral-900 border-neutral-800 transition-all ${exportingIndex === 'active' ? 'opacity-70 cursor-wait animate-pulse' : 'cursor-pointer hover:shadow-[2px_2px_0px_#000] active:translate-y-0.5 shadow-[1px_1px_0px_#000] hover:bg-[#ffd533]'}`}
                    title="Unduh slide aktif ini sebagai file PDF"
                  >
                    {exportingIndex === 'active' ? (
                      <>
                        <RefreshCw size={10} className="animate-spin text-neutral-900" />
                        <span>MENULIS PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download size={10} className="text-neutral-900 shrink-0" />
                        <span>UNDUH PDF ❯</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => { setDrawMode(!drawMode); playBeep(260, 0.05); }}
                    className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider flex items-center gap-1 font-sans ${drawMode ? 'bg-[#e3125e] text-white font-bold border-[#e3125e]' : 'bg-neutral-50 border-neutral-300 text-neutral-600 hover:bg-neutral-100'}`}
                  >
                    <Palette size={10} /> {drawMode ? 'Selesai Mengulas' : 'Gunakan Pulpen Ulasan'}
                  </button>
                  {drawMode && (
                    <button
                      onClick={clearCanvas}
                      className="px-2 py-0.5 border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-sm font-sans"
                    >
                      <Trash2 size={10} className="inline mr-0.5" /> Hapus Coretan
                    </button>
                  )}
                </div>
              </div>

              {/* Slide Content with entry/exit animations */}
              <div className="flex-1 p-6 z-10 relative overflow-hidden bg-[#faf9f6]">
                <div ref={slideContentRef} className="h-full w-full bg-[#faf9f6]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="h-full"
                    >
                      {renderSlideContent(activeSlide)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Carousel Slide Progress indicators dots block */}
              <div className="p-3 bg-neutral-50/90 border-t border-neutral-200 z-10 flex justify-between items-center font-mono text-[10px]">
                {/* Autoplay controllers bar */}
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => { setAutoplay(!autoplay); playBeep(320, 0.1); }}
                    className="p-1 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 bg-white"
                  >
                    {autoplay ? <Pause size={10} className="fill-neutral-700" /> : <Play size={10} className="fill-neutral-700" />}
                  </button>
                  <span className="text-3xs uppercase text-neutral-400 font-bold">
                    {autoplay ? 'AUTOPLAY SELESASI...' : 'AUTOPLAY'}
                  </span>
                  {autoplay && (
                    <div className="w-16 h-1 bg-neutral-200 overflow-hidden relative">
                      <div 
                        style={{ width: `${autoplayProgress}%` }}
                        className="h-full bg-[#d11450] transition-all"
                      />
                    </div>
                  )}
                  
                  {/* Fullscreen Navigation Chevrons */}
                  <span className="text-neutral-300">|</span>
                  <button
                    onClick={() => { handlePrev(); playBeep(380, 0.08); }}
                    className="p-1 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 bg-white flex items-center justify-center"
                    title="Sebelumnya"
                  >
                    <ChevronLeft size={10} />
                  </button>
                  <button
                    onClick={() => { handleNext(); playBeep(380, 0.08); }}
                    className="p-1 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 bg-white flex items-center justify-center"
                    title="Berikutnya"
                  >
                    <ChevronRight size={10} />
                  </button>
                </div>

                {/* Grid pagination dot buttons */}
                <div className="hidden md:flex items-center gap-2">
                  {SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => { setActiveSlide(idx); playBeep(440, 0.05); }}
                      className={`w-2.5 h-2.5 border border-neutral-800 transition-all ${activeSlide === idx ? 'bg-[#d11450] scale-125' : 'bg-white hover:bg-stone-200'}`}
                      title={slide.title}
                    />
                  ))}
                </div>

                <div className="text-neutral-400 font-bold text-3xs">
                  PAULA CARNELIAN TOBING © 2026
                </div>
              </div>
            </div>
          </div>

            {/* Pagination Controls navigation bar */}
            {!isFullscreen && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => { handlePrev(); playBeep(380, 0.08); }}
                  className="bg-white border-2 border-neutral-800 p-2 text-center text-xs font-mono font-bold uppercase tracking-wider hover:bg-stone-50 hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 transition-all text-neutral-800"
                >
                  <ChevronLeft size={16} /> Sebelumnya
                </button>

                <div className="hidden md:flex col-span-2 bg-white border-2 border-neutral-800 items-center justify-center px-4 shadow-[2px_2px_0px_#000]">
                  <span className="font-display font-black text-xs text-neutral-700 tracking-wide">
                    👉 INDEX: {SLIDES[activeSlide].title}
                  </span>
                </div>

                <button
                  onClick={() => { handleNext(); playBeep(380, 0.08); }}
                  className="bg-white border-2 border-neutral-800 p-2 text-center text-xs font-mono font-bold uppercase tracking-wider hover:bg-stone-50 hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 transition-all text-neutral-800"
                >
                  Berikutnya <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          
          // VIEW 2: Continuous Document/PDF style Scroll Mode
          <div className="space-y-12 py-4">
            
            {/* Quick header guide to scroll */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-xs font-sans text-neutral-700 max-w-2xl mx-auto shadow-sm">
              <span className="font-bold text-amber-800 block mb-1">💡 INFO PORTFOLIO DOKUMEN:</span>
              Scroll ke bawah untuk meninjau seluruh slide portfolio dalam versi cetak/buku terpadu. Sangat direkomendasikan untuk sesi pembacaan cepat (quick review).
            </div>

            {SLIDES.map((slide, idx) => (
              <div 
                key={slide.id}
                className="border-2 border-neutral-800 shadow-[4px_4px_0px_#1e293b] rounded-none bg-[#faf9f6] relative overflow-hidden"
              >
                {/* Spiral binder loops on left simulation */}
                <div className="absolute inset-y-0 left-0 w-2 background-neutral-800 z-20 opacity-20" />
                <div className="absolute inset-0 grid-paper-bg z-0" />

                {/* Subtitle banner index page code */}
                <div className="bg-neutral-900 px-4 py-1.5 flex justify-between items-center text-[10px] font-mono text-zinc-400 relative z-10 select-none">
                  <div className="flex items-center gap-1.5">
                    <span>DOKUMEN SLIDE {idx + 1 < 10 ? '0' + (idx + 1) : idx + 1} OF {SLIDES.length}</span>
                    <span className="text-[#ffe066] font-bold">— {slide.title.toUpperCase()}</span>
                  </div>
                  
                  {/* Slide-specific Download Button */}
                  <button
                    onClick={() => downloadPDF(idx)}
                    disabled={exportingIndex !== null}
                    className={`px-2 py-0.5 border border-[#ffe066]/30 text-[9px] uppercase tracking-wider flex items-center gap-1 font-sans font-bold bg-neutral-800 text-[#ffe066] hover:bg-[#ffe066] hover:text-neutral-900 transition-all ${exportingIndex === idx ? 'opacity-70 cursor-wait animate-pulse' : 'cursor-pointer'}`}
                    title="Unduh slide ini saja sebagai PDF"
                  >
                    {exportingIndex === idx ? (
                      <>
                        <RefreshCw size={9} className="animate-spin text-current" />
                        <span>MENULIS PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download size={9} className="text-current shrink-0" />
                        <span>UNDUH PDF ❯</span>
                      </>
                    )}
                  </button>
                </div>

                <div id={`slide-doc-content-${idx}`} className="p-8 relative z-10 bg-[#faf9f6]">
                  {renderSlideContent(idx)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Easter Egg / Bug hunter claimed badge alert notification banner */}
      <AnimatePresence>
        {newlyFoundBug && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#e3125e] border-2 border-neutral-900 text-white p-4 max-w-sm shadow-2xl flex items-start gap-3 rounded-none"
          >
            <div className="bg-[#ffe066] text-neutral-900 p-1 rounded-sm">
              <Bug size={18} className="animate-spin" />
            </div>
            <div>
              <span className="font-display font-black text-xs text-[#ffe066] block uppercase tracking-widest">BUG HUNTER: TERIDENTIFIKASI!</span>
              <h4 className="text-2xs font-mono font-bold leading-tight mt-0.5">{newlyFoundBug}</h4>
              <p className="text-[10px] font-sans text-pink-100 mt-1">Hore! Masalah kualitas terpecahkan oleh deteksi Anda. Terus berburu bug lainnya!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certified Bug Hunter Gold Certificate Dialog */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border-4 border-amber-500 max-w-md w-full p-6 text-center relative shadow-2xl overflow-hidden text-neutral-800"
            >
              {/* Plaid corners */}
              <div className="absolute top-0 left-0 w-8 h-8 gingham-pattern border-r border-b border-pink-100" />
              <div className="absolute top-0 right-0 w-8 h-8 gingham-pattern border-l border-b border-pink-100" />
              <div className="absolute bottom-0 left-0 w-8 h-8 gingham-pattern border-r border-t border-pink-100" />
              <div className="absolute bottom-0 right-0 w-8 h-8 gingham-pattern border-l border-t border-pink-100" />

              <div className="space-y-4">
                <span className="inline-block p-3 bg-amber-50 rounded-full border-2 border-dashed border-amber-500 text-amber-600 animate-pulse">
                  <Award size={36} />
                </span>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d11450]">Sertifikat Pengakuan QA</span>
                  <h3 className="font-display font-black text-lg text-neutral-900 uppercase leading-tight">
                    CERTIFIED BUG HUNTER ELITE
                  </h3>
                </div>

                <div className="border-t border-b border-stone-200 py-3.5 italic text-xs text-neutral-600 font-sans leading-relaxed">
                  "Menyatakan bahwa Pembaca/Recruiter ini berhasil mendeteksi dan mengisolasi seluruh <strong>{BUG_SPOTS.length} bug tersembunyi</strong> dalam Dokumen Portfolio Paula Carnelian Tobing dengan presisi dan perhatian tingkat tinggi."
                </div>

                <div className="text-[10px] font-mono text-neutral-400">
                  Tanggal Verifikasi: {new Date().toLocaleDateString('id-ID')} · PEKANBARU
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => { setShowCertificate(false); playBeep(220, 0.05); }}
                    className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Tutup Pengakuan
                  </button>
                  <button
                    onClick={() => { setFoundBugs([]); setShowCertificate(false); playBeep(180, 0.1); }}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Main Lagi 🔄
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden container for rendering all slides for PDF export */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1024px', overflow: 'hidden' }}>
        {SLIDES.map((slide, idx) => (
          <div 
            key={`export-slide-${slide.id}`} 
            id={`export-slide-content-${idx}`} 
            style={{ width: '1024px', height: '600px', boxSizing: 'border-box' }}
            className="p-8 bg-[#faf9f6] relative overflow-hidden"
          >
            {/* Grid paper background mask */}
            <div className="absolute inset-0 grid-paper-bg z-0 pointer-events-none" />
            <div className="h-full w-full bg-[#faf9f6] z-10 relative">
              {renderSlideContent(idx)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
