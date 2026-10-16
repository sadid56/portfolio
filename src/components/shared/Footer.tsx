import LINKS from "@/constant/links";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      <div className="relative z-30 flex pt-24 pb-12 items-center justify-center">
        <div className="w-full px-4">
          <div className="relative">
            <div className="relative text-center">
              <div className="relative inline-block">
                <p className="relative text-xl md:text-2xl font-light tracking-[0.3em] uppercase select-none">
                  <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text font-medium text-transparent">
                    Developer & Creator
                  </span>
                </p>

                {/* Minimal Footer Links */}
                <div className="relative z-30 mt-6 flex items-center justify-center gap-3 md:gap-5 text-xs md:text-sm font-medium text-slate-400">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={LINKS.blog}
                    className="group/link relative z-30 cursor-pointer py-1.5 px-2 flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span>Blogs</span>
                    <IconArrowUpRight className="size-3.5 text-slate-400 group-hover/link:text-white transition-colors" />
                  </a>

                  <span className="w-1 h-1 rounded-full bg-slate-600 select-none" />

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={LINKS.github}
                    className="group/link relative z-30 cursor-pointer py-1.5 px-2 flex items-center gap-1.5 hover:text-white transition-colors duration-200"
                  >
                    <IconBrandGithub className="size-3.5 text-slate-400 group-hover/link:text-white transition-colors" />
                    <span>GitHub</span>
                  </a>

                  <span className="w-1 h-1 rounded-full bg-slate-600 select-none" />

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={LINKS.linkedIn}
                    className="group/link relative z-30 cursor-pointer py-1.5 px-2 flex items-center gap-1.5 hover:text-white transition-colors duration-200"
                  >
                    <IconBrandLinkedin className="size-3.5 text-slate-400 group-hover/link:text-white transition-colors" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
                  <div className="h-px w-12 bg-linear-to-r from-transparent to-white/20" />
                  <span className="text-[10px] text-slate-400 tracking-widest uppercase text-nowrap">
                    Crafting with Passion
                  </span>
                  <div className="h-px w-12 bg-linear-to-l from-transparent to-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Indicator (smooth, balanced & atmospheric) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="relative w-208 md:w-5xl h-5">
          {/* Soft ambient halo */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent blur-3xl opacity-70" />

          {/* Smooth diffused bloom */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-300/30 to-transparent blur-2xl opacity-70" />

          {/* Core soft glow */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent blur-lg opacity-60" />

          {/* Smooth hairline */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-linear-to-r from-transparent via-white/70 to-transparent rounded-full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
