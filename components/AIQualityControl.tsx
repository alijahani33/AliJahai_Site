"use client";

import React, { useState, useEffect } from "react";
import { Camera, Scan, Pause, Play, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

interface InspectedItem {
  id: number;
  type: "clean" | "defective";
  defectType?: string;
  x: number; // percentage from left
  scanned: boolean;
}

export default function AIQualityControl({ lang }: { lang: "en" | "fa" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(400);
  const [totalInspected, setTotalInspected] = useState(1482);
  const [defectsDetected, setDefectsDetected] = useState(42);
  
  // Simulated items on the conveyor belt
  const [items, setItems] = useState<InspectedItem[]>([
    { id: 1, type: "clean", x: 10, scanned: false },
    { id: 2, type: "clean", x: 45, scanned: false },
    { id: 3, type: "defective", defectType: "Stripe Crack", x: 80, scanned: false },
  ]);

  const [activeScanResult, setActiveScanResult] = useState<{
    id: number;
    type: "clean" | "defective";
    defectType?: string;
    accuracy: number;
  } | null>(null);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // 1. Fluctuating FPS around 400
      setFps((prev) => {
        const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(395, Math.min(405, 400 + offset));
      });

      // 2. Move items along the conveyor belt (x increases)
      setItems((prevItems) => {
        let updated = prevItems.map((item) => {
          const nextX = item.x + 2; // move right
          let scanned = item.scanned;
          
          // Trigger scan result when it crosses the camera boundary (around x = 50)
          if (nextX >= 48 && nextX <= 52 && !scanned) {
            scanned = true;
            
            // Calculate random scan accuracy
            const accuracy = parseFloat((98.5 + Math.random() * 1.4).toFixed(2));
            setActiveScanResult({
              id: item.id,
              type: item.type,
              defectType: item.defectType,
              accuracy,
            });

            // Update stats
            setTotalInspected((t) => t + 1);
            if (item.type === "defective") {
              setDefectsDetected((d) => d + 1);
            }
          }

          return { ...item, x: nextX, scanned };
        });

        // Remove item if it goes off-screen (x > 100) and spawn a new one at x = -20
        const visibleItems = updated.filter((item) => item.x <= 100);
        if (visibleItems.length < 3) {
          const spawnType = Math.random() > 0.75 ? "defective" : "clean";
          const nextId = Date.now();
          visibleItems.push({
            id: nextId,
            type: spawnType,
            defectType: spawnType === "defective" ? (Math.random() > 0.5 ? "Void Hole" : "Stripe Crack") : undefined,
            x: -20,
            scanned: false,
          });
        }

        return visibleItems;
      });

    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const isRtl = lang === "fa";

  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:border-tech-indigo transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-zinc-150 dark:border-zinc-850 pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-tech-indigo/10 text-tech-indigo animate-pulse">
            <Camera size={20} />
          </span>
          <div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
              {isRtl ? "سیستم کنترل کیفی هوشمند (CNN)" : "AI Quality Control (CNN)"}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isRtl ? "بینایی ماشین صنعتی جهت پایش خط تولید لوله با سرعت بالا" : "Real-time edge computer vision scanning at 400 FPS"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-250 dark:border-zinc-700 cursor-pointer"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
        </button>
      </div>

      {/* Main Grid: Camera feed on left, metrics on right */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Simulated Camera Feed (Full Width Stack) */}
        <div className="relative aspect-video bg-zinc-950 dark:bg-black border border-zinc-900 rounded-xl overflow-hidden flex flex-col justify-between p-4">
          
          {/* Grid lines overlay for tech look */}
          <div className="absolute inset-0 grid-bg opacity-10 radial-fade pointer-events-none"></div>

          {/* Camera Scan HUD lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1/3 h-2/3 border-2 border-dashed border-tech-indigo/30 rounded flex items-center justify-center">
              <Scan size={32} className="text-tech-indigo/20 animate-pulse" />
            </div>
          </div>

          {/* Conveyor Belt & Moving Pipes */}
          <div className="absolute inset-x-0 bottom-8 h-12 bg-zinc-900 border-y border-zinc-800 flex items-center overflow-hidden">
            
            {/* Belt tracks */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-800/10 to-transparent pointer-events-none" />

            {/* Drifting Pipes */}
            {items.map((item) => {
              const isDefect = item.type === "defective";
              
              return (
                <div
                  key={item.id}
                  style={{ left: `${item.x}%` }}
                  className="absolute w-24 h-6 -translate-y-1/2 top-1/2 transition-transform duration-75 flex items-center justify-center"
                >
                  {/* Pipe Cylinder */}
                  <div
                    className={`w-full h-4 rounded-sm border relative ${
                      isDefect
                        ? "bg-linear-to-b from-red-800/40 to-red-950/80 border-red-650"
                        : "bg-linear-to-b from-zinc-700 to-zinc-900 border-zinc-650"
                    }`}
                  >
                    {/* Defect representation */}
                    {isDefect && (
                      <div className="absolute top-1 left-4 w-4 h-1 bg-red-400 rounded-full animate-pulse blur-[0.5px]"></div>
                    )}
                    {/* Scan indicator line */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400/30"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* HUD Top Bar */}
          <div className="relative flex justify-between items-center text-[10px] font-mono text-zinc-500 z-10">
            <div className="flex items-center gap-1.5 bg-black/80 px-2 py-1 rounded border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-red-400">REC [LIVE]</span>
            </div>
            
            <div className="bg-black/80 px-2 py-1 rounded border border-zinc-800">
              <span>CAMERA: OPTICAL_EDGE_01</span>
            </div>
          </div>

          {/* Live Scanner Bounding Box Overlay */}
          {activeScanResult && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div
                className={`w-1/3 h-2/3 border-2 rounded transition-all flex flex-col justify-between p-2.5 ${
                  activeScanResult.type === "defective"
                    ? "border-red-500 bg-red-500/5 animate-[pulse_0.4s_infinite]"
                    : "border-emerald-500 bg-emerald-500/5"
                }`}
              >
                {/* Top Label */}
                <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                  <span className={activeScanResult.type === "defective" ? "text-red-400" : "text-emerald-400"}>
                    {activeScanResult.type === "defective" ? "WARNING: DEFECT" : "STATUS: PASS"}
                  </span>
                  <span className="text-zinc-300">{activeScanResult.accuracy}% ACC</span>
                </div>

                {/* Center Warning */}
                {activeScanResult.type === "defective" && (
                  <div className="flex items-center justify-center gap-1 text-[10px] text-red-500 font-bold bg-red-950/80 p-1 rounded border border-red-800/50">
                    <ShieldAlert size={12} />
                    <span>{activeScanResult.defectType?.toUpperCase()}</span>
                  </div>
                )}

                {/* Bottom coordinates */}
                <div className="text-[8px] font-mono text-zinc-600 dark:text-zinc-500 text-right">
                  <span>ROI: [120, 85, 240, 160]</span>
                </div>
              </div>
            </div>
          )}

          {/* HUD Bottom Bar */}
          <div className="relative flex justify-between items-center text-[10px] font-mono z-10 mt-auto">
            <div className="bg-black/80 px-2 py-1 rounded border border-zinc-800 text-cyan-400 font-bold">
              <span>{fps} FPS</span>
            </div>
            
            <div className="bg-black/80 px-2 py-1 rounded border border-zinc-800 text-zinc-300">
              <span>LATENCY: 2.4ms</span>
            </div>
          </div>

        </div>

        {/* AI Stats and Context Panel */}
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-850 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 font-mono">
                {isRtl ? "آمار هوش مصنوعی لبه" : "Edge Inference Analytics"}
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-black/40 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-900">
                  <span className="text-[10px] text-zinc-500 block mb-0.5">{isRtl ? "کل اسکن شده" : "Total Scanned"}</span>
                  <span className="text-sm font-black font-mono text-zinc-850 dark:text-zinc-100">{totalInspected}</span>
                </div>
                <div className="bg-white dark:bg-black/40 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-900">
                  <span className="text-[10px] text-zinc-500 block mb-0.5">{isRtl ? "مورد معیوب" : "Defects Flagged"}</span>
                  <span className="text-sm font-black font-mono text-red-500">{defectsDetected}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 p-1 rounded bg-tech-indigo/10 text-tech-indigo">
                  <CheckCircle size={12} />
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {isRtl
                    ? "الگوریتم شبکه‌های کانولوشنی (CNN) برای تفکیک بلادرنگ خطاهای سطحی لوله‌های پلی‌اتیلن."
                    : "Deep CNN model optimized to extract surface features from camera frame arrays."}
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 p-1 rounded bg-emerald-green/10 text-emerald-green">
                  <AlertTriangle size={12} />
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {isRtl
                    ? "کاهش ضایعات تولید کارخانه تا ۷۰٪ با تشخیص سریع حوضچه و فرورفتگی قبل از خنک‌سازی نهایی."
                    : "Commercial impact: Reduced factory waste by 70% by identifying defects early on the cooling line."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900 text-[10px] font-mono text-zinc-500 text-center">
            {isRtl ? "مدل مستقر شده بر روی سخت‌افزار Jetson Nano" : "Model Target: NVIDIA Jetson Nano DevKit"}
          </div>
        </div>

      </div>
    </div>
  );
}
