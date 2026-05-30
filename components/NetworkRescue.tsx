"use client";

import React, { useState } from "react";
import { Zap, AlertOctagon, CheckCircle2, Cpu, ToggleLeft, ToggleRight } from "lucide-react";

export default function NetworkRescue({ lang }: { lang: "en" | "fa" }) {
  const [isRstp, setIsRstp] = useState(true);

  const isRtl = lang === "fa";

  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 relative overflow-hidden group hover:border-emerald-green transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-150 dark:border-zinc-850 pb-4">
        <div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
            {isRtl ? "پروژه احیا و پایدارسازی شبکه پتروشیمی" : "Petrochemical Network Rescue"}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isRtl ? "رفع بحران قطعی سراسری ناشی از لوپ پخش در شبکه صنعتی" : "Broadcast Loop isolation & RSTP topology design"}
          </p>
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => setIsRstp(!isRstp)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            isRstp
              ? "border-emerald-green bg-emerald-green/5 text-emerald-green shadow-sm shadow-emerald-500/10"
              : "border-red-500/30 bg-red-500/5 text-red-500 shadow-sm"
          }`}
        >
          <span className="font-mono">
            {isRstp
              ? (isRtl ? "پروتکل RSTP فعال" : "STP/RSTP Active")
              : (isRtl ? "حالت بحران (حلقه شبکه)" : "Broadcast Loop State")
          }
          </span>
          {isRstp ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
        </button>
      </div>

      {/* Simulated Network Diagram Container */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Network diagram canvas (Full Width) */}
        <div className="relative aspect-video bg-zinc-950 dark:bg-black border border-zinc-900 rounded-xl overflow-hidden flex items-center justify-center p-4">
          
          {/* SVG Diagram */}
          <svg className="w-full h-full max-h-[220px]" viewBox="0 0 300 160">
            {/* Connection Links */}
            
            {/* Core -> Dist 1 */}
            <line
              x1="150" y1="30" x2="80" y2="85"
              stroke={isRstp ? "#10b981" : "#ef4444"}
              strokeWidth="2.5"
              className={!isRstp ? "animate-pulse" : ""}
            />
            {/* Core -> Dist 2 */}
            <line
              x1="150" y1="30" x2="220" y2="85"
              stroke={isRstp ? "#10b981" : "#ef4444"}
              strokeWidth="2.5"
              className={!isRstp ? "animate-pulse" : ""}
            />
            {/* Dist 1 -> Dist 2 (The Redundant Link causing the loop) */}
            <line
              x1="80" y1="85" x2="220" y2="85"
              stroke={isRstp ? "#52525b" : "#ef4444"}
              strokeWidth="2.5"
              strokeDasharray={isRstp ? "5,5" : "0"}
              className={!isRstp ? "animate-pulse" : ""}
            />
            
            {/* Packet Animations */}
            {!isRstp ? (
              <>
                {/* Loop Packets circulating Core -> Dist 2 -> Dist 1 -> Core */}
                <circle r="4" fill="#f43f5e" className="animate-[ping_1s_infinite]">
                  <animateMotion
                    path="M 150 30 L 220 85 L 80 85 Z"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="4" fill="#f43f5e" className="animate-[ping_1.2s_infinite]">
                  <animateMotion
                    path="M 220 85 L 80 85 L 150 30 Z"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="4" fill="#ef4444">
                  <animateMotion
                    path="M 80 85 L 150 30 L 220 85 Z"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            ) : (
              <>
                {/* Safe flow packets */}
                <circle r="3" fill="#10b981">
                  <animateMotion
                    path="M 150 30 L 80 85"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="3" fill="#10b981">
                  <animateMotion
                    path="M 150 30 L 220 85"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}

            {/* Nodes (Switches) */}
            
            {/* Core Switch */}
            <g transform="translate(150, 30)">
              <circle r="16" fill="#18181b" stroke={isRstp ? "#10b981" : "#ef4444"} strokeWidth="2" />
              <rect x="-6" y="-6" width="12" height="12" fill={isRstp ? "#10b981" : "#ef4444"} rx="2" className="animate-pulse" />
              <text y="-22" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">Core-SW (Root)</text>
            </g>

            {/* Dist Switch 1 */}
            <g transform="translate(80, 85)">
              <circle r="14" fill="#18181b" stroke={isRstp ? "#10b981" : "#ef4444"} strokeWidth="2" />
              <circle cx="0" cy="0" r="4" fill={isRstp ? "#10b981" : "#ef4444"} />
              <text x="-16" y="24" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">Dist-SW01</text>
            </g>

            {/* Dist Switch 2 */}
            <g transform="translate(220, 85)">
              <circle r="14" fill="#18181b" stroke={isRstp ? "#10b981" : "#ef4444"} strokeWidth="2" />
              {/* If RSTP is active, block this port */}
              {isRstp ? (
                <rect x="-4" y="-4" width="8" height="8" fill="#f43f5e" rx="1">
                  <title>Blocked by RSTP</title>
                </rect>
              ) : (
                <circle cx="0" cy="0" r="4" fill="#ef4444" />
              )}
              <text x="16" y="24" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">Dist-SW02</text>
            </g>
          </svg>

          {/* Canvas Floating Badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded border border-zinc-800 text-[9px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${isRstp ? "bg-emerald-500 animate-pulse" : "bg-red-500 animate-ping"}`}></span>
            <span className={isRstp ? "text-emerald-400" : "text-red-400"}>
              {isRstp ? "STABILITY: 100%" : "CONGESTION: CRITICAL"}
            </span>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-850 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 font-mono">
              {isRtl ? "گزارش وضعیت شبکه" : "Network Status Metrics"}
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{isRtl ? "پایداری شبکه:" : "Network Uptime:"}</span>
                <span className={isRstp ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                  {isRstp ? "99.9%" : "0.0% (Outage)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{isRtl ? "هدررفت پکت‌ها:" : "Packet Loss:"}</span>
                <span className={isRstp ? "text-emerald-400" : "text-red-400 font-bold"}>
                  {isRstp ? "< 0.01%" : "48% (Broadcast Storm)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{isRtl ? "پردازش سوئیچ:" : "Switch CPU load:"}</span>
                <span className={isRstp ? "text-zinc-400" : "text-red-400 font-bold"}>
                  {isRstp ? "4% - Normal" : "99% - Limit reached"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <span className={`mt-0.5 p-1 rounded ${isRstp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                {isRstp ? <CheckCircle2 size={12} /> : <AlertOctagon size={12} />}
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">
                {isRstp
                  ? (isRtl
                    ? "مسیردهی امن با مسدودسازی پورت بلااستفاده (RSTP Blocking Mode) جهت جلوگیری از ایجاد حلقه."
                    : "RSTP places redundant link in Blocking mode, isolating loops while keeping backup path active.")
                  : (isRtl
                    ? "ایجاد طوفان پخش (Broadcast Storm) به دلیل عدم تنظیم پروتکل درختی و غرق شدن پهنای باند سوئیچ."
                    : "Redundant physical connections accumulate frames endlessly, generating a loop that crashes the network.")
                }
              </p>
            </div>
            
            <div className="flex items-start gap-2 text-xs">
              <span className="mt-0.5 p-1 rounded bg-tech-indigo/10 text-tech-indigo">
                <Cpu size={12} />
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">
                {isRtl
                  ? "نتیجه: بهینه‌سازی جداول مک و تثبیت پورت‌های روت، پایان دادن به ۱ سال قطعی‌های تصادفی در سایت عسلویه."
                  : "Action: Re-architected spanning-tree cost metrics and root priorities, terminating a 12-month period of intermittent shutdowns."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
