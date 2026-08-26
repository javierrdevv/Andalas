"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function makeSparks() {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    tx: (Math.random() - 0.5) * 220,
    ty: (Math.random() - 0.5) * 220,
    delay: 0.8 + Math.random() * 1.2,
    dur: 0.5 + Math.random() * 0.5,
    left: 47 + Math.random() * 6,
    top: 44 + Math.random() * 12,
  }));
}

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(true);
  const sparks = useRef(makeSparks());

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setHidden(false);

    const timer = setTimeout(() => {
      setHidden(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden animate-fadeOut"
      style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {sparks.current.map((s) => (
          <span
            key={s.id}
            className="absolute w-[3px] h-[3px] rounded-full bg-[#ff4a16] animate-spark"
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
                "--tx": `${s.tx}px`,
                "--ty": `${s.ty}px`,
              } as React.CSSProperties
            }
          />
        ))}
        <span
          className="absolute w-2 h-2 rounded-full bg-[#ff4a16] animate-sparkBig"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="relative z-10 text-center select-none">
        <Image
          src="/favicon.png"
          alt="Andal Las"
          width={80}
          height={80}
          className="mx-auto mb-3 object-contain opacity-0 animate-charReveal"
          style={{ animationDelay: "0.4s" }}
          priority
        />
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase leading-none">
          {"ANDAL".split("").map((char, i) => (
            <span
              key={`a${i}`}
              className="inline-block animate-charReveal"
              style={{ animationDelay: `${0.6 + i * 0.07}s` }}
            >
              {char}
            </span>
          ))}
          <br />
          {"LAS".split("").map((char, i) => (
            <span
              key={`l${i}`}
              className="inline-block animate-charReveal"
              style={{ animationDelay: `${1.05 + i * 0.07}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
        <div
          className="mt-4 mx-auto h-[2px] bg-[#ff4a16] animate-lineGrow"
          style={{ animationDelay: "1.8s" }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-30px); pointer-events: none; }
        }
        .animate-fadeOut {
          animation: fadeOut 0.4s ease-in forwards;
        }

        @keyframes charReveal {
          0% { opacity: 0; transform: translateY(14px) scale(0.7); filter: blur(6px); }
          60% { opacity: 1; transform: translateY(-2px) scale(1.04); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-charReveal {
          animation: charReveal 0.4s ease-out both;
        }

        @keyframes spark {
          0% { opacity: 0; transform: translate(0, 0) scale(0); }
          20% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        .animate-spark {
          animation: spark 0.8s ease-out both;
        }

        @keyframes sparkBig {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); box-shadow: 0 0 0 0 rgba(255, 74, 22, 0.8); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(3); box-shadow: 0 0 30px 10px rgba(255, 74, 22, 0.4); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); box-shadow: 0 0 0 0 rgba(255, 74, 22, 0); }
        }
        .animate-sparkBig {
          animation: sparkBig 0.6s ease-out both;
          animation-delay: 1.6s;
        }

        @keyframes lineGrow {
          from { width: 0; }
          to { width: 80px; }
        }
        .animate-lineGrow {
          animation: lineGrow 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
}
