"use client";

import React, { useState, useEffect } from "react";
import { Play, CheckCircle, Shield, Cpu, RefreshCw, Terminal, Copy, Check } from "lucide-react";

interface Node {
  id: string;
  labelEn: string;
  labelFa: string;
  type: "start" | "form" | "approval" | "end";
  status: "idle" | "active" | "completed";
  assigneeEn?: string;
  assigneeFa?: string;
}

export default function RastarBPMSDemo({ lang }: { lang: "en" | "fa" }) {
  // 1. Workflow Node Designer State
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", labelEn: "Start Process", labelFa: "شروع فرآیند", type: "start", status: "completed" },
    { id: "2", labelEn: "Form Submission", labelFa: "ثبت فرم درخواست", type: "form", status: "active", assigneeEn: "Employee", assigneeFa: "کارمند" },
    { id: "3", labelEn: "Manager Review", labelFa: "بررسی مدیر واحد", type: "approval", status: "idle", assigneeEn: "IT Manager", assigneeFa: "مدیر فناوری" },
    { id: "4", labelEn: "Process Completed", labelFa: "تایید نهایی و پایان", type: "end", status: "idle" },
  ]);

  const advanceNode = () => {
    setNodes((prev) => {
      const activeIdx = prev.findIndex((n) => n.status === "active");
      if (activeIdx === -1) {
        // Reset to initial
        return prev.map((n, i) => ({
          ...n,
          status: i === 0 ? "completed" : i === 1 ? "active" : "idle",
        }));
      }
      
      return prev.map((n, i) => {
        if (i < activeIdx) return { ...n, status: "completed" as const };
        if (i === activeIdx) return { ...n, status: "completed" as const };
        if (i === activeIdx + 1) return { ...n, status: "active" as const };
        return { ...n, status: "idle" as const };
      });
    });
  };

  // 2. SHA-256 Digital Signature State
  const [signInput, setSignInput] = useState("Vacation Request - 3 Days");
  const [signature, setSignature] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  useEffect(() => {
    const calculateHash = async () => {
      if (!signInput) {
        setSignature("");
        return;
      }
      setIsSigning(true);
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(signInput + "-RASTAR-SALT-2026");
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        // Add artificial delay for cool micro-animation
        setTimeout(() => {
          setSignature("RASTAR-SIG-" + hashHex.toUpperCase().substring(0, 32));
          setIsSigning(false);
        }, 150);
      } catch (err) {
        setSignature("HASH_CALCULATION_FAILED");
        setIsSigning(false);
      }
    };
    calculateHash();
  }, [signInput]);

  // 3. Docker CLI Simulator State
  const [dockerStatus, setDockerStatus] = useState<"idle" | "running" | "done">("idle");
  const [dockerLogs, setDockerLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const dockerCommand = "docker compose up -d";

  const runDockerSim = () => {
    if (dockerStatus === "running") return;
    setDockerStatus("running");
    setDockerLogs([]);
    setProgress(0);

    const logSequence = [
      { prg: 10, log: "Parsing docker-compose.yml configuration..." },
      { prg: 25, log: "Pulling backend service image: python:3.11-slim... Done" },
      { prg: 40, log: "Pulling frontend client image: nextjs:16-alpine... Done" },
      { prg: 50, log: "Creating network 'rastar-mesh-network'... Created" },
      { prg: 65, log: "Creating volume 'rastar-db-data'... Created" },
      { prg: 75, log: "Starting container: rastar-postgres-db... Running [Port 5432]" },
      { prg: 85, log: "Starting container: rastar-fastapi-backend... Active [Port 8000]" },
      { prg: 92, log: "Starting container: rastar-nextjs-panel... Active [Port 3000]" },
      { prg: 97, log: "Configuring Traefik routing gateway... Enabled [Gzip active]" },
      { prg: 100, log: "[SUCCESS] Rastar Engine is running securely in on-premises mode!" },
    ];

    logSequence.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step.prg);
        setDockerLogs((prev) => [...prev, step.log]);
        if (index === logSequence.length - 1) {
          setDockerStatus("done");
        }
      }, (index + 1) * 600);
    });
  };

  const copyCmd = () => {
    navigator.clipboard.writeText(dockerCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRtl = lang === "fa";

  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      {/* Visual designer & Signature Card */}
      <div className="glass-card rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-tech-indigo transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tech-indigo/5 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-tech-indigo/10 text-tech-indigo">
                <Cpu size={20} />
              </span>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                  {isRtl ? "۱. طراح گردش‌کار بصری" : "1. Visual Workflow Designer"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isRtl ? "تعامل زنده با سیستم مدل‌سازی فرآیندها" : "Live interactive workflow designer simulation"}
                </p>
              </div>
            </div>
            <button
              onClick={advanceNode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-tech-indigo text-white hover:bg-tech-indigo/90 transition-all shadow-sm shadow-tech-indigo/20 cursor-pointer"
            >
              <RefreshCw size={12} className="animate-spin-slow" />
              {isRtl ? "گام بعد" : "Next Step"}
            </button>
          </div>

          {/* Workflow nodes */}
          <div className="flex flex-col gap-4 relative py-2">
            {nodes.map((node, index) => {
              const isActive = node.status === "active";
              const isCompleted = node.status === "completed";

              return (
                <div key={node.id} className="relative flex items-center gap-4 z-10">
                  {/* Status Circle indicator */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-tech-indigo bg-tech-indigo/10 text-tech-indigo shadow-md shadow-tech-indigo/25 scale-105"
                        : isCompleted
                        ? "border-emerald-green bg-emerald-green/10 text-emerald-green"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={18} /> : <span>{index + 1}</span>}
                  </div>

                  {/* Node label details */}
                  <div
                    className={`flex-1 rounded-xl p-3 border transition-all duration-300 ${
                      isActive
                        ? "border-tech-indigo bg-tech-indigo/5 text-zinc-900 dark:text-zinc-50 font-medium"
                        : isCompleted
                        ? "border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400"
                        : "border-zinc-100 dark:border-zinc-900 bg-transparent text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{isRtl ? node.labelFa : node.labelEn}</span>
                      {node.assigneeEn && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {isRtl ? node.assigneeFa : node.assigneeEn}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual connector line */}
                  {index < nodes.length - 1 && (
                    <div
                      className={`absolute ${isRtl ? "right-5" : "left-5"} top-10 w-[2px] h-6 -z-10 transition-colors duration-300 ${
                        isCompleted ? "bg-emerald-green" : "bg-zinc-200 dark:bg-zinc-850"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SHA-256 Vault simulation */}
        <div className="mt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 rounded-xl bg-emerald-green/10 text-emerald-green">
              <Shield size={20} />
            </span>
            <div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                {isRtl ? "۲. شبیه‌ساز امضای دیجیتال SHA-256" : "2. SHA-256 Signature Signer"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isRtl ? "مهر رمزنگاری برای تایید هویت اسناد بدون تغییر" : "Cryptographic integrity sealing for zero-trust records"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
                {isRtl ? "داده خام فرم" : "Raw Form Data"}
              </label>
              <input
                type="text"
                value={signInput}
                onChange={(e) => setSignInput(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-tech-indigo transition-all font-mono"
                placeholder={isRtl ? "متنی بنویسید..." : "Enter form text..."}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
                {isRtl ? "امضای تولید شده (SHA-256 API Secure)" : "Generated Signature Seal (SHA-256 Secure)"}
              </label>
              <div className="w-full text-xs p-3 rounded-xl bg-zinc-950 dark:bg-black border border-zinc-800 text-emerald-400 font-mono flex items-center justify-between min-h-[44px]">
                {isSigning ? (
                  <span className="text-zinc-500 italic animate-pulse">
                    {isRtl ? "در حال محاسبه امضای دیجیتال..." : "Calculating secure seal..."}
                  </span>
                ) : (
                  <span className="break-all">{signature || "Waiting for input..."}</span>
                )}
                {!isSigning && signature && <Check size={14} className="shrink-0 text-emerald-500 animate-bounce ml-2" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Docker Terminal Box */}
      <div className="glass-card rounded-2xl p-6 flex flex-col justify-between shadow-lg border border-zinc-200/60 dark:border-zinc-850 bg-zinc-950 text-zinc-100 group hover:border-emerald-green transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/5 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-zinc-900 text-emerald-400 border border-zinc-800">
                <Terminal size={18} />
              </span>
              <div>
                <h3 className="font-bold text-sm text-zinc-100 font-mono">
                  {isRtl ? "۳. کنسول خط فرمان استقرار" : "3. Local Deployment Console"}
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono">
                  {isRtl ? "شبیه‌سازی خودکار راه‌اندازی کانتینرها" : "Containerized environment deployment simulator"}
                </p>
              </div>
            </div>
            {/* Window Dots mock */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>
          </div>

          {/* Docker Compose Box */}
          <div className="bg-black/60 rounded-xl p-3.5 border border-zinc-900 flex items-center justify-between mb-4 font-mono text-xs">
            <span className="text-zinc-300">
              <span className="text-emerald-500">$</span> {dockerCommand}
            </span>
            <button
              onClick={copyCmd}
              className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
              title="Copy code"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>

          {/* CLI Logs Screen */}
          <div className="bg-black/80 rounded-xl border border-zinc-900 p-4 font-mono text-[11px] h-64 overflow-y-auto space-y-2 flex flex-col justify-start align-baseline scrollbar-thin scrollbar-thumb-zinc-800 text-zinc-400">
            {dockerLogs.length === 0 && (
              <p className="text-zinc-600 italic">
                {isRtl
                  ? "دکمه «شبیه‌سازی استقرار» را کلیک کنید تا لاگ کانتینرها بارگذاری شود."
                  : "Click 'Simulate Run' to initialize on-premises deploy sequence."}
              </p>
            )}
            {dockerLogs.map((log, index) => {
              const isSuccess = log.includes("[SUCCESS]");
              return (
                <p
                  key={index}
                  className={`leading-relaxed ${
                    isSuccess ? "text-emerald-400 font-bold" : "text-zinc-300"
                  }`}
                >
                  {log}
                </p>
              );
            })}
            {dockerStatus === "running" && (
              <div className="flex items-center gap-2 text-zinc-500 animate-pulse pt-2">
                <RefreshCw size={10} className="animate-spin" />
                <span>{isRtl ? "در حال بالا آوردن کانتینرها..." : "Configuring server runtime mesh..."}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar & Run button */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mb-1">
              <span>{isRtl ? "پیشرفت استقرار:" : "Deploy Progress:"}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-green h-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            onClick={runDockerSim}
            disabled={dockerStatus === "running"}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-green text-zinc-950 hover:bg-emerald-green/90 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Play size={12} fill="currentColor" />
            <span>{isRtl ? "شبیه‌سازی استقرار" : "Simulate Run"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
