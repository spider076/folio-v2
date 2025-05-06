"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  title,
  description,
  href,
  icon,
  githubUrl,
  tags,
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <Link
      className="group mb-4 hover:shadow-lg rounded-xl  transition duration-200 relative border border-slate-200 dark:border-slate-700 w-full"
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
    >
      {typeof window !== "undefined" && (
        <HoverPattern mouseX={mouseX} mouseY={mouseY} />
      )}

      <div className="relative h-full">
        <span className="absolute w-[40%] -bottom-px right-px h-px bg-gradient-to-r from-accent via-accent to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>
        <span className="absolute w-px -left-px top-[50%] h-[40%] bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>

        <div className="flex flex-col items-start  dark:border-gray-800 rounded p-4 relative">
          <div className="my-4">
            {icon && (
              <Image
                width={80}
                height={80}
                src={icon}
                alt={`{title}-logo`}
                className={`object-contain h-8 w-12 min-w-lg text-gray-900 dark:text-gray-100`}
              />
            )}
          </div>
          <div>
            <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {title}
            </h4>
            <p className="leading-6 pt-4 text-gray-700 dark:text-gray-300">
              {description}
            </p>
            <div className="pb-2 pt-6 flex items-center justify-between ">
              <div className="inline-flex md:flex-row flex-wrap">
                {tags?.map((tag, idx) => (
                  <p
                    key={idx}
                    className={`leading-5 dark:border dark:border-zinc-700 text-gray-700 dark:text-gray-300 dark:bg-transparent rounded-md text-xs italic bg-gray-50  mr-2 px-1`}
                  >
                    {tag}
                  </p>
                ))}
              </div>

              {githubUrl && (
                <div>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-accent transition duration-200"
                  >
                    <Github className="w-6 hover:text-accent " />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function HoverPattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent opacity-0 transition duration-300 group-hover:opacity-100 dark:from-accent dark:to-black/50"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      ></motion.div>
    </div>
  );
}
