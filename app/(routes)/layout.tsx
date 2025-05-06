"use client";

import { useEffect, useRef, useState } from "react";

import Cursor from "@/components/atoms/Cursor";
import ResumeButton from "@/components/atoms/ResumeButton";
import NavHost from "@/components/molecules/NavHost";
import Footer from "@/components/molecules/Footer";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(1);
  const [timeOut, setTimeOut] = useState<ReturnType<typeof setTimeout>>();
  const audioRef = useRef(typeof Audio !== "undefined" ? new Audio() : null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
    setOpacity(1);

    clearTimeout(timeOut);
    setTimeOut(
      setTimeout(() => {
        setOpacity(0);
      }, 2000)
    );
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Throw error
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", play);
    return () => {
      document.removeEventListener("mousedown", play);
    };
  }, []);

  return (
    <main className="font-spacegrotesk relative">
      <div
        onMouseMove={onMouseMove}
        onMouseDown={() => setScale(1.25)}
        onMouseUp={() => setScale(1)}
      >
        <ResumeButton />
        <audio ref={audioRef!} src="/sounds/click.mp3" />
        <NavHost />
        <Cursor
          mouseX={mouseX}
          mouseY={mouseY}
          scale={scale}
          opacity={opacity}
        />
        <section className="mt-36">{children}</section>
      </div>
      <Footer />
    </main>
  );
}
