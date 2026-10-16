import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="relative min-h-screen bg-mainBgColor text-slate-100 flex items-center justify-center px-6 overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Minimal 404 Display */}
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white/80 to-white/10 select-none mb-4">
          404
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-md font-light leading-relaxed mb-10">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-medium text-sm hover:bg-slate-200 transition-all duration-300 shadow-lg shadow-white/5 active:scale-95"
          >
            <IconArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
          <Link
            href="/#projects"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/4 hover:bg-white/8 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 active:scale-95"
          >
            View Projects
            <IconArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-500 group-hover:text-white"
            />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
