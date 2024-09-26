"use client";

import Link from "next/link";
import posthog from "posthog-js";
import React, { useEffect, useRef, useState } from "react";

import Tooltip from "@/components/atoms/Tooltip";

interface SocialProps {
  tip: string;
  link: string;
  children: React.ReactNode;
}

const Social: React.FC<SocialProps> = ({ tip, link, children }) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  // checking if the link has focus state or not
  useEffect(() => {
    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);

    const current = ref?.current! as HTMLAnchorElement;

    current?.addEventListener("focus", handleFocus);
    current?.addEventListener("blur", handleBlur);

    return () => {
      current?.removeEventListener("focus", handleFocus);
      current?.removeEventListener("blur", handleBlur);
    };
  }, [active]);

  const getIconName = () => {
    if (link.includes("github")) return "github";
    if (link.includes("discord")) return "discord";
    if (link.includes("buymeacoffee")) return "kofi";
    if (link.includes("Saad.is.there")) return "mail";
  };

  return (
    <Tooltip tip={tip} active={active}>
      <div className="transition-all group">
        <Link
          onClick={() => {
            posthog.capture(`"${getIconName()}" icon clicked`, {
              Clicked: true,
            });
          }}
          className="transition-all flex justify-center items-center w-[50px] h-[50px] bg-transparent border-none rounded-[10px] cursor-pointer group-hover:bg-elevation_one active:scale-[95%] offset_ring"
          href={link}
          target="_blank"
          rel="noreferrer"
          ref={ref}
        >
          {children}
        </Link>
      </div>
    </Tooltip>
  );
};

export default Social;
