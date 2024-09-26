"use client";

import React, { useEffect, useState } from "react";

import Tooltip from "@/components/atoms/Tooltip";
import Link from "next/link";
import posthog from "posthog-js";
import RichPresence from "../molecules/RichPresence";

const About: React.FC = () => {
  const [age, setAge] = useState<ReturnType<typeof getAge>>();

  // i didnt write this idk
  const getAge = () => {
    let birthDate = new Date("2003/08/30");
    const ageMs = Date.now() - birthDate.getTime();
    const preciseAge = (ageMs / 31536000000).toFixed(10);
    return preciseAge;
  };

  useEffect(() => {
    setAge(getAge());
    setInterval(() => {
      setAge(getAge());
    }, 1000);
  }, []);

  return (
    <section
      id="about"
      className="wrapper flex flex-col md:flex-row mb-24 md:grid grid-cols-[1fr_1fr] md:items-center gap-16"
    >
      <div>
        <RichPresence />
      </div>
      <div
        className="relative leading-[1.75rem] 
            before:content-['mohd.'] before:h-[300px] before:text-[150px] before:font-[700] before:-z-10 before:select-none before:translate-x-[130%] before:translate-y-[8%] webkit_text_stroke before:opacity-[0.22] before:absolute
            after:content-['saad'] after:h-[300px] after:text-[200px] after:font-[700] after:-z-10 after:select-none after:translate-x-[140%] after:translate-y-[-35%] webkit_text_stroke_after after:opacity-[0.22] after:absolute
            "
      >
        <h2 className="md:hidden mb-4 md:mt-4 md:mb-0">bio</h2>
        <div className="text-text_secondary font-[300] text-[1.1rem] tracking-[-0rem] leading-[1.75rem]">
          Hey, I’m Saad, a MERN stack developer and BTECH 3rd year student from India. I
          have experience building full-stack applications using React.js,
          Node.js, Next.js 14, Prisma, PostgreSQL, and MongoDB. I’ve
          participated in over 10 hackathons,{" "}
          <span className="bio_span">
            winning 1st place in 2 campus events and 5 online competitions
          </span>
          . I’ve also had experience working on Upwork for a clien. as a web
          developer, which is probably the reason why you&rsquo;ve ended up
          here. Currently struggling with blockchain.
        </div>
      </div>
    </section>
  );
};

export default About;
