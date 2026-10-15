"use client";
import {
  IconBrandGithub,
  IconPlayerPlayFilled,
  IconServer,
  IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";

export interface ProjectItem {
  id?: number;
  project_name: string;
  description: string;
  project_thumnail: string;
  technology: string[];
  live_link?: string;
  video_url: string;
  company?: {
    name: string;
    url?: string;
  };
  client_github_link?: string;
  server_github_link?: string;
  contributors?: Array<{
    name: string;
    fb?: string;
  }>;
}

interface CardProps {
  project: ProjectItem;
  onPlayVideo: (url: string) => void;
}

const Card = ({ project, onPlayVideo }: CardProps) => {
  const handlePlay = useCallback(() => {
    if (project?.video_url) onPlayVideo(project.video_url);
  }, [onPlayVideo, project?.video_url]);

  return (
    <div className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0c]">
      {/* Top shiny border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:gap-6">
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${project?.project_name} video`}
            className="group/thumb relative h-48 w-full shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] sm:h-56 md:h-full md:w-[44%]"
          >
            <Image
              src={project?.project_thumnail}
              alt={project?.project_name}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-white/25 md:h-14 md:w-14">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
                <IconPlayerPlayFilled className="relative ml-0.5 size-4 fill-white text-white md:size-5" />
              </div>
            </div>
          </button>

          <div className="flex flex-1 flex-col md:w-[56%]">
            <h3 className="font-montserrat text-lg font-semibold leading-snug tracking-tight text-white md:text-xl">
              {project?.project_name}
            </h3>

            <p className="mt-2 line-clamp-2 font-poppins text-xs leading-relaxed text-slate-400 md:line-clamp-3 md:text-sm">
              {project?.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 md:gap-2">
              {project?.technology?.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3.5 md:pt-4">
              <div className="flex gap-2">
                {project?.client_github_link && (
                  <Link
                    href={project.client_github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Client GitHub Repository"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-colors duration-200 hover:border-white/[0.15] hover:text-white"
                  >
                    <IconBrandGithub className="size-4" />
                  </Link>
                )}
                {project?.server_github_link && (
                  <Link
                    href={project.server_github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Server GitHub Repository"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-colors duration-200 hover:border-white/[0.15] hover:text-white"
                  >
                    <IconServer className="size-4" />
                  </Link>
                )}
              </div>

              {project?.live_link && (
                <Link
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-medium text-white transition-colors duration-300 hover:border-white/[0.24] hover:bg-white/[0.08] md:px-4 md:py-2 md:text-xs"
                >
                  <span>Live Preview</span>
                  <IconWorld className="size-3.5 transition-transform duration-300 group-hover/btn:rotate-12 md:size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
