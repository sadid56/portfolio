import React from "react";

interface RocketProps {
  className?: string;
}

export const Rocket: React.FC<RocketProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Inline styles for fluid thrust plasma */}
      <style jsx>{`
        @keyframes flameAura {
          0% {
            transform: scaleY(0.95) scaleX(0.98);
            opacity: 0.8;
          }
          50% {
            transform: scaleY(1.25) scaleX(1.05);
            opacity: 1;
          }
          100% {
            transform: scaleY(0.95) scaleX(0.98);
            opacity: 0.8;
          }
        }
        @keyframes flameCore {
          0% {
            transform: scaleY(0.9) scaleX(0.95);
            opacity: 0.85;
          }
          50% {
            transform: scaleY(1.3) scaleX(1.02);
            opacity: 1;
          }
          100% {
            transform: scaleY(0.9) scaleX(0.95);
            opacity: 0.85;
          }
        }
        @keyframes sparkGlide1 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translate(-1.5px, 14px) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes sparkGlide2 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translate(1.5px, 16px) scale(0.2);
            opacity: 0;
          }
        }
        .flame-aura {
          transform-origin: 32px 48px;
          animation: flameAura 0.7s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .flame-core {
          transform-origin: 32px 48px;
          animation: flameCore 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .spark-a {
          animation: sparkGlide1 0.8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
        }
        .spark-b {
          animation: sparkGlide2 0.7s cubic-bezier(0.2, 0.8, 0.4, 1) 0.35s infinite;
        }
      `}</style>

      {/* Futuristic Vector Rocket SVG */}
      <svg
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]'
      >
        <defs>
          {/* Rocket Body Gradient */}
          <linearGradient id='rocketBody' x1='20' y1='6' x2='44' y2='46' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#f8fafc' />
            <stop offset='50%' stopColor='#cbd5e1' />
            <stop offset='100%' stopColor='#64748b' />
          </linearGradient>

          {/* Fuselage Highlight */}
          <linearGradient id='bodyHighlight' x1='26' y1='8' x2='38' y2='42' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#ffffff' stopOpacity='0.9' />
            <stop offset='100%' stopColor='#94a3b8' stopOpacity='0.1' />
          </linearGradient>

          {/* Cockpit Window */}
          <radialGradient id='cockpitGlass' cx='32' cy='22' r='6' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#38bdf8' />
            <stop offset='60%' stopColor='#0284c7' />
            <stop offset='100%' stopColor='#0369a1' />
          </radialGradient>

          {/* Fins Gradient */}
          <linearGradient id='rocketFins' x1='12' y1='28' x2='52' y2='48' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#0ea5e9' />
            <stop offset='100%' stopColor='#0284c7' />
          </linearGradient>

          {/* Thruster Nozzle */}
          <linearGradient id='nozzleGrad' x1='27' y1='44' x2='37' y2='49' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#475569' />
            <stop offset='100%' stopColor='#1e293b' />
          </linearGradient>

          {/* Plasma Exhaust Flame */}
          <linearGradient id='exhaustFlame' x1='32' y1='48' x2='32' y2='63' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#38bdf8' stopOpacity='0.9' />
            <stop offset='35%' stopColor='#fbbf24' stopOpacity='0.85' />
            <stop offset='75%' stopColor='#ef4444' stopOpacity='0.7' />
            <stop offset='100%' stopColor='#ef4444' stopOpacity='0' />
          </linearGradient>

          <linearGradient id='coreFlame' x1='32' y1='48' x2='32' y2='57' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#ffffff' />
            <stop offset='45%' stopColor='#fef08a' />
            <stop offset='100%' stopColor='#f97316' stopOpacity='0.3' />
          </linearGradient>
        </defs>

        {/* Thruster Flame Plume (Fluid Multi-layer) */}
        <g className='flame-aura'>
          <path
            d='M27 48C26 52 25 57 32 63C39 57 38 52 37 48H27Z'
            fill='url(#exhaustFlame)'
          />
        </g>
        <g className='flame-core'>
          <path
            d='M29 48C28.5 51 28 54 32 57.5C36 54 35.5 51 35 48H29Z'
            fill='url(#coreFlame)'
          />
        </g>

        {/* Floating Sparks Particles */}
        <circle cx='31' cy='52' r='1.2' fill='#fef08a' className='spark-a' />
        <circle cx='33' cy='51' r='1' fill='#38bdf8' className='spark-b' />

        {/* Left Aerodynamic Fin */}
        <path
          d='M23 32L14 43C13 44.5 14 46.5 16 46.5H23V32Z'
          fill='url(#rocketFins)'
          stroke='#0369a1'
          strokeWidth='0.75'
        />

        {/* Right Aerodynamic Fin */}
        <path
          d='M41 32L50 43C51 44.5 50 46.5 48 46.5H41V32Z'
          fill='url(#rocketFins)'
          stroke='#0369a1'
          strokeWidth='0.75'
        />

        {/* Center Rocket Fuselage / Body */}
        <path
          d='M32 6C24 16 23 34 23 44C23 45.5 24 46.5 25.5 46.5H38.5C40 46.5 41 45.5 41 44C41 34 40 16 32 6Z'
          fill='url(#rocketBody)'
          stroke='#475569'
          strokeWidth='0.75'
        />

        {/* Fuselage Gloss Highlight */}
        <path
          d='M32 8C27 16 26 32 26 44H29C29 32 30 16 32 8Z'
          fill='url(#bodyHighlight)'
        />

        {/* Nose Cone Tip Accent */}
        <path
          d='M32 6C29 10 27 15 27 18H37C37 15 35 10 32 6Z'
          fill='url(#rocketFins)'
        />

        {/* Cockpit Porthole Rim */}
        <circle cx='32' cy='24' r='5' fill='#1e293b' stroke='#0ea5e9' strokeWidth='1' />
        {/* Cockpit Glass */}
        <circle cx='32' cy='24' r='3.8' fill='url(#cockpitGlass)' />
        {/* Cockpit Glass Reflection */}
        <ellipse cx='30.8' cy='22.8' rx='1.2' ry='0.7' fill='#ffffff' opacity='0.85' />

        {/* Rocket Panel Seam Lines */}
        <path d='M23.5 35H40.5' stroke='#94a3b8' strokeWidth='0.5' strokeOpacity='0.6' />
        <path d='M24 41H40' stroke='#94a3b8' strokeWidth='0.5' strokeOpacity='0.6' />

        {/* Bottom Exhaust Nozzle */}
        <path
          d='M27 46.5H37L38 49H26L27 46.5Z'
          fill='url(#nozzleGrad)'
          stroke='#0f172a'
          strokeWidth='0.75'
        />
      </svg>
    </div>
  );
};

export default Rocket;
