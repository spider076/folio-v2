"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

import { Repo } from "@/types";
import ProjectCard from "../molecules/ProjectCard";

const Repos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await fetch(
        "https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=spider076"
      );
      setRepos(await response.json());
    };
    fetchRepos();
  }, []);

  return (
    <section className="wrapper pb-5 md:pb-0" id="work">
      <div className="title flex justify-start mt-0 md:justify-center">
        <h2 className="inline-block mb-4">
          <span className="text-accent">code</span>:work
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          title="Renthub"
          description="RentHub is a product that is built on top of BTFS to make it easier for developers to use the platform. It provides a set of tools and services that simplify the process of storing and retrieving files on the BTFS network. RentHub 
          is designed to be easy to use and accessible to developers of all skill levels.."
          href="https://www.renthub.cloud/"
          icon="renthub"
          tags={[
            "Front-end",
            "BTFS",
            "Next.js",
            "React",
            "TailwindCSS",
            "Nestjs",
          ]}
        />
        <ProjectCard
          title="CodeHive"
          description="Code Hive provides a platform where developers can showcase their coding skills, solve real-world problems, and earn rewards for their solutions. 
          It helps developers enhance their skills and gain recognition in the tech community."
          href="https://thecodehive.online/"
          icon="codehive"
          tags={[
            "Hackathon",
            "React",
            "Node",
            "Nestjs",
            "Tron Nile",
            "Tron Kit",
            "Solidity",
          ]}
        />
        <ProjectCard
          title="EdoboMedical"
          description="A Medical E-commerce Website"
          href="https://edobomedical.vercel.app/"
          icon="edobomedical"
          tags={["Next.js", "React", "TailwindCSS", "Full-Stack"]}
        />
        <ProjectCard
          title="Squad.ai"
          description="AI Automation platform for bussinesses build using n8n automation tool and gemini"
          href="https://huntai-bef61.web.app/"
          icon="squadai"
          tags={[
            "Next.js",
            "React",
            "TailwindCSS",
            "N8N",
            "Gemini",
            "Material-UI",
          ]}
        />
        <ProjectCard
          title="Opinex"
          description="Opinex is an Options trading platforms where users can place bet on their opinions and win rewards in form of eth"
          href="https://opinex.vercel.app/"
          icon="opinex"
          tags={["Tailwind", "Next.js", "Ethereum", "Ethers.js", "Solidity"]}
        />

        {/* <ProjectCard
          title="Covid Rescue"
          description="Get Real-time verified leads on Oxygen, Beds, Remdesivir and more with location and resource filtering"
          href="https://covidrescue.co.in/"
          icon="covidrescue"
          tags={["Open Source", "Next.js", "Twitter"]}
        /> */}
      </div>
    </section>
  );
};

export default Repos;
