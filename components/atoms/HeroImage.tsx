"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const HeroImage: React.FC = () => {
  const [zoom, setZoom] = useState<boolean>(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    setZoom(true);
    let img = e.target as HTMLDivElement;
    let rotateY =
      13 * ((e.nativeEvent.offsetX - img.clientHeight / 2) / img.clientWidth);
    let rotateX =
      -13 * ((e.nativeEvent.offsetY - img.clientWidth / 2) / img.clientHeight);

    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setZoom(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="img-container">
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "img rounded-[48px] w-wclamp344 h-hclamp344 xl:w-[425px] xl:h-[400px] z-10 md:block self-start bg-elevation_one bg-cover bg-center bg-no-repeat bg-[url('/azuki.png')] hidden"
        )}
        style={{
          transform: `
                    perspective(500px) ${zoom ? "scale(1.05)" : ""} rotateX(${
            rotate.x
          }deg) rotateY(${rotate.y}deg)
                    `,
          transition:
            "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </div>
  );
};

export default HeroImage;
