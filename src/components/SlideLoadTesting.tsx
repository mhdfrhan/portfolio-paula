import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid, ReferenceLine } from 'recharts';
import { Sliders, HelpCircle, Flame, Server, AlertTriangle, Github } from 'lucide-react';

export default function SlideLoadTesting() {
  const [concurrentUsers, setConcurrentUsers] = useState(150);

  // Generate dynamic chart data based on concurrentUsers selection
  const generateChartData = (peak: number) => {
    const steps = 7;
    const data = [];
    for (let i = 0; i <= steps; i++) {
      // Simulate timestamp / progression
      const time = `${i * 10}s`;
      const usersFactor = i <= 4 ? (i / 4) : 1 - ((i - 4) / (steps - 4));
      const simulatedUsers = Math.round(peak * usersFactor);
      
      // Calculate response time based on users count
      // Exponential curve as it approaches the concurrency boundary of 180 users
      let responseTime = 80 + (simulatedUsers * 0.9);
      if (simulatedUsers > 180) {
        responseTime += Math.pow(simulatedUsers - 180, 1.6); // bottleneck crash
      }
      
      // Error rate simulation
      let errorRate = 0;
      if (simulatedUsers > 180) {
        errorRate = Math.min(((simulatedUsers - 180) / (peak - 180)) * 24, 100);
      }

      data.push({
        time,
        users: simulatedUsers,
        responseTime: Math.round(responseTime),
        errorRate: parseFloat(errorRate.toFixed(1))
      });
    }
    return data;
  };

  const chartData = generateChartData(concurrentUsers);

  // Stats calculate for summary table
  const avgResponseTime = Math.round(chartData.reduce((acc, curr) => acc + curr.responseTime, 0) / chartData.length);
  const maxResponseTime = Math.max(...chartData.map(d => d.responseTime));
  const maxErrorRate = Math.max(...chartData.map(d => d.errorRate));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri: Deskripsi Proyek */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Tag */}
          <div className="inline-flex gap-2 mb-2 scale-95 origin-left">
            <span className="bg-[#d11450]/15 text-[#d11450] border border-[#d11450]/30 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Load Testing
            </span>
            <span className="bg-[#ffe066] text-neutral-900 text-[10px] uppercase font-mono px-2 py-0.5 font-bold border border-neutral-800">
              k6 & JMeter
            </span>
          </div>

          <h2 className="text-2xl font-black font-display text-[#d11450] tracking-tight leading-none mb-3">
            PROJECT 4 — LOAD TESTING
          </h2>

          <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-3">
            Menguji performa, kestabilan, dan ketahanan aplikasi di bawah beban pengguna simultan skala tinggi 
            untuk menemukan bottleneck performa API sebelum status go-live production.
          </p>

          <div className="space-y-1.5 text-2xs sm:text-xs">
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-rose-500 font-bold font-sans">✓</span>
              <span><strong>Skenario Beban:</strong> Mengonfigurasi Load Profile (Ramp-up, steady, cooling).</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-rose-500 font-bold font-sans">✓</span>
              <span><strong>Uji Pengguna Simultan:</strong> Simulasi beban <strong>150 concurrent users</strong>.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-rose-500 font-bold font-sans">✓</span>
              <span><strong>Metrik Kritis Dipantau:</strong> Response time, throughput, Error Rates.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-rose-500 font-bold font-sans">✓</span>
              <span><strong>Stress Bottleneck Analysis:</strong> Menemukan letak deadlock resource SQL.</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Conclusion sticker */}
        <div className="bg-rose-50 border border-rose-200 p-3 shadow-sm">
          <h4 className="font-display font-black text-[#d11450] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <Server size={12} className="text-[#d11450]" /> Temuan Ketahanan:
          </h4>
          <p className="text-2xs text-neutral-700 font-sans leading-relaxed">
            Sistem bekerja dengan sangat stabil hingga <strong className="text-[#d11450]">180 pengguna simultan</strong>. Di atas ambang batas itu, response time naik eksponensial akibat bottleneck pooling database.
          </p>
          <div className="mt-2 text-left">
            <a 
              href="https://github.com/paulacarneliantobing" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-widest bg-neutral-900 text-white px-2 py-1 hover:bg-neutral-800 transition-colors"
            >
              <Github size={10} /> REPO PERFORMANCE ❯
            </a>
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Interactive Recharts Chart dengan Slider */}
      <div className="lg:col-span-7 w-full z-10">
        <div className="border-2 border-neutral-800 bg-white shadow-[4px_4px_0px_#1e293b] p-3.5 flex flex-col justify-between">
          
          {/* Chart Header details */}
          <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-400 block uppercase">Simulator Kinerja Sistem</span>
              <span className="text-xs font-display font-black text-neutral-800">Uji Grafik Beban (Virtual Users)</span>
            </div>
            
            {/* Realtime stats box */}
            <div className="flex gap-2">
              <div className="bg-neutral-50 border border-neutral-200 px-2 py-0.5 text-center">
                <span className="block text-[8px] font-mono text-neutral-400 uppercase">Avg Resp</span>
                <span className={`text-xs font-black font-mono ${avgResponseTime > 300 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {avgResponseTime}ms
                </span>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 px-2 py-0.5 text-center">
                <span className="block text-[8px] font-mono text-neutral-400 uppercase">Max Error</span>
                <span className={`text-xs font-black font-mono ${maxErrorRate > 5 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {maxErrorRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Recharts responsive plot block */}
          <div className="h-[140px] w-full mt-1.5 mb-3 select-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorResp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#e5e5e5" />
                <XAxis dataKey="time" tick={{ fontSize: 9, fontFamily: 'mono' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 9, fontFamily: 'mono' }} label={{ value: 'User', angle: -90, position: 'insideLeft', style: { fontSize: 8, fill: '#4f46e5', fontWeight: 'bold' } }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9, fontFamily: 'mono' }} label={{ value: 'Resp (ms)', angle: 90, position: 'insideRight', style: { fontSize: 8, fill: '#e11d48', fontWeight: 'bold' } }} />
                <Tooltip contentStyle={{ fontSize: 10, fontFamily: 'sans-serif' }} />
                
                {/* Reference Line showing the database bottleneck constraint */}
                <ReferenceLine yAxisId="left" y={180} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'DATABASE BOTTLENECK (180)', fill: '#f43f5e', fontSize: 7, fontWeight: 'bold', position: 'insideTop' }} />
                
                <Area yAxisId="left" type="monotone" dataKey="users" stroke="#4f46e5" fillOpacity={1} fill="url(#colorUsers)" name="Active Users" strokeWidth={1.5} />
                <Area yAxisId="right" type="monotone" dataKey="responseTime" stroke="#e11d48" fillOpacity={1} fill="url(#colorResp)" name="Response Time" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dynamic interactive slide controls */}
          <div className="bg-neutral-50 border border-neutral-100 p-2.5 space-y-2">
            <div className="flex items-center justify-between text-2xs font-mono">
              <span className="flex items-center gap-1 font-bold text-neutral-600">
                <Sliders size={12} className="text-[#d11450]" /> ATUR CONCURRENT USERS:
              </span>
              <span className="bg-slate-800 text-white font-black px-2 py-0.5 rounded font-mono text-[11px]">
                {concurrentUsers} VUs (Virtual Users)
              </span>
            </div>

            <input 
              type="range" 
              min="10" 
              max="300" 
              value={concurrentUsers} 
              onChange={(e) => setConcurrentUsers(parseInt(e.target.value))}
              className="w-full accent-[#d11450] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
            />
            {concurrentUsers > 180 && (
              <div className="flex items-start gap-1 text-[9px] text-[#red-600] text-rose-700 leading-tight font-sans animate-pulse font-semibold">
                <AlertTriangle size={11} className="shrink-0 text-rose-500" />
                <span>Peringatan: {concurrentUsers} pengguna melampaui batas pool database! Error rate naik menjadi {maxErrorRate}% dan Response peak mencapai {maxResponseTime}ms!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
