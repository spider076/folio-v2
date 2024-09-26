"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

import { Repo } from "@/types";

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

      <h1 className='text-gray-700 pb-10 text-[1.7rem] text-center'>Will be updated soon...</h1>
    </section>
  );
};

export default Repos;
