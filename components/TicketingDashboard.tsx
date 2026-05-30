"use client";

import React, { useState, useEffect } from "react";
import { Check, AlertTriangle, Clock, RefreshCw, BarChart2, Activity } from "lucide-react";

interface Ticket {
  id: string;
  titleEn: string;
  titleFa: string;
  priority: "High" | "Medium" | "Low";
  status: "pending" | "resolving" | "resolved";
  timeEn: string;
  timeFa: string;
}

export default function TicketingDashboard({ lang }: { lang: "en" | "fa" }) {
  // Stats state
  const [activeCount, setActiveCount] = useState(4);
  const [resolvedCount, setResolvedCount] = useState(182);
  const [avgMttr, setAvgMttr] = useState(18); // mins
  const [slaCompliance, setSlaCompliance] = useState(97.8); // %

  // Ticketing Data
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "102", titleEn: "VLAN Mismatch in admin block switch", titleFa: "عدم تطابق VLAN در سوئیچ بخش اداری", priority: "High", status: "pending", timeEn: "5m ago", timeFa: "۵ دقیقه پیش" },
    { id: "103", titleEn: "Zabbix alert: Server room temp > 28°C", titleFa: "هشدار زبیکس: دمای اتاق سرور بالاتر از ۲۸ درجه", priority: "High", status: "pending", timeEn: "12m ago", timeFa: "۱۲ دقیقه پیش" },
    { id: "104", titleEn: "Employee profile sync loop in HR portal", titleFa: "لوپ همگام‌سازی اطلاعات در پورتال منابع انسانی", priority: "Medium", status: "pending", timeEn: "24m ago", timeFa: "۲۴ دقیقه پیش" },
    { id: "105", titleEn: "Printer queue stuck in procurement unit", titleFa: "گیر کردن صف چاپگر در واحد تدارکات", priority: "Low", status: "pending", timeEn: "1h ago", timeFa: "۱ ساعت پیش" },
  ]);

  // Chart values (SVG Polyline values)
  const [chartData, setChartData] = useState<number[]>([42, 38, 35, 29, 24, 21, 18]);

  // Generate random data occasionally for a "live" feel
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuation in SLA
      setSlaCompliance((prev) => {
        const delta = (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.max(95, Math.min(99.9, prev + delta)).toFixed(1));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const resolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolving" } : t))
    );

    // Simulate resolve time delay
    setTimeout(() => {
      setTickets((prev) => prev.filter((t) => t.id !== id));
      setActiveCount((prev) => Math.max(0, prev - 1));
      setResolvedCount((prev) => prev + 1);
      // Reduce MTTR slightly on success
      setAvgMttr((prev) => Math.max(10, prev - 1));
      // Shift chart values down
      setChartData((prev) => {
        const nextData = [...prev.slice(1), Math.max(10, prev[prev.length - 1] - 1)];
        return nextData;
      });
    }, 1500);
  };

  const addTicketSim = () => {
    const mockTitlesEn = [
      "Access Port Security shutdown on Switch 4",
      "Broadcast limit threshold reached in Zone B",
      "DHCP pool exhaustion in Guest subnet",
      "Network printer unreachable in Finance dept"
    ];
    const mockTitlesFa = [
      "خاموش شدن پورت امنیتی سوئیچ ۴ (Port Security)",
      "رسیدن به سقف ترافیک Broadcast در ناحیه ب",
      "اتمام استخر آی‌پی DHCP در زیرشبکه مهمان",
      "عدم دسترسی به چاپگر شبکه در بخش مالی"
    ];
    const priorities = ["High", "Medium", "Low"] as const;
    const randIdx = Math.floor(Math.random() * mockTitlesEn.length);
    const randPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const newId = (106 + Math.floor(Math.random() * 100)).toString();

    const newTicket: Ticket = {
      id: newId,
      titleEn: mockTitlesEn[randIdx],
      titleFa: mockTitlesFa[randIdx],
      priority: randPriority,
      status: "pending",
      timeEn: "Just now",
      timeFa: "همین الان"
    };

    setTickets((prev) => [newTicket, ...prev]);
    setActiveCount((prev) => prev + 1);
  };

  const isRtl = lang === "fa";

  // Map values to Y coordinates (inverse for SVG where top is 0)
  // Higher value -> smaller Y coordinate
  const points = chartData
    .map((val, idx) => {
      const x = (idx * 50) + 20;
      const y = 100 - (val * 1.5); // scale to fit 100px height
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-6">
      {/* Product Branding */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-green to-teal-500 text-white shadow-lg shadow-emerald-500/20">
          <Activity size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white">
            {isRtl ? "سامانه تیکتینگ و پایش متمرکز" : "Centralized Ticketing & Monitoring"}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">
            {isRtl ? "پلتفرم مدیریت SLA، حوادث شبکه و یکپارچه با Zabbix" : "SLA, Incident Management Platform Integrated with Zabbix"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
      {/* Metrics Panel */}
      <div className="glass-card rounded-2xl p-6 flex flex-col justify-between shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:border-emerald-green transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 rounded-xl bg-emerald-green/10 text-emerald-green">
              <Activity size={20} />
            </span>
            <div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                {isRtl ? "۱. متریک‌های بلادرنگ پایش" : "1. Real-time Monitoring"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isRtl ? "یکپارچگی فعال با Zabbix و پرومتئوس" : "Active connection with Zabbix monitoring"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-850">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">
                {isRtl ? "تیکت‌های فعال" : "Active Tickets"}
              </span>
              <span className="text-2xl font-black text-amber-500 font-mono">{activeCount}</span>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-850">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">
                {isRtl ? "حل شده (کل)" : "Total Resolved"}
              </span>
              <span className="text-2xl font-black text-emerald-green font-mono">{resolvedCount}</span>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-850">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">
                {isRtl ? "متوسط زمان رفع خرابی (MTTR)" : "Avg Resolution (MTTR)"}
              </span>
              <span className="text-2xl font-black text-tech-indigo font-mono">{avgMttr}m</span>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-850">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">
                {isRtl ? "پایداری تعهدات SLA" : "SLA Compliance"}
              </span>
              <span className="text-2xl font-black text-emerald-green font-mono">{slaCompliance}%</span>
            </div>
          </div>
        </div>

        {/* Live SVG Chart */}
        <div className="mt-8 border-t border-zinc-100 dark:border-zinc-850 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {isRtl ? "روند نزولی MTTR (دقیقه)" : "MTTR Decline Trend (mins)"}
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          
          <div className="w-full bg-zinc-50/50 dark:bg-black/25 rounded-xl border border-zinc-100 dark:border-zinc-900 p-2 h-28 flex items-end relative">
            <svg className="w-full h-full" viewBox="0 0 340 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="340" y2="25" stroke="rgba(128,128,128,0.1)" strokeWidth="1" />
              <line x1="0" y1="50" x2="340" y2="50" stroke="rgba(128,128,128,0.1)" strokeWidth="1" />
              <line x1="0" y1="75" x2="340" y2="75" stroke="rgba(128,128,128,0.1)" strokeWidth="1" />
              
              {/* Line */}
              <polyline
                fill="none"
                stroke="var(--color-tech-indigo, #6366f1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="transition-all duration-700"
              />
              
              {/* Dots */}
              {chartData.map((val, idx) => {
                const x = (idx * 50) + 20;
                const y = 100 - (val * 1.5);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--color-emerald-green, #10b981)"
                    className="transition-all duration-700"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Ticket List and Dispatcher (Full Width Stack) */}
      <div className="glass-card rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col justify-between hover:border-tech-indigo transition-all duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-zinc-100 dark:border-zinc-850 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-tech-indigo/10 text-tech-indigo">
                <BarChart2 size={20} />
              </span>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                  {isRtl ? "۲. صف درخواست‌های واحد فناوری اطلاعات" : "2. Real-time IT Incident Queue"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isRtl ? "برای آزمایش روی هر دکمه ضربه بزنید تا تیکت رفع عیب شود." : "Interactive dashboard simulation. Click to resolve incidents."}
                </p>
              </div>
            </div>

            <button
              onClick={addTicketSim}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            >
              <RefreshCw size={12} />
              {isRtl ? "ایجاد تیکت فرضی" : "Simulate Incoming"}
            </button>
          </div>

          {/* Ticket Rows */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {tickets.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 dark:text-zinc-600">
                <Check className="mx-auto h-8 w-8 text-emerald-green mb-2" />
                <p className="text-sm font-semibold">{isRtl ? "تمامی تیکت‌ها با موفقیت برطرف شدند!" : "All systems normal. 0 active incidents!"}</p>
                <p className="text-xs mt-1">{isRtl ? "روی دکمه «ایجاد تیکت فرضی» بزنید." : "Click 'Simulate Incoming' to test again."}</p>
              </div>
            ) : (
              tickets.map((ticket) => {
                const isHigh = ticket.priority === "High";
                const isMedium = ticket.priority === "Medium";
                const isResolving = ticket.status === "resolving";

                return (
                  <div
                    key={ticket.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                      isResolving
                        ? "border-tech-indigo/30 bg-tech-indigo/5 opacity-80"
                        : "border-zinc-100 dark:border-zinc-850 bg-white/50 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                          isHigh
                            ? "bg-red-500/10 text-red-500"
                            : isMedium
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        <AlertTriangle size={14} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-400">#{ticket.id}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                              isHigh
                                ? "bg-red-500/10 text-red-500"
                                : isMedium
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-blue-500/10 text-blue-500"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1">
                          {isRtl ? ticket.titleFa : ticket.titleEn}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 pt-2.5 sm:pt-0 shrink-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                        <Clock size={12} />
                        <span>{isRtl ? ticket.timeFa : ticket.timeEn}</span>
                      </div>

                      <button
                        onClick={() => resolveTicket(ticket.id)}
                        disabled={isResolving}
                        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isResolving
                            ? "bg-tech-indigo/20 text-tech-indigo cursor-not-allowed"
                            : "bg-emerald-green text-zinc-950 hover:bg-emerald-green/90 shadow-md shadow-emerald-500/10"
                        }`}
                      >
                        {isResolving ? (
                          <>
                            <RefreshCw size={12} className="animate-spin" />
                            <span>{isRtl ? "در حال حل..." : "Resolving..."}</span>
                          </>
                        ) : (
                          <>
                            <Check size={12} />
                            <span>{isRtl ? "رفع مشکل" : "Resolve"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 border-t border-zinc-100 dark:border-zinc-850 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-500 gap-2">
          <span>{isRtl ? "شناسایی خودکار ریشه خطا با تحلیل لاگ‌های شبکه" : "Automated root-cause resolution using syslog analysis."}</span>
          <span className="font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
            {isRtl ? "سیستم زبیکس فعال است" : "Zabbix status: Connected"}
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}
